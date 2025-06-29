import './Art.css'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import GuitarWebp from '../images/Guitar.webp';
import GuitarPng from '../images/Guitar.png';
import MadLibsWebp from '../images/MadLibs.webp';
import MadLibsPng from '../images/MadLibs.png';
import FerrariWebp from '../images/Ferrari.webp';
import FerrariPng from '../images/Ferrari.png';
import MyRoomWebp from '../images/MyRoom.webp';
import MyRoomPng from '../images/MyRoom.png';
import NissanWebp from '../images/Nissan.webp';
import NissanJpg from '../images/Nissan.jpg';
import LanternWebp from '../images/Lantern.webp';
import LanternPng from '../images/Lantern.png';
import PorscheWebp from '../images/Porsche.webp';
import PorschePng from '../images/Porsche.png';
import PhoneBoothWebp from '../images/PhoneBooth.webp';
import PhoneBoothPng from '../images/PhoneBooth.png';

//strongly type getTimeline return type
export interface ArtHandles {
        getTimeline: () => gsap.core.Timeline;
}

gsap.registerPlugin(useGSAP);

const Art = forwardRef<ArtHandles, {}>((props, ref) => {

        const transitionTl = useRef(gsap.timeline({paused: false}));

        const guitarRef = useRef<HTMLImageElement>(null);
        const lanternRef = useRef<HTMLImageElement>(null);
        const madLibsRef = useRef<HTMLImageElement>(null);
        const nissanRef = useRef<HTMLImageElement>(null);
        const phoneBoothRef = useRef<HTMLImageElement>(null);

        const porscheRef = useRef<HTMLImageElement>(null);
        const ferrariRef = useRef<HTMLImageElement>(null);

        const galleryRef = useRef<HTMLDivElement>(null);

        //pass transitionTimeline to parent
        useImperativeHandle(ref, () => ({
                getTimeline: () => transitionTl.current //typed by `export interface HeroHandles`
        }));

        useGSAP(() => {
                if (!galleryRef.current) return; //return if no container

                const galleryRect = galleryRef.current.getBoundingClientRect();

                console.log('gallery width:', galleryRect.width);

                transitionTl.current
                        .from('.art-row img', { duration: 5, translateY: '2rem', stagger: 0.05, opacity: 0, ease: 'power2.inOut' })
                        .from('.art-row img', { filter: 'grayscale(100%)', duration: 5, ease: 'power2.inOut' }, '<')
                        .to('.art-window', {translateX: `-${galleryRect.width}px`, duration: 20, ease: 'none'}, '<+=10')
        })

        //update image position based on layout of page
        const updateImagePosition = () => {
                if(
                        !guitarRef.current ||
                        !lanternRef.current || 
                        !madLibsRef.current ||
                        !nissanRef.current ||
                        !phoneBoothRef.current ||
                        !porscheRef.current ||
                        !ferrariRef.current 
                ) {
                        return;
                }

                const guitarRect = guitarRef.current.getBoundingClientRect();
                const lanternRect = lanternRef.current.getBoundingClientRect();
                const nissanRect = nissanRef.current.getBoundingClientRect();
                const porscheRect = porscheRef.current.getBoundingClientRect();
                const ferrariRect = ferrariRef.current.getBoundingClientRect();
                
                const madLibsLeftMargin = lanternRect.right - guitarRect.right + window.innerHeight * 0.046;
                const phoneBoothLeftMargin = ferrariRect.right - (porscheRect.right) + window.innerHeight * 0.046 + window.innerWidth * 0.2;
                const verticalImgHeight = nissanRect.bottom - guitarRect.top;

                //set img positions
                madLibsRef.current.style.marginLeft = `${madLibsLeftMargin}px`;
                // phoneBoothRef.current.style.marginLeft = `${phoneBoothLeftMargin}px`;
                
                //set img height values
                lanternRef.current.style.height = `${verticalImgHeight}px`;
                phoneBoothRef.current.style.height = `${verticalImgHeight}px`;

                //debug
                // console.log('guitar right:', guitarRect.right);
                // console.log('lantern right:', lanternRect.right);
                // console.log('mad libs left margin:', madLibsLeftMargin);
                // console.log('vertical img height:', verticalImgHeight);
                console.log('ferrari right:', ferrariRect.right);
                console.log('porsche right:', porscheRect.right - window.innerWidth * 0.4);
                console.log('ferrarri rect:', ferrariRect);
                console.log('porsche rect:', porscheRect);
                console.log('phone booth left margin:', phoneBoothLeftMargin);
        }

        //update image position on load and resize
        useEffect(() => {
                const onLoadOrResize = () => {
                    requestAnimationFrame(updateImagePosition); // runs after layout is complete
                };
            
                // Run once after mount
                window.addEventListener('load', onLoadOrResize);
            
                // Recalculate on resize too
                window.addEventListener('resize', onLoadOrResize);
            
                return () => {
                    window.removeEventListener('load', onLoadOrResize);
                    window.removeEventListener('resize', onLoadOrResize);
                };
        }, []);

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
                                const maxTilt = 4; //maximum tilt in degrees
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
                        scrollEndId = window.setTimeout(resetTilts, 50);
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
                        <div className='art-window' ref={galleryRef}>
                                <div className='art-row'>
                                        <picture id='guitar-img'>
                                                <source srcSet={GuitarWebp} type='image/webp'/>
                                                <img ref={guitarRef} src={GuitarPng} alt="Guitar" />
                                        </picture>
                                        <picture>
                                                <source srcSet={MadLibsWebp} type='image/webp'/>
                                                <img ref={madLibsRef} src={MadLibsPng} alt="Mad Libs" />
                                        </picture>
                                        <picture>
                                                <source srcSet={FerrariWebp} type='image/webp'/>
                                                <img ref={ferrariRef} src={FerrariPng} alt="Ferrari 458" />
                                        </picture>
                                        <picture id='top-vertical-img'>
                                                <source srcSet={PhoneBoothWebp} type='image/webp'/>
                                                <img id='phone-booth-img' ref={phoneBoothRef} src={PhoneBoothPng} alt="New Image" />
                                        </picture>
                                </div>
                                <div className='art-row'>
                                        <picture>
                                                <source srcSet={MyRoomWebp} type='image/webp'/>
                                                <img src={MyRoomPng} alt="My Room" />
                                        </picture>
                                        <picture>
                                                <source srcSet={NissanWebp} type='image/webp'/>
                                                <img ref={nissanRef} src={NissanJpg} alt="Nissan GTR" />
                                        </picture>
                                        <picture id='vertical-img' >
                                                <source srcSet={LanternWebp} type='image/webp'/>
                                                <img ref={lanternRef} src={LanternPng} alt="Lantern" />
                                        </picture>
                                        <picture id='porsche-img'>
                                                <source srcSet={PorscheWebp} type='image/webp'/>
                                                <img ref={porscheRef} src={PorschePng} alt="Porsche 911" />
                                        </picture>
                                </div>
                        </div>
                </div>
        );
})

export default Art;
