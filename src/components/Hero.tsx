import './Hero.css';

function Hero() {
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
                                        <span className="dash-fill"></span>
                                </div>

                                <div>{"import './index.css'"}</div>
                                <div>{"\u00a0"}</div>
                                <div>{"ReactDOM.createRoot(document.getElementById('root')!).render("}</div>
                                <div>{"\u00a0\u00a0\u00a0\u00a0\u00a0<React.StrictMode>"}</div> {/* Use nbsp as space since whitespace: nowrap */}
                                <div>{"\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0<App/>"}</div>
                                <div>{"\u00a0\u00a0\u00a0\u00a0\u00a0</React.StrictMode>"}</div>
                                <div>{")"}</div>

                                <div className="code-with-effect">
                                        <span className="dash-fill"></span>
                                </div>

                                <div>{"export default function App() {"}</div>
                                <div className="code-with-effect">
                                        <span className="dash-fill"></span>
                                </div>
                                <div className="code-with-effect">
                                        <span className='plus-seg'></span>
                                </div>


                        </div>
                </div>
                <div className='terminal-section-container'>
                        <div className='terminal-buttons'></div>
                </div>
        </div>
        <div className="hero-content"></div>
    </div>
  );
}

export default Hero;