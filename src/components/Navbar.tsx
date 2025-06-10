import { forwardRef, useImperativeHandle, useRef } from 'react';
import './Navbar.css'
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";


//strongly type getTimeline return type
export interface NavbarHandles {
        getTimeline: () => gsap.core.Timeline;
}

const Navbar = forwardRef<NavbarHandles, {}>((props, ref) => {

        const transitionTl = useRef(gsap.timeline({paused: false}));

        useGSAP(() => {
                transitionTl.current
                .from('.navbar-container', {duration: 0.001, opacity:0, ease: 'power2.inOut'})
                .from('.section-buttons-container button', {duration: 4, translateY:'-2rem', stagger:.1, opacity: 0, ease: 'power2.inOut'})
                .from('.home-button', {duration: 1, opacity:0, ease: 'power2.inOut'}, '<')
        })

        //pass transitionTimeline to parent
        useImperativeHandle(ref, () => ({
                getTimeline: () => transitionTl.current //typed by `export interface HeroHandles`
        }));

        return(
                <div className='navbar-container'>
                        <div className='navbar'>
                                <button className='home-button'>{"</>"}</button>
                                <div className='section-buttons-container'>
                                        <button className='projects-button'>{"Projects"}</button>
                                        <button className='art-button'>{"Art"}</button>
                                        <button className='skills-button'>{"Skills"}</button>
                                        <button className='contact-button'>{"Contact"}</button>
                                </div>
                        </div>
                </div>
        );

})

export default Navbar