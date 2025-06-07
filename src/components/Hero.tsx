import './Hero.css';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrambleTextPlugin, TextPlugin);

function Hero() {

        const line11Ref = useRef<HTMLDivElement>(null); //for subtitle position
        const line13Ref = useRef<HTMLDivElement>(null); //for William position
        const line18Ref = useRef<HTMLDivElement>(null); //for Cheng position
        const subtitleRef = useRef<HTMLDivElement>(null); //subtitle object
        const williamRef = useRef<HTMLDivElement>(null); //william object
        const chengRef = useRef<HTMLDivElement>(null); //cheng object
        const editorContainerRef = useRef<HTMLDivElement>(null); //contains all lines of editor code
        const lineRef = useRef<HTMLDivElement>(null); //for the height of a line

        useGSAP(() => {

                let rectangleBlink = gsap.timeline({repeat: -1}); //terminal-text-rectangle blink
                        rectangleBlink.to(".terminal-rectangle", { duration: 2, opacity: 0, yoyo: true, ease: "power2.inOut"})

                let heroIn = gsap.timeline(); //hero intro animation line
                        heroIn.to(".william", { duration: 2, scrambleText: { text: "William", revealDelay: 0, speed: 0.5, } }, "<") //title scramble
                        .to(".cheng", { duration: 2, scrambleText: { text: "Cheng", revealDelay: 0, speed: 0.5, } }, "<") //title scramble
                        .to(".subtitle-text", { duration: 2, scrambleText: { text: "Code Meets Concept", revealDelay: 0, speed: 0.5, } }, "<") //subtitle scramble
                        .from(".terminal-section-container", { duration:3, marginTop:"1000px", ease: "power2.inOut" }, "<")  //terminal window glide-in

                let codeEditor = gsap.timeline(); //code editor animations
                        codeEditor.from(".animated-line", {duration: 3, text: ""})

        }) //Optional: can add scope at the end here

        const updateOverlay = () => {
                if (
                        !line11Ref.current ||
                        !line13Ref.current ||
                        !line18Ref.current ||
                        !subtitleRef.current ||
                        !williamRef.current ||
                        !chengRef.current ||
                        !editorContainerRef.current ||
                        !lineRef.current
                ) {
                  return;
                }

                const lineHeight = lineRef.current.getBoundingClientRect().height;
                // const lineHeight = line13Ref.current.getBoundingClientRect().height;
                
                const line11Rect = line11Ref.current.getBoundingClientRect();
                const line13Rect = line13Ref.current.getBoundingClientRect();
                const line18Rect = line18Ref.current.getBoundingClientRect();

                const subtitleBottomPx = line11Rect.top; // Calculate the bottom position of the subtitle
                const subtitleBottomBias = 0.89; // Bias to adjust the subtitle position

                const gapPx = line18Rect.top - line13Rect.bottom; // Calculate the gap between line 13 and line 18
                const williamTopPx = line13Rect.bottom - lineHeight / 2; // Center the "William" text vertically on line 13
                const williamTopBias = 0.93
                const williamSizeBias = 1.7
                const chengTopPx = line18Rect.bottom - lineHeight / 2; // Center the "Cheng" text vertically on line 23
                const chengSizeBias = 1.65
                const chengTopBias = 0.95

                const lines = editorContainerRef.current.querySelectorAll<HTMLDivElement>('div'); //select all child divs
            
                // set position, font size, and line height of the "William" text
                williamRef.current.style.top = williamTopPx * williamTopBias+ "px";
                williamRef.current.style.fontSize = gapPx * williamSizeBias + "px";
                williamRef.current.style.lineHeight = gapPx * williamSizeBias + "px";
                // set position, font size, and line height of the "Cheng" text
                chengRef.current.style.top = chengTopPx * chengTopBias + "px";
                chengRef.current.style.fontSize = gapPx * chengSizeBias + "px";
                chengRef.current.style.lineHeight = gapPx * chengSizeBias + "px";
                // set position of the subtitle text
                subtitleRef.current.style.top = subtitleBottomPx * subtitleBottomBias + "px";
                subtitleRef.current.style.fontSize = lineHeight * 2 + "px";
                subtitleRef.current.style.lineHeight = lineHeight * 2 + "px";

                //set height of each editor container line
                lines.forEach(line => {
                        line.style.minHeight = `calc(${lineHeight}px - 0.2rem)`; //subtract top padding of 0.2rem
                })

                //debug
                console.log("line13Bottom", line13Rect.bottom);
                console.log("line18Top", line18Rect.top);
                console.log("lineHeight", lineHeight);
                console.log("williamTopPx", williamTopPx);
                console.log("gapPx", gapPx);
        };

        useLayoutEffect(() => {
                // Run once on mount:
                updateOverlay();

                // IMPORTANT Then wait for all fonts to load, then remeasure:
                document.fonts.ready.then(() => {
                        updateOverlay();
                });

                // Recompute whenever window resizes:
                window.addEventListener("resize", updateOverlay);

                //remove listener on unmount
                return () => {
                        window.removeEventListener("resize", updateOverlay);
                };
        }, []);

        return (
        <div className="hero-container">
                <div className="code-editor-container">
                        <div className='topbar-container'>
                                <div className='topbar-tab'>
                                        <div className='topbar-tab-title'>
                                                <h1>welcome.tsx</h1>
                                        </div>
                                        <div className='topbar-tab-highlight'></div>
                                </div>
                                <div className='topbar-icons'>
                                </div>
                        </div>
                        <div className='code-section-container'>
                                <div className='numbered-lines-container'>
                                        {Array.from({ length: 70 }, (_, i) => (
                                                i == 0 ? <div key={"num" + i} ref={lineRef}>{"0" + (i + 1)}</div> :
                                                        i < 9 ? <div key={"num" + i}>{"0" + (i + 1)}</div> : <div key={"num" + i}>{i + 1}</div>
                                        ))}
                                </div>
                                <div className='number-editor-bar'></div>
                                <div className='editor-container' ref={editorContainerRef}>
                                        <div className='animated-line'>{"import CODE from 'CONCEPT'"}</div>
                                        <div className='animated-line'>{"import ReactDOM from 'react-dom/client'"}</div>

                                        <div className='animated-line'>{"import App from './App.tsx' //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"}</div>

                                        <div className='animated-line'>{"import './index.css'"}</div>
                                        <div>{"\u00a0"}</div>
                                        <div className='animated-line'>{"ReactDOM.createRoot(document.getElementById('root')!).render("}</div>
                                        <div className='animated-line indent1'>{"<React.StrictMode>"}</div> {/* Use nbsp as space since whitespace: nowrap */}
                                        <div className='animated-line indent2'>{"<App/>"}</div>
                                        <div className='animated-line indent1'>{"</React.StrictMode>"}</div>
                                        <div>{")"}</div>

                                        <div className='animated-line' ref={line11Ref}>{"//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"}</div>
                                        <div className='animated-line'>{"export default function App() {"}</div>

                                        <div className='animated-line' ref={line13Ref}>{"//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"}</div>

                                        <div className="code-with-effect">
                                                <span>{"//"}</span>
                                                <span className='plus-seg'></span>
                                                <span className='plus-seg'></span>
                                        </div>
                                        <div className="code-with-effect">
                                                <span>{"//"}</span>
                                                <span className='blank-seg'></span>
                                                <span className='blank-seg'></span>
                                        </div>
                                        <div className="code-with-effect">
                                                <span>{"//"}</span>
                                                <span className='min-seg'></span>
                                                <span className='blank-seg'></span>
                                        </div>
                                        <div className="code-with-effect">
                                                <span>{"//"}</span>
                                                <span className='blank-seg'></span>
                                                <span className='star-seg'></span>
                                        </div>
                                        <div className='code-with-effect'>
                                                <div className='animated-line' ref={line18Ref}>//------------------------/</div>
                                                <div className='animated-line'>/-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</div>
                                        </div>
                                        <div className="code-with-effect">
                                                <span>{"//"}</span>
                                                <span className='min-seg'></span>
                                                <span className='min-seg'></span>
                                        </div>
                                        <div className="code-with-effect">
                                                <span>{"//"}</span>
                                                <span className='star-seg'></span>
                                                <span className='blank-seg'></span>
                                                <span className='plus-seg'></span>
                                        </div>
                                        <div className="code-with-effect">
                                                <span>{"//"}</span>
                                                <span className='blank-seg'></span>
                                                <span className='min-seg'></span>
                                                <span className='min-seg'></span>
                                        </div>
                                        <div className="code-with-effect">
                                                <span>{"//"}</span>
                                                <span className='plus-seg'></span>
                                                <span className='plus-seg'></span>
                                        </div>
                                        <div className='animated-line'>{"//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"}</div>

                                        <div className='animated-line indent1'>{"return ("}</div>
                                        <div className='animated-line indent2'>{"<>\u00a0<!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"}</div>

                                        <div className='animated-line indent3'>{"<PreLoader loaded={loaded} trigger = {startPage}/>"}</div>
                                        <div className='animated-line indent3'>{"<div className='app-container' onWheel={handleScroll}>"}</div>
                                        <div className='animated-line indent4'>{"<TransitionCover page={scroll}/>"}</div>
                                        <div className='animated-line indent4'>{"<Loader/>"}</div>
                                        <div className='animated-line indent4'>{"<TopRow/>"}</div>
                                        <div className='animated-line indent4'>{"<Home/>"}</div>
                                        <div className='animated-line indent4'>{"<Page1Blender/>"}</div>
                                        <div className='animated-line indent3'>{"</div>"}</div>
                                        <div className='animated-line indent2'>{"</>"}</div>
                                        <div className='animated-line indent1'>{")"}</div>
                                        <div className='animated-line'>{"}"}</div>
                                </div>
                        </div>
                        <div className='terminal-section-container'>
                                <div className='terminal-topbar'>
                                        <div className='terminal-topbar-text'>Problems</div>
                                        <div className='terminal-topbar-text'>Output</div>
                                        <div className='terminal-topbar-text'>Debug Console</div>
                                        <div className='terminal-button-container'>
                                                <div className='terminal-button-text'>Terminal</div>
                                                <div className='terminal-button-bar'></div>
                                        </div>
                                        <div className='terminal-topbar-text'>Ports</div>
                                </div>
                                <div className='terminal-text-container'>
                                        <div className='terminal-text-left'>
                                                <div className='circle'></div>
                                                <h1>PS C:\Code\Project\Enter</h1>
                                        </div>
                                        <div className='terminal-text-right'>
                                                <h1>Scroll to Enter</h1>
                                                <div className='terminal-rectangle'></div>
                                        </div>
                                </div>
                        </div>
                </div>
                <div className='subtitle-container' ref={subtitleRef}>
                        <div className='subtitle-comment'>//</div>
                        <div className='subtitle-text'>Code Meets Concept</div>
                </div>
                <div className='william' ref={williamRef}>FstName</div>
                <div className='cheng' ref={chengRef}>Loading...</div>
        </div>
        );
}

export default Hero;