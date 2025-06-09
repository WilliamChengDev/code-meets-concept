import { useEffect, useRef } from 'react';
import './App.css'
import Hero, { type HeroHandles } from './components/Hero'
import Projects from './components/Projects'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

function App() {
  
  const heroRef     = useRef<HeroHandles>(null);

        //useEffect loads after useLayoutEffect in children; guarantees timelines in children are built
        useEffect(() => {

                const heroHandles = heroRef.current;
                const heroTl = heroHandles?.getTimeline();

                //debug
                // console.log('heroRef.current:', heroHandles);
                // console.log('heroTl:', heroTl);
                // console.log('heroTl children count:', heroTl?.getChildren().length);

                if(
                        !heroTl ||
                        heroTl.getChildren().length === 0
                ) {
                        return;
                }

                //master scroll timeline
                const master = gsap.timeline({
                        scrollTrigger:{
                                trigger:   '#hero',
                                start:     'top top', //trigger element's top edge, viewport top edge
                                end:       'bottom+=200% top', // three full viewport scrolls
                                scrub:     true,
                                pin:       true,              // set to true if you want to pin
                                markers: false, //debugging
                        }
                });

                //add hero transition timeline
                master.add(heroTl, 0);

                //cleanup on unmount
                return () => ScrollTrigger.getAll().forEach(st => st.kill());
        }, [])

        return (
                <div className='app-container'>
                        <section id='hero'><Hero ref = { heroRef }/></section>
                        <section id='projects'><Projects /></section>
                </div>
        )
}

export default App
