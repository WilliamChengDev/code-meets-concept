import './Art.css'
import { forwardRef, useImperativeHandle, useRef } from "react";
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import GuitarWebp from '../images/Guitar.webp';
import MadLibsWebp from '../images/MadLibs.webp';
import MyRoomWebp from '../images/MyRoom.webp';
import NissanWebp from '../images/Nissan.webp';
import LanternWebp from '../images/Lantern.webp';
import PorscheWebp from '../images/Porsche.webp';

//strongly type getTimeline return type
export interface ArtHandles {
        getTimeline: () => gsap.core.Timeline;
}

gsap.registerPlugin(useGSAP);

const Art = forwardRef<ArtHandles, {}>((props, ref) => {

        const transitionTl = useRef(gsap.timeline({paused: false}));

        //pass transitionTimeline to parent
        useImperativeHandle(ref, () => ({
                getTimeline: () => transitionTl.current //typed by `export interface HeroHandles`
        }));

        useGSAP(() => {
                transitionTl.current
                        .from('.art-row img', { duration: 2, translateY: '2rem', stagger: 0.05, opacity: 0, ease: 'power2.inOut' })
                        .from('.art-row img', { filter: 'grayscale(100%)', duration: 2, ease: 'power2.inOut' }, '<')
                        .to('.art-row', {translateX: '-100%', duration: 20, ease: 'none', delay:5} )
        })

        return (
                <div className="art-container">
                        <div className='art-window'>
                                <div className='art-row'>
                                        <img id='guitar-img' src={GuitarWebp} alt="Guitar" loading='lazy' />
                                        <img src={MadLibsWebp} alt="Mad Libs" loading='lazy' />
                                </div>
                                <div className='art-row'>
                                        <img src={MyRoomWebp} alt="Room" loading='lazy' />
                                        <img src={NissanWebp} alt="Room" loading='lazy' />
                                        <img id='vertical-img' src={LanternWebp} alt="Lantern" loading='lazy' />
                                        <img id='porsche-img' src={PorscheWebp} alt="Porsche" loading='lazy' />
                                </div>
                        </div>
                </div>
        );
})

export default Art;


