import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
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

        const width = 400
        const height = 400
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

        useEffect(() => {

                //get sphere points for tags
                points.current = genereateSpherePoints(tags.length);
                console.log("Sphere points generated:", points.current);

                //create tag positions/properties based on sphere points
                const positions = tags.map((tag, index) => {
                        const point = points.current[index];
                        const projected = project3DTo2D(point.x, point.y, point.z);

                        return {
                                text: tag,
                                x: projected.x,
                                y: projected.y,
                                z: point.z,
                                scale: projected.scale,
                                opacity: projected.opacity
                        };
                })

                positions.sort((a, b) => a.z - b.z); // Sort by z value to simulate depth

                setTagPositions(positions); //update tag positions

        }, [tags, width, height])

        //converts the z value to a scale and opacity to simulate depth
        const project3DTo2D = (x: number, y: number, z: number) => {
                const scale = 200; // Adjust this to change the sphere size
                const distance = 800; // Camera distance from sphere
                const perspective = distance / (distance + z * scale);
                
                return {
                        x: (x * scale * perspective) + width / 2,
                        y: (y * scale * perspective) + height / 2,
                        scale: perspective,
                        opacity: Math.max(0.3, perspective) // Closer points are more opaque
                };
        }

        //generates n evenly spaced points on a sphere
        function genereateSpherePoints(length: number): { x: number; y: number; z: number }[] {
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

        return(
                <div className='skills-container'>
                        <div className='tag-cloud-window'>
                                <div className='tag-cloud' style={{ width, height }}>
                                                {tagPositions.map((tag, index) => ( //renders all tags from tagPositions
                                                        <span
                                                                key={index}
                                                                style={{
                                                                position: 'absolute',
                                                                left: tag.x,
                                                                top: tag.y,
                                                                transform: `translate(-50%, -50%) scale(${tag.scale})`,
                                                                opacity: tag.opacity,
                                                                fontSize: '16px',
                                                                fontWeight: 'bold',
                                                                color: '#333',
                                                                whiteSpace: 'nowrap',
                                                                pointerEvents: 'none',
                                                                userSelect: 'none',
                                                                transition: 'all 0.3s ease'
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

