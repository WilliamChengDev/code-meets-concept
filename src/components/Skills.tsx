import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import './Skills.css';
gsap.registerPlugin(useGSAP, TextPlugin, ScrambleTextPlugin);

export interface SkillsHandles {
        getTimeline: () => gsap.core.Timeline;
}

const Skills = forwardRef<SkillsHandles, {}>((props, ref) => {

        //pass transitionTimeline to parent
        useImperativeHandle(ref, () => ({
                getTimeline: () => transitionTl.current //typed by `export interface SkillsHandles`
        }));

        const transitionTl = useRef(gsap.timeline({paused: false}));

        const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });
        const [currentRotation, setCurrentRotation] = useState({ x: 0, y: 0 });
        const animationRef = useRef<number>(0); //use to cancel animation frame when done
        const wrapperRef = useRef<HTMLDivElement>(null);
        const [width, setWidth] = useState(600);
        const [height, setHeight] = useState(600);
        //tags to display in the tag cloud
        const [tags] = useState(["Java", "Python", "Haskell", "SQL", "JavaScript", "TypeScript", "HTML/CSS", "UML", "React", "Node.js", "Express.js", "Git", "VS Code", "Visual Studio", "IntelliJ", "Eclipse", "Adobe Photoshop", "Adobe Illustrator", "Blender 3D", "Three.js", "PIXI.js", "Matter.js", "GSAP", "pandas", "NumPy"]);
        //sphere points
        let points = useRef<{ x: number; y: number; z: number }[]>([]); 

        const [tagPositions, setTagPositions] = useState<{
                text: string;
                x: number;
                y: number;
                z: number;
                scale: number;
                opacity: number;
        }[]>([]);

        useLayoutEffect(() => {
                // Run once on mount:
                updateOverlay();

                // Recompute whenever window resizes:
                window.addEventListener("resize", updateOverlay);

                //remove listener on unmount
                return () => {
                        window.removeEventListener("resize", updateOverlay);
                };
        }, []);

        //set tag cloud size based on window size
        const updateOverlay = () => {
                if (wrapperRef.current) {
                        const minSide = Math.min(window.innerWidth, window.innerHeight);
                        const width = minSide * 0.6; // 60% of the smaller side
                        setWidth(width);
                        setHeight(width); // Make it square
                }
        }

        //tag cloud positioning and rotation logic
        useEffect(() => {

                //get sphere points for tags
                points.current = generateSpherePoints(tags.length);
                // console.log("Sphere points generated:", points.current);

                //create tag positions/properties based on sphere points
                const positions = tags.map((tag, index) => {
                        const point = points.current[index];

                        //apply rotation to the point based on current rotation
                        const rotatedPoint = rotatePoint(point, currentRotation.x, currentRotation.y);

                        const projected = project3DTo2D(rotatedPoint.x, rotatedPoint.y, rotatedPoint.z);

                        return {
                                text: tag,
                                x: projected.x,
                                y: projected.y,
                                z: rotatedPoint.z,
                                scale: projected.scale,
                                opacity: projected.opacity
                        };
                })

                positions.sort((a, b) => a.z - b.z); // Sort by z value to simulate depth

                setTagPositions(positions); //update tag positions

        }, [tags, width, height, currentRotation])

        const rotatePoint = (point: { x: number; y: number; z: number }, rotationX: number, rotationY: number) => {
                //rotate around X axis
                const cosX = Math.cos(-rotationX);
                const sinX = Math.sin(-rotationX);
                const y1 = point.y * cosX - point.z * sinX;
                const z1 = point.y * sinX + point.z * cosX;

                //rotate around Y axis
                const cosY = Math.cos(rotationY);
                const sinY = Math.sin(rotationY);
                const x2 = point.x * cosY + z1 * sinY;
                const z2 = -point.x * sinY + z1 * cosY;

                return {
                        x: x2, 
                        y: y1,
                        z: z2,
                }
        }

        //converts the z value to a scale and opacity to simulate depth
        const project3DTo2D = (x: number, y: number, z: number) => {
                const scale = width/2; // Adjust this to change the sphere size
                const distance = 800; // Camera distance from sphere
                const perspective = distance / (distance + z * scale);
                
                return {
                        x: (x * scale * perspective) + width / 2,
                        y: (y * scale * perspective) + height / 2,
                        scale: perspective,
                        opacity: Math.max(0.01, perspective) // Closer points are more opaque
                };
        }

        //generates n evenly spaced points on a sphere
        function generateSpherePoints(length: number): { x: number; y: number; z: number }[] {
                const points: { x: number; y: number; z: number }[] = [];
                const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

                for(let i = 0; i < length; i++){
                        const y = 1 - (i / (length - 1)) * 2;          // y goes from 1 to -1
                        const radius = Math.sqrt(1 - y * y);     
                        const theta = phi * i;                   // golden angle increment

                        const x = Math.cos(theta) * radius;
                        const z = Math.sin(theta) * radius;
                        points.push({ x, y, z });
                }
                return points;
        }

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                if(wrapperRef.current) {
                        const rect = wrapperRef.current.getBoundingClientRect();
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;

                        const mouseX = e.clientX - rect.left;
                        const mouseY = e.clientY - rect.top;

                        const deltaX = mouseX - centerX;
                        const deltaY = mouseY - centerY;
                        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
                        const normalizedDistance = Math.min(distance / maxDistance, 1); // Normalize to [-1, 1]

                        const maxRotation = 3; // Max rotation strength
                        const rotationStrength = maxRotation * normalizedDistance;

                        const x = deltaY / width * rotationStrength 
                        const y = deltaX / width * rotationStrength

                        // Normalize to keep consistent speed in all directions
                        const magnitude = Math.sqrt(x * x + y * y);
                        if (magnitude > 0) {
                                const normalizedX = (x / magnitude) * Math.min(magnitude, 1);
                                const normalizedY = (y / magnitude) * Math.min(magnitude, 1);
                                
                                setTargetRotation({ 
                                        x: normalizedX, 
                                        y: normalizedY 
                                });
                        }

                        // console.log("Mouse position:", mouseX, mouseY);
                        // console.log("Target rotation:", targetRotation);
                }
        }

        useEffect(() => {
                const animate = () => {
                        setCurrentRotation(prev => ({
                                x: prev.x + targetRotation.x * 0.05,
                                y: prev.y + targetRotation.y * 0.05
                        }))
                        // console.log("Current rotation:", currentRotation);
                        animationRef.current = requestAnimationFrame(animate);
                }

                animationRef.current = requestAnimationFrame(animate);
                return () => { //cleanup function to cancel animation frame
                        if(animationRef.current) {
                                cancelAnimationFrame(animationRef.current);
                        }
                }
        }, [targetRotation])

        return(
                <div className='skills-container'>
                        <div className='tag-cloud-window'>
                                <div ref={wrapperRef} className='tag-cloud' onMouseMove={handleMouseMove} style={{ width, height }}>
                                                {tagPositions.map((tag, index) => ( //renders all tags from tagPositions
                                                        <span
                                                                className='tag'
                                                                key={index}
                                                                style={{
                                                                        left: tag.x,
                                                                        top: tag.y,
                                                                        transform: `translate(-50%, -50%) scale(${tag.scale})`,
                                                                        opacity: tag.opacity,
                                                                }}
                                                        >
                                                                {tag.text}
                                                        </span>
                                                ))}

                                </div>
                        </div>
                </div>
        );
})

export default Skills;

