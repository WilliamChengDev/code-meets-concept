import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import './Navbar.css'
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import ScrollToPlugin from 'gsap/src/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);


//strongly type getTimeline return type
export interface NavbarHandles {
        getTimeline: () => gsap.core.Timeline;
}

const Navbar = forwardRef<NavbarHandles, {hero: any, projects: any, projectsTlDuration: any, artTlDuration:any, contactTlDuration:any}>((props, ref) => {

        //state for the 'now' date
        const [now, setNow] = useState<Date>(new Date());
        const transitionTl = useRef(gsap.timeline({paused: false}));

        //scroll position
        const [scrollPosition, setScrollPosition] = useState<number>(0);

        //positions of each section, used to update button scrollto locations
        const [projectsPosition, setProjectsPosition] = useState(0);
        const [artPosition, setArtPosition] = useState(0);
        const [skillsPosition, setSkillsPosition] = useState(0);
        const [contactPosition, setContactPosition] = useState(0);

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

        //update positions of each section based on scroll animation duration
        const updatePositions = () => {
                setProjectsPosition((window.innerHeight * 5) + (window.innerHeight * 7 * ( 3.5 / props.projectsTlDuration ))); //hero length + 3.5 seconds of projects length
                setArtPosition((window.innerHeight * 12) + (window.innerHeight * 11 * (2.5 / props.artTlDuration))) //hero + projects + 2.5 s of arts
                setSkillsPosition(window.innerHeight * 24)
                setContactPosition((window.innerHeight * 24) + (window.innerHeight * 2 * (2 / props.contactTlDuration)))
        }

        useLayoutEffect(() => {
                updatePositions();

                console.log(`projects position: ${projectsPosition}`)
                console.log(`arts position: ${artPosition}`)

                // Recompute whenever window resizes:
                window.addEventListener("resize", updatePositions);

                //remove listener on unmount
                return () => {
                        window.removeEventListener("resize", updatePositions);
                };

        }, [props.projectsTlDuration, props.artTlDuration, props.contactTlDuration])


        //update button styles based on scroll position
        useEffect(() => {
                if(scrollPosition >= projectsPosition && scrollPosition < artPosition-1){
                        gsap.to('.projects-button', {opacity: 1, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#projects-arrow', {opacity: 1, duration:0.15, ease: 'power2.inOut'});

                        gsap.to('.art-button', {opacity: 0.3, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#art-arrow', {opacity: 0, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('.skills-button', {opacity: 0.3, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#skills-arrow', {opacity: 0, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('.contact-button', {opacity: 0.3, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#contact-arrow', {opacity: 0, duration:0.15, ease: 'power2.inOut'});

                } else if(scrollPosition >= artPosition-1 && scrollPosition < skillsPosition){
                        gsap.to('.art-button', {opacity: 1, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#art-arrow', {opacity: 1, duration:0.15, ease: 'power2.inOut'});

                        gsap.to('.projects-button', {opacity: 0.3, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#projects-arrow', {opacity: 0, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('.skills-button', {opacity: 0.3, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#skills-arrow', {opacity: 0, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('.contact-button', {opacity: 0.3, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#contact-arrow', {opacity: 0, duration:0.15, ease: 'power2.inOut'});

                } else if(scrollPosition >= skillsPosition && scrollPosition < contactPosition){
                        gsap.to('.skills-button', {opacity: 1, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#skills-arrow', {opacity: 1, duration:0.15, ease: 'power2.inOut'});

                        gsap.to('.art-button', {opacity: 0.3, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#art-arrow', {opacity: 0, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('.contact-button', {opacity: 0.3, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#contact-arrow', {opacity: 0, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('.projects-button', {opacity: 0.3, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#projects-arrow', {opacity: 0, duration:0.15, ease: 'power2.inOut'});

                } else if(scrollPosition >= contactPosition){
                        gsap.to('.contact-button', {opacity: 1, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#contact-arrow', {opacity: 1, duration:0.15, ease: 'power2.inOut'});

                        gsap.to('.skills-button', {opacity: 0.3, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#skills-arrow', {opacity: 0, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('.art-button', {opacity: 0.3, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#art-arrow', {opacity: 0, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('.projects-button', {opacity: 0.3, duration:0.15, ease: 'power2.inOut'});
                        gsap.to('#projects-arrow', {opacity: 0, duration:0.15, ease: 'power2.inOut'});
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
                                                                        scrollTo: { y: projectsPosition},
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
                                                                        scrollTo: { y: artPosition },
                                                                        ease: 'power2.inOut'
                                                                })
                                                        }}>
                                                                <span id='art-arrow'>{'>'}</span>
                                                                <div>{"Art"}</div>
                                                        </button>
                                                </div>
                                                <div className='button-container'>
                                                        <button className='skills-button' onClick={() => {
                                                                gsap.to(window, {
                                                                        duration: 3,
                                                                        scrollTo: '#skills',
                                                                        ease: 'power2.inOut'
                                                                })
                                                        }}>
                                                                <span id='skills-arrow'>{'>'}</span>
                                                                <div>{"Skills"}</div>
                                                        </button>
                                                </div>
                                                <div className='button-container'>
                                                        <button className='contact-button'onClick={() => {
                                                                gsap.to(window, {
                                                                        duration: 3,
                                                                        scrollTo: {y: contactPosition},
                                                                        ease: 'power2.inOut'
                                                                })
                                                        }}>
                                                                <span id='contact-arrow'>{'>'}</span>
                                                                <div>{"Contact"}</div>
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