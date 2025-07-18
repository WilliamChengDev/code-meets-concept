import { forwardRef, useImperativeHandle, useRef } from 'react';
import './Contact.css'
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import profilePng from "../images/Nuggs-Original-Plant-Based-Chicken-Nuggets.jpg"
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

        useGSAP(() => {
                transitionTl.current
                        .from('.about-me', {translateX: '-10rem', duration: 1, opacity:0})
                        .to('#contact-name', {scrambleText: {text: "William Cheng", revealDelay: 0, speed: 0.5}}, '<')
                        .from('#contact-text', {translateY: '3rem', opacity: 0, duration: 1}, '<')
        }, [])

        //pass transitionTimeline to parent
        useImperativeHandle(ref, () => ({
                getTimeline: () => transitionTl.current //typed by `export interface ContactHandles`
        }));

        return(
                <div className='contact-container'>
                        <div className='contact-window'>
                                <div className='about-me'>
                                        <div className='about-top-bar'></div>
                                        <div className='profile-window'>
                                                <picture className='profile-picture'>
                                                        {/* <source srcSet={emailWebp} type='image/webp'/> */}
                                                        <img src={profilePng} alt="profile picture" />
                                                </picture>
                                        </div>
                                        <div className='about-section'>
                                                <div className='about-low-bar'><h3>{"About"}</h3></div>
                                                <div className='about-description'>
                                                        <div className='about-description-text'>
                                                                <h1>Name:</h1>
                                                                <p>William Cheng</p>
                                                                <h1>Current Roles:</h1>
                                                                <p>Resident Assistant, Student</p>
                                                                <h1>Skills:</h1>
                                                                <p>Outside of coding, I like skateboarding, art, and extra raw sushi.</p>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                                <div className='contact-description-window'>
                                        <div className='contact-description'>
                                                <h1 id='contact-name'>{'loading...'}</h1>
                                                <h2>The University of Iowa, Iowa City, IA</h2>
                                                <p id='contact-text'>Driven and resilient rising sophomore computer science/psychology major. Passionate problem-solver and self-learner, skills include Java/Python/HTML/JS/SQL/React and more. Experienced in graphic design and a proficiency for working in fast-paced collaborative environments.</p>
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
                                                                <img src={emailPng} alt="email icon" />
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