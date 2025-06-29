import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './Navbar.css'
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import ScrollToPlugin from 'gsap/src/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);


//strongly type getTimeline return type
export interface NavbarHandles {
        getTimeline: () => gsap.core.Timeline;
}

const Navbar = forwardRef<NavbarHandles, {hero: any, projects: any}>((props, ref) => {

        //state for the 'now' date
        const [now, setNow] = useState<Date>(new Date());
        const transitionTl = useRef(gsap.timeline({paused: false}));

        useGSAP(() => {
                transitionTl.current
                .from('.navbar-container', {duration: 0.001, opacity:0, ease: 'power2.inOut'})
                .from('.section-buttons-container button', {duration: 4, translateY:'-2rem', stagger:.1, opacity: 0, ease: 'power2.inOut'})
                .from('.home-button', {duration: 1, opacity:0, ease: 'power2.inOut'}, '<')
                .from('.bottom-bar-container', {duration: 4, translateY:'2rem', stagger:.1, opacity: 0, ease: 'power2.inOut'})

        })

        //pass transitionTimeline to parent
        useImperativeHandle(ref, () => ({
                getTimeline: () => transitionTl.current //typed by `export interface HeroHandles`
        }));

        //clock update
        useEffect(() => {

                //update per second
                const id = window.setInterval(() => {
                        setNow(new Date());
                }, 1000);

                //Clean up on unmount
                return () => {
                        clearInterval(id);
                };
        },[])

        return(
                <>
                        <div className='navbar-container'>
                                <div className='navbar'>
                                        <button className='home-button' onClick={ () => {
                                                gsap.to(window, {
                                                        duration: 3,
                                                        scrollTo: { y: 0 },
                                                        ease: 'power2.inOut'
                                                })
                                        }}>{"</>"}</button>
                                        <div className='section-buttons-container'>
                                                <button className='projects-button' onClick={() => {
                                                        gsap.to(window, {
                                                                duration: 3,
                                                                scrollTo: { y: 10000 },
                                                                ease: 'power2.inOut'
                                                        })
                                                }}>{"Projects"}</button>
                                                <button className='art-button' onClick={() => {
                                                        gsap.to(window, {
                                                                duration: 3,
                                                                scrollTo: { y: 20000 },
                                                                ease: 'power2.inOut'
                                                        })
                                                }}>{"Art"}</button>
                                                <button className='skills-button'>{"Skills"}</button>
                                                <button className='contact-button'>{"Contact"}</button>
                                        </div>
                                </div>
                                <div className='bottom-bar-container'>
                                        <div className='clock'>{now.toLocaleTimeString()}</div>
                                        <div className='about-me-button'></div>
                                </div>
                        </div>
                </>
        );

})

export default Navbar