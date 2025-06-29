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

                transitionTl.current
                        .from('.art-row img', { duration: 5, translateY: '2rem', stagger: 0.05, opacity: 0, ease: 'power2.inOut' })
                        .from('.art-row img', { filter: 'grayscale(100%)', duration: 5, ease: 'power2.inOut' }, '<')
                        .to('.art-window', {translateX: `-${galleryRect.width}px`, duration: 20, ease: 'none'}, '<+=10')
                        .to('.art-container', {opacity: 0, duration: 0.01})
                        .to('.art-container', {display: 'none', duration: 0.01, delay: 1});
        })

        //update image position based on layout of page
        const updateImagePosition = () => {
                console.log('refs:', {
                        guitar: guitarRef.current,
                        lantern: lanternRef.current,
                        madLibs: madLibsRef.current,
                        nissan: nissanRef.current,
                        phoneBooth: phoneBoothRef.current,
                        porsche: porscheRef.current,
                        ferrari: ferrariRef.current
                });
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
                
                const madLibsLeftMargin = lanternRect.right - guitarRect.right + window.innerHeight * 0.046;
                const verticalImgHeight = nissanRect.bottom - guitarRect.top;

                //set img positions
                madLibsRef.current.style.marginLeft = `${madLibsLeftMargin}px`;
                
                //set img height values
                lanternRef.current.style.height = `${verticalImgHeight}px`;
                phoneBoothRef.current.style.height = `${verticalImgHeight}px`;

                //debug
                // console.log('guitar right:', guitarRect.right);
                // console.log('lantern right:', lanternRect.right);
                // console.log('mad libs left margin:', madLibsLeftMargin);
                // console.log('vertical img height:', verticalImgHeight);
                // console.log('madLibsRef marginLeft:', madLibsRef.current.style.marginLeft);

        }

        //update image position on load and resize
        useEffect(() => {
                const delayedUpdate = () => {
                        requestAnimationFrame(() => {
                                setTimeout(updateImagePosition, 0); // ensure full layout
                        });
                };
              
                // Always run once after mount
                delayedUpdate();
              
                // Recalculate on resize
                window.addEventListener('resize', delayedUpdate);
              
                return () => {
                        window.removeEventListener('resize', delayedUpdate);
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
