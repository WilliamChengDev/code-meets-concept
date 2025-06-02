import './Hero.css';
import { useLayoutEffect, useRef } from 'react';

function Hero() {

        const line11Ref = useRef<HTMLDivElement>(null);
        const line13Ref = useRef<HTMLDivElement>(null);
        const line18Ref = useRef<HTMLDivElement>(null);
        const subtitleRef = useRef<HTMLDivElement>(null);
        const williamRef = useRef<HTMLDivElement>(null);
        const chengRef = useRef<HTMLDivElement>(null);

        const updateOverlay = () => {
                if (
                        !line11Ref.current ||
                        !line13Ref.current ||
                        !line18Ref.current ||
                        !subtitleRef.current ||
                        !williamRef.current ||
                        !chengRef.current
                ) {
                  return;
                }
                
                const lineHeight = line13Ref.current.getBoundingClientRect().height;
                
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


                console.log("line13Bottom", line13Rect.bottom);
                console.log("line18Top", line18Rect.top);
                console.log("lineHeight", lineHeight);
                console.log("williamTopPx", williamTopPx);
                console.log("gapPx", gapPx);
            
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
                                                i < 9 ? <div key={"num" + i}>{"0" + (i + 1)}</div> : <div key={"num" + i}>{i + 1}</div>
                                        ))}
                                </div>
                                <div className='number-editor-bar'></div>
                                <div className='editor-container'>
                                        <div>{"import CODE from 'CONCEPT'"}</div>
                                        <div>{"import ReactDOM from 'react-dom/client'"}</div>

                                        {/* This is the line we want to “dash‐fill” */}
                                        <div className="code-with-effect">
                                                <span className="code-text">import App from './App.tsx'</span>
                                                <span>{"//"}</span>
                                                <span className="dash-fill"></span>
                                        </div>

                                        <div>{"import './index.css'"}</div>
                                        <div>{"\u00a0"}</div>
                                        <div>{"ReactDOM.createRoot(document.getElementById('root')!).render("}</div>
                                        <div>{"\u00a0\u00a0\u00a0\u00a0\u00a0<React.StrictMode>"}</div> {/* Use nbsp as space since whitespace: nowrap */}
                                        <div>{"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0<App/>"}</div>
                                        <div>{"\u00a0\u00a0\u00a0\u00a0\u00a0</React.StrictMode>"}</div>
                                        <div>{")"}</div>

                                        <div className="code-with-effect" ref={line11Ref}>
                                                <span>{"//"}</span>
                                                <span className="dash-fill"></span>
                                        </div>

                                        <div>{"export default function App() {"}</div>

                                        <div className="code-with-effect" ref={line13Ref}>
                                                <span>{"//"}</span>
                                                <span className="dash-fill"></span>
                                        </div>
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
                                        <div className="code-with-effect" ref={line18Ref}>
                                                <span>{"//"}</span>
                                                <span className='min-seg'></span>
                                                <span className='blank-seg'></span>
                                                <div className='dash-fill'></div>
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
                                        <div className="code-with-effect">
                                                <span>{"//"}</span>
                                                <span className='dash-fill'></span>
                                        </div>

                                        <div>{"\u00a0\u00a0\u00a0\u00a0\u00a0return ("}</div>
                                        <div className='code-with-effect'>
                                                <span>{"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0 <>\u00a0<!"}</span>
                                                <span className='dash-fill'></span>
                                        </div>

                                        <div>{"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0<PreLoader loaded={loaded} trigger = {startPage}/>"}</div>
                                        <div>{"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0<div className='app-container' onWheel={handleScroll}>"}</div>
                                        <div>{"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0<TransitionCover page={scroll}/>"}</div>
                                        <div>{"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0<Loader/>"}</div>
                                        <div>{"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0<TopRow/>"}</div>
                                        <div>{"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0<Home/>"}</div>
                                        <div>{"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0<Page1Blender/>"}</div>
                                        <div>{"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0</div>"}</div>
                                        <div>{"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0</>"}</div>
                                        <div>{"\u00a0\u00a0\u00a0\u00a0\u00a0)"}</div>
                                        <div>{"}"}</div>
                                </div>
                        </div>
                        <div className='terminal-section-container'>
                                <div className='terminal-buttons'></div>
                        </div>
                </div>
                <div className='subtitle-container' ref={subtitleRef}>
                        <div className='subtitle-comment'>//</div>
                        <div className='subtitle-text'>Code Meets Concept</div>
                </div>
                <div className='william' ref={williamRef}>William</div>
                <div className='cheng' ref={chengRef}>Cheng</div>
        </div>
        );
}

export default Hero;