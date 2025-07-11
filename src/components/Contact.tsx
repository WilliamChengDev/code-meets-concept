import { forwardRef, useImperativeHandle, useRef } from 'react';
import './Contact.css'
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import linkedinPng from "../images/linkedin.png"
import linkedinWebp from "../images/linkedin.webp"
import githubPng from "../images/github.png"
import githubWebp from "../images/github.webp"
import emailPng from "../images/email.png"
import emailWebp from "../images/email.webp"

gsap.registerPlugin(useGSAP, ScrambleTextPlugin, TextPlugin);

//strongly type getTimeline return type
export interface ContactHandles {
        getTimeline: () => gsap.core.Timeline;
}

const Contact = forwardRef<ContactHandles, {}>((props, ref) => {

        const transitionTl = useRef(gsap.timeline({paused: false}));

        //pass transitionTimeline to parent
        useImperativeHandle(ref, () => ({
                getTimeline: () => transitionTl.current //typed by `export interface ContactHandles`
        }));

        return(
                <div className='contact-container'>
                        <div className='contact-window'>
                                <div className='about-me'>
                                        <div className='about-top-bar'></div>
                                        <div className='profile-window'></div>
                                        <div className='about-low-bar'><h3>{"About"}</h3></div>
                                        <div className='about-description'></div>
                                </div>
                                <div className='contact-description-window'>
                                        <div className='contact-description'>
                                                <h1>William Cheng</h1>
                                                <h2>The University of Iowa, Iowa City, IA</h2>
                                                <p>Driven and resilient rising sophomore computer science/psychology major. Passionate problem-solver and self-learner, skills include Java/Python/HTML/JS/SQL/React and more. Experienced in graphic design and a proficiency for working in fast-paced collaborative environments.</p>
                                        </div>
                                        <div className='contact-icons-container'>
                                                <a href="https://linkedin.com/in/william-cheng-39a06027a" target="_blank" rel="noopener noreferrer" >
                                                        <picture className='contact-icon'>
                                                                <source srcSet={linkedinWebp} type='image/webp'/>
                                                                <img src={linkedinPng} alt="linkedin icon" />
                                                                <h1>Connect!</h1>
                                                        </picture>
                                                </a>
                                                <a href="https://linkedin.com/in/william-cheng-39a06027a" target="_blank" rel="noopener noreferrer">
                                                        <picture className='contact-icon'>
                                                                <source srcSet={githubWebp} type='image/webp'/>
                                                                <img src={githubPng} alt="github icon" />
                                                                <h1>More Projects</h1>
                                                        </picture>
                                                </a>
                                                <a href="https://linkedin.com/in/william-cheng-39a06027a" target="_blank" rel="noopener noreferrer"> 
                                                        <picture className='contact-icon'>
                                                                <source srcSet={emailWebp} type='image/webp'/>
                                                                <img src={emailWebp} alt="email icon" />
                                                                <h1>Get in Touch</h1>
                                                        </picture>
                                                </a>
                                        </div>
                                </div>
                        </div>
                </div>
        );

});

export default Contact;