import { useEffect, useRef } from 'react';
import './App.css'
import Navbar, {type NavbarHandles} from './components/Navbar'
import Hero, { type HeroHandles } from './components/Hero'
import Projects, {type ProjectHandles} from './components/Projects'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

export default function App() {
        const heroRef = useRef<HeroHandles>(null);
        const navbarRef = useRef<NavbarHandles>(null);
        const projectsRef = useRef<ProjectHandles>(null);

        //useEffect loads after useLayoutEffect in children; guarantees timelines in children are built
        useEffect(() => {

                //hero page animation
                const heroHandles = heroRef.current;
                const heroTl = heroHandles?.getTimeline();

                //navbar animation
                const navbarHandles = navbarRef.current;
                const navbarTl = navbarHandles?.getTimeline();

                //projects animation
                const projectsHandles = projectsRef.current; 
                const projectsTl = projectsHandles?.getTimeline();

                //debug
                // console.log('navbarRef.current:', navbarHandles);
                // console.log('navbarTl:', navbarTl);
                // console.log('navbarTl children count:', navbarTl?.getChildren().length);

                if(
                        !heroTl ||
                        heroTl.getChildren().length === 0 ||
                        !navbarTl ||
                        navbarTl.getChildren().length === 0 ||
                        !projectsTl ||
                        projectsTl.getChildren().length === 0
                ) {
                        return;
                }

                //scroll timelines
                const heroMaster = gsap.timeline({
                        scrollTrigger:{
                                trigger:   '#hero', //the element that triggers the scroll
                                start:     'top top', //trigger element's top edge, viewport top edge
                                end:       'bottom+=700% top', // three full viewport scrolls
                                scrub:     0.5,
                                pin:       true,              // set to true if you want to pin
                                markers: true, //debugging
                        }
                });

                const projectMaster = gsap.timeline({
                        scrollTrigger: {
                                trigger: '#projects',
                                start: 'top top',
                                end: 'bottom+=300% top',
                                // scrub: 0.5,
                                toggleActions: "play none reverse none",
                                pin: true, // set to true if you want to pin
                                markers: true, //debugging
                        }
                })

                //add transition timelines
                heroMaster.add(heroTl);
                heroMaster.add(navbarTl);
                projectMaster.add(projectsTl);

                console.log('heroMaster.duration()', heroMaster.duration()); // updated to reflect the new variable name
                console.log('heroTl.duration()', heroTl.duration());
                console.log('navbarTl.duration()', navbarTl.duration());
                console.log('projectsTl.duration()', projectsTl.duration());

                //cleanup on unmount
                return () => {
                    ScrollTrigger.getAll().forEach(st => st.kill());
                    heroMaster.kill(); // added to clean up the heroMaster timeline
                };
        }, [])

        return (
                <div className='app-container'>
                        <Navbar ref = { navbarRef }/>
                        <section id='hero'><Hero ref = { heroRef }/></section>
                        <section id='projects'><Projects ref={ projectsRef } /></section>
                </div>
        )
}