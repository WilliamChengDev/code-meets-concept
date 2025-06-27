import './Art.css'
import { forwardRef } from "react";
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

const Art = forwardRef<ArtHandles, {}>((props, ref) => {


        return (
                <div className="art-container">
                        <div className='art-window'>
                                <div className='art-row'>
                                        <img id='guitar-img' src={GuitarWebp} alt="Guitar" />
                                        <img src={MadLibsWebp} alt="Mad Libs" />
                                </div>
                                <div className='art-row'>
                                        <img src={MyRoomWebp} alt="Room" />
                                        <img src={NissanWebp} alt="Room" />
                                        <img id='vertical-img' src={LanternWebp} alt="Room" />
                                        <img id='porsche-img' src={PorscheWebp} alt="Porsche" />
                                </div>
                        </div>
                </div>
        );
})

export default Art;


