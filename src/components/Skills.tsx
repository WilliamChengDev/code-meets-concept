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

        const transitionTl = useRef(gsap.timeline({paused: false}));
        const [tags, setTags] = useState(["Java", "Python", "Haskell", "SQL", "JavaScript", "TypeScript", "HTML/CSS", "UML", "React", "Node.js", "Express.js", "Git", "VS Code", "Visual Studio", "IntelliJ", "Eclipse", "Adobe Photoshop", "Adobe Illustrator", "Blender 3D", "Three.js", "PIXI.js", "Matter.js", "GSAP", "pandas", "NumPy"]);

        //pass transitionTimeline to parent
        useImperativeHandle(ref, () => ({
                getTimeline: () => transitionTl.current //typed by `export interface SkillsHandles`
        }));

        useEffect(() => {

        }, [])

        return(
                <div className='skills-container'>
                        <div className='tag-cloud-window'>
                                <div className='tag-cloud'></div>
                        </div>
                </div>
        );
})

export default Skills;
