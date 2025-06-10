import { useEffect, useRef } from 'react';
import './App.css'
import Navbar, {type NavbarHandles} from './components/Navbar'
import Hero, { type HeroHandles } from './components/Hero'
import Projects from './components/Projects'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

function App() {

        const heroRef = useRef<HeroHandles>(null);
        const navbarRef = useRef<NavbarHandles>(null);

        //useEffect loads after useLayoutEffect in children; guarantees timelines in children are built
        useEffect(() => {

                //hero page animation
                const heroHandles = heroRef.current;
                const heroTl = heroHandles?.getTimeline();

                //navbar animation
                const navbarHandles = navbarRef.current;
                const navbarTl = navbarHandles?.getTimeline();

                //debug
                // console.log('navbarRef.current:', navbarHandles);
                // console.log('navbarTl:', navbarTl);
                // console.log('navbarTl children count:', navbarTl?.getChildren().length);

                if(
                        !heroTl ||
                        heroTl.getChildren().length === 0 ||
                        !navbarTl ||
                        navbarTl.getChildren().length === 0
                ) {
                        return;
                }

                //master scroll timeline
                const master = gsap.timeline({
                        scrollTrigger:{
                                trigger:   '#hero',
                                start:     'top top', //trigger element's top edge, viewport top edge
                                end:       'bottom+=700% top', // three full viewport scrolls
                                scrub:     0.5,
                                pin:       true,              // set to true if you want to pin
                                markers: true, //debugging
                        }
                });

                //add hero transition timeline
                master.add(heroTl);
                master.add(navbarTl);

                console.log('master.duration()', master.duration());
                console.log('heroTl.duration()', heroTl.duration());
                console.log('navbarTl.duration()', navbarTl.duration());

                //cleanup on unmount
                return () => ScrollTrigger.getAll().forEach(st => st.kill());
        }, [])

        return (
                <div className='app-container'>
                        <Navbar ref = { navbarRef }/>
                        <section id='hero'><Hero ref = { heroRef }/></section>
                        <section id='projects'><Projects /></section>
                </div>
        )
}

export default App
