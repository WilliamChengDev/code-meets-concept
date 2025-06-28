import './Art.css'
import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef } from "react";
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import GuitarWebp from '../images/Guitar.webp';
import GuitarPng from '../images/Guitar.png';
import MadLibsWebp from '../images/MadLibs.webp';
import MadLibsPng from '../images/MadLibs.png';
import MyRoomWebp from '../images/MyRoom.webp';
import MyRoomPng from '../images/MyRoom.png';
import NissanWebp from '../images/Nissan.webp';
import NissanJpg from '../images/Nissan.jpg';
import LanternWebp from '../images/Lantern.webp';
import LanternPng from '../images/Lantern.png';
import PorscheWebp from '../images/Porsche.webp';
import PorschePng from '../images/Porsche.png';

//strongly type getTimeline return type
export interface ArtHandles {
        getTimeline: () => gsap.core.Timeline;
}

gsap.registerPlugin(useGSAP);

const Art = forwardRef<ArtHandles, {}>((props, ref) => {

        const transitionTl = useRef(gsap.timeline({paused: false}));

        const lanternImg = useRef<HTMLImageElement>(null);
        const madLibsImg = useRef<HTMLImageElement>(null);

        //pass transitionTimeline to parent
        useImperativeHandle(ref, () => ({
                getTimeline: () => transitionTl.current //typed by `export interface HeroHandles`
        }));

        useGSAP(() => {
                transitionTl.current
                        .from('.art-row img', { duration: 5, translateY: '2rem', stagger: 0.05, opacity: 0, ease: 'power2.inOut' })
                        .from('.art-row img', { filter: 'grayscale(100%)', duration: 5, ease: 'power2.inOut' }, '<')
                        .to('.art-row', {xPercent: -100, duration: 20, ease: 'none'}, '<+=10')
        })

        const updateImagePosition = () => {
                undefined
        }

        useLayoutEffect(() => {

                updateImagePosition();

                // Recompute whenever window resizes:
                window.addEventListener("resize", updateImagePosition);

                //remove listener on unmount
                return () => {
                        window.removeEventListener("resize", updateImagePosition);
                };
        })

        //image tilt update
        useEffect(() => {
                //select all images on art page
                const items = Array.from( 
                        document.querySelectorAll<HTMLImageElement>('.art-row picture img')
                );
                if (!items.length) return; //return if no images

                let ticking = false;    //keep track of updates; only update once per frame, not per scroll event
                let scrollEndId: number; // timer to reset tilts after scrolling stops
                let lastY = window.scrollY; // remember where we were last frame

                const updateTilts = (dir: number) => {

                        items.forEach((item) => {
                                const maxTilt = 2; //maximum tilt in degrees
                                // gsap.killTweensOf(item); //kill any ongoing tweens

                                //tilt art image using gsap
                                gsap.to(item, {
                                        rotationY: dir * maxTilt, //tilt left or right
                                        rotationX: 0,
                                        transformPerspective: 1500,
                                        duration: 1,
                                        ease: 'power3.out'
                                        });
                        })

                        ticking = false; //reset ticking
                }

                // when scroll stops, tween back to flat
                const resetTilts = () => {
                        gsap.to(items, {
                        rotationY: 0,
                        rotationX: 0,
                        transformPerspective: 1500,
                        duration: 2,
                        ease: 'power3.out'
                        });
                };

                const onScroll = () => {
                        const currentY = window.scrollY;
                        const delta   = currentY - lastY;
                        lastY = currentY;

                        // dir = +1 when scrolling down, –1 when scrolling up
                        const dir = Math.sign(delta) || 0;

                        if (!ticking) {
                                //only update once per frame, not per scroll event
                                window.requestAnimationFrame(() => updateTilts(dir)); 
                                ticking = true;
                        }
                         // reset the “scroll end” timer
                        clearTimeout(scrollEndId);
                        scrollEndId = window.setTimeout(resetTilts, 150);
                }

                updateTilts(0); //initial tilt update
                window.addEventListener('scroll', onScroll, {passive: true}); //run onScroll every scroll event
                return () => {
                        window.removeEventListener('scroll', onScroll);
                        clearTimeout(scrollEndId);
                        // gsap.killTweensOf(items);  // cleanup any ongoing tweens
                        items.forEach(el => (el.style.transform = '')); // cleanup transforms
                };

        }, []);

        return (
                <div className="art-container">
                        <div className='art-window'>
                                <div className='art-row'>
                                        <picture id='guitar-img'>
                                                <source srcSet={GuitarWebp} type='image/webp'/>
                                                <img src={GuitarPng} alt="Guitar" />
                                        </picture>
                                        <picture>
                                                <source srcSet={MadLibsWebp} type='image/webp'/>
                                                <img src={MadLibsPng} alt="Mad Libs" />
                                        </picture>
                                </div>
                                <div className='art-row'>
                                        <picture>
                                                <source srcSet={MyRoomWebp} type='image/webp'/>
                                                <img src={MyRoomPng} alt="My Room" />
                                        </picture>
                                        <picture>
                                                <source srcSet={NissanWebp} type='image/webp'/>
                                                <img src={NissanJpg} alt="Nissan GTR" />
                                        </picture>
                                        <picture id='vertical-img'>
                                                <source srcSet={LanternWebp} type='image/webp'/>
                                                <img src={LanternPng} alt="Lantern" />
                                        </picture>
                                        <picture id='porsche-img'>
                                                <source srcSet={PorscheWebp} type='image/webp'/>
                                                <img src={PorschePng} alt="Porsche 911" />
                                        </picture>
                                </div>
                        </div>
                </div>
        );
})

export default Art;
