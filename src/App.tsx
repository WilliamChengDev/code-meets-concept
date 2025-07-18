import { useEffect, useRef } from 'react';
import './App.css'
import Navbar, {type NavbarHandles} from './components/Navbar'
import Hero, { type HeroHandles } from './components/Hero'
import Projects, {type ProjectHandles} from './components/Projects'
import Art, {type ArtHandles} from './components/Art'
import Skills, {type SkillsHandles} from './components/Skills'
import Contact, {type ContactHandles} from './components/Contact'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

export default function App() {
        const heroRef = useRef<HeroHandles>(null);
        const navbarRef = useRef<NavbarHandles>(null);
        const projectsRef = useRef<ProjectHandles>(null);
        const artRef = useRef<ArtHandles>(null);
        const skillsRef = useRef<SkillsHandles>(null);
        const contactRef = useRef<ContactHandles>(null);

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

                //contact animation
                const contactHandles = contactRef.current;
                const contactTl = contactHandles?.getTimeline();

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
                        !contactTl ||
                        contactTl.getChildren().length === 0
                        // !skillsTl ||
                        // skillsTl.getChildren().length === 0 //adding this breaks the website animation
                ) {
                        console.log('transition animations not loaded')
                        console.log('hero:' + heroTl?.getChildren.length)
                        console.log('navbar:' + navbarTl?.getChildren.length)
                        console.log('projects:' + projectsTl?.getChildren.length)
                        console.log('art:' + artTl?.getChildren.length)
                        console.log('contact:' + contactTl?.getChildren.length)
                        return;
                }
                console.log('transition animations loaded')

                //scroll timelines
                const heroMaster = gsap.timeline({
                        scrollTrigger:{
                                trigger:   '#hero', //the element that triggers the scroll
                                start:     'top top', //trigger element's top edge, viewport top edge
                                end:       'bottom+=300% top', // three full viewport scrolls
                                scrub:     0.5,
                                pin:       true,              // set to true if you want to pin
                                markers: false, //debugging
                        }
                });

                const projectMaster = gsap.timeline({
                        scrollTrigger: {
                                trigger: '#projects',
                                start: 'top top',
                                end: 'bottom+=600% top',
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

                //adding this breaks the tag cloud animation
                // const skillsMaster = gsap.timeline({
                //         scrollTrigger: {        
                //                 trigger: '#skills',
                //                 start: 'top top',
                //                 end: 'bottom+=1000% top',
                //                 scrub: 0.5,
                //                 pin: true, // set to true if you want to pin
                //                 markers: false, //debugging
                //         }
                // });

                const contactMaster = gsap.timeline({
                        scrollTrigger: {
                                trigger: '#contact',
                                start: 'top top',
                                end: 'bottom+=100% top',
                                scrub: 0.5,
                                pin: true, // set to true if you want to pin
                                markers: false, //debugging
                        }
                })

                //add transition timelines
                heroMaster.add(heroTl);
                heroMaster.add(navbarTl);
                projectMaster.add(projectsTl);
                artMaster.add(artTl);
                // skillsMaster.add(skillsTl);
                contactMaster.add(contactTl);

                console.log('heroMaster.duration()', heroMaster.duration()); // updated to reflect the new variable name
                console.log('heroTl.duration()', heroTl.duration());
                console.log('navbarTl.duration()', navbarTl.duration());
                console.log('projectsTl.duration()', projectsTl.duration());
                console.log('artMaster.duration()', artMaster.duration());
                console.log('artTl.duration()', artTl.duration());
                // console.log('skillsMaster.duration()', skillsMaster.duration()); // added to log skillsMaster duration
                console.log('contactTl.duration()', contactTl.duration());


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
                        const STEP = window.innerHeight * .1; // 5% of viewport height; keeps scrolling speed consistent on window size change
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
                        <section id='contact'><Contact ref={contactRef} /></section>
                </div>
        )
}