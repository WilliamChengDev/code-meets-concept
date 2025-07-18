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

        //scroll position
        const [scrollPosition, setScrollPosition] = useState<number>(0);

        //update scroll position on scroll
        useEffect(() => {
                const handleScroll = () => {
                        setScrollPosition(window.scrollY);
                };

                // console.log('scrollPosition:', scrollPosition);

                //add scroll event listener
                window.addEventListener('scroll', handleScroll);

                //cleanup on unmount
                return () => {
                        window.removeEventListener('scroll', handleScroll);
                };
        }, [scrollPosition]);

        //update button styles based on scroll position
        useEffect(() => {
                if(scrollPosition >= 11000 && scrollPosition < 22000){
                        gsap.to('.projects-button', {opacity: 1, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#projects-arrow', {opacity: 1, duration:0.15, ease: 'power2.inOut'});

                        gsap.to('.art-button', {opacity: 0.3, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#art-arrow', {opacity: 0, duration:0.15, ease: 'power2.inOut'});

                } else if(scrollPosition >= 22000 && scrollPosition < 31000){
                        gsap.to('.art-button', {opacity: 1, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#art-arrow', {opacity: 1, duration:0.15, ease: 'power2.inOut'});

                        gsap.to('.projects-button', {opacity: 0.3, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#projects-arrow', {opacity: 0, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('.skills-button', {opacity: 0.3, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#skills-arrow', {opacity: 0, duration:0.15, ease: 'power2.inOut'});

                } else if(scrollPosition >= 31000 && scrollPosition < 32000){
                        gsap.to('.skills-button', {opacity: 1, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#skills-arrow', {opacity: 1, duration:0.15, ease: 'power2.inOut'});

                        gsap.to('.art-button', {opacity: 0.3, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#art-arrow', {opacity: 0, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('.contact-button', {opacity: 0.3, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#contact-arrow', {opacity: 0, duration:0.15, ease: 'power2.inOut'});
                } else if(scrollPosition >= 32000){
                        gsap.to('.contact-button', {opacity: 1, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#contact-arrow', {opacity: 1, duration:0.15, ease: 'power2.inOut'});

                        gsap.to('.skills-button', {opacity: 0.3, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#skills-arrow', {opacity: 0, duration:0.15, ease: 'power2.inOut'});
                }
        }, [scrollPosition])

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
                                                <div className='button-container'>
                                                        <button className='projects-button' onClick={() => {
                                                                gsap.to(window, {
                                                                        duration: 3,
                                                                        scrollTo: { y: 11000 },
                                                                        ease: 'power2.inOut'
                                                                })
                                                        }}>
                                                                <span id='projects-arrow'>{'>'}</span>
                                                                <div>{"Projects"}</div>
                                                        </button>
                                                </div>
                                                <div className='button-container'>
                                                        <button className='art-button' onClick={() => {
                                                                gsap.to(window, {
                                                                        duration: 3,
                                                                        scrollTo: { y: 22000 },
                                                                        ease: 'power2.inOut'
                                                                })
                                                        }}>
                                                                <span id='art-arrow'>{'>'}</span>
                                                                {"Art"}
                                                        </button>
                                                </div>
                                                <div className='button-container'>
                                                        <button className='skills-button' onClick={() => {
                                                                gsap.to(window, {
                                                                        duration: 3,
                                                                        scrollTo: { y: 31611 },
                                                                        ease: 'power2.inOut'
                                                                })
                                                        }}>
                                                                <span id='skills-arrow'>{'>'}</span>
                                                                {"Skills"}
                                                        </button>
                                                </div>
                                                <div className='button-container'>
                                                        <button className='contact-button'onClick={() => {
                                                                gsap.to(window, {
                                                                        duration: 3,
                                                                        scrollTo: '#contact',
                                                                        ease: 'power2.inOut'
                                                                })
                                                        }}>
                                                                <span id='contact-arrow'>{'>'}</span>
                                                                {"Contact"}
                                                        </button>
                                                </div>
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