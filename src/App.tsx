import { useEffect, useRef } from 'react';
import './App.css'
import Navbar, {type NavbarHandles} from './components/Navbar'
import Hero, { type HeroHandles } from './components/Hero'
import Projects, {type ProjectHandles} from './components/Projects'
import Art, {type ArtHandles} from './components/Art'
import Skills, {type SkillsHandles} from './components/Skills'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

export default function App() {
        const heroRef = useRef<HeroHandles>(null);
        const navbarRef = useRef<NavbarHandles>(null);
        const projectsRef = useRef<ProjectHandles>(null);
        const artRef = useRef<ArtHandles>(null);
        const skillsRef = useRef<SkillsHandles>(null);

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

                //art animation
                const artHandles = artRef.current;
                const artTl = artHandles?.getTimeline();

                //skills animation
                const skillsHandles = skillsRef.current;
                const skillsTl = skillsHandles?.getTimeline();

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
                        projectsTl.getChildren().length === 0 ||
                        !artTl ||
                        artTl.getChildren().length === 0 || 
                        !skillsTl ||
                        skillsTl.getChildren().length === 0
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
                                markers: false, //debugging
                        }
                });

                const projectMaster = gsap.timeline({
                        scrollTrigger: {
                                trigger: '#projects',
                                start: 'top top',
                                end: 'bottom+=1000% top',
                                scrub: 0.5,
                                pin: true, // set to true if you want to pin
                                markers: false, //debugging
                        }
                })

                const artMaster = gsap.timeline({
                        scrollTrigger: {
                                trigger: '#art',
                                start: 'top top',
                                end: 'bottom+=1000% top',
                                scrub: 0.5,
                                pin: true, // set to true if you want to pin
                                markers: false, //debugging
                        }
                })

                const skillsMaster = gsap.timeline({
                        scrollTrigger: {        
                                trigger: '#skills',
                                start: 'top top',
                                end: 'bottom+=1000% top',
                                scrub: 0.5,
                                pin: true, // set to true if you want to pin
                                markers: false, //debugging
                        }
                });

                //add transition timelines
                heroMaster.add(heroTl);
                heroMaster.add(navbarTl);
                projectMaster.add(projectsTl);
                artMaster.add(artTl);
                skillsMaster.add(skillsTl);

                console.log('heroMaster.duration()', heroMaster.duration()); // updated to reflect the new variable name
                console.log('heroTl.duration()', heroTl.duration());
                console.log('navbarTl.duration()', navbarTl.duration());
                console.log('projectsTl.duration()', projectsTl.duration());
                console.log('artMaster.duration()', artMaster.duration());
                console.log('artTl.duration()', artTl.duration());
                console.log('skillsMaster.duration()', skillsMaster.duration()); // added to log skillsMaster duration

                //cleanup on unmount
                return () => {
                    ScrollTrigger.getAll().forEach(st => st.kill());
                    heroMaster.kill(); // added to clean up the heroMaster timeline
                };
        }, [])

        //scroll normalization
        useEffect(() => {
                const wheelHandler = (e: WheelEvent) => {
                        e.preventDefault();
                        const dir = Math.sign(e.deltaY);             // +1 or -1
                        const STEP = window.innerHeight * 0.1; // 5% of viewport height; keeps scrolling speed consistent on window size change
                        window.scrollBy({ top: dir * STEP, behavior: 'auto' });
                };

                const resizeHandler = () => {
                        ScrollTrigger.refresh(); // make sure animations sync with layout
                };

                window.addEventListener('wheel', wheelHandler, { passive: false });
                window.addEventListener('resize', resizeHandler);
                
                return () => {
                        window.removeEventListener('wheel', wheelHandler);
                        window.removeEventListener('resize', resizeHandler);
                };
        }, [])

        return (
                <div className='app-container'>
                        <Navbar ref = { navbarRef } hero={heroRef} projects={projectsRef}/>
                        <section id='hero'><Hero ref = { heroRef }/></section>
                        <section id='projects'><Projects ref={ projectsRef } /></section>
                        <section id='art'><Art ref={artRef} /></section>
                        <section id='skills'><Skills ref={skillsRef}/></section>
                </div>
        )
}