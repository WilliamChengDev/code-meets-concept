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
                        <div className='numbered-lines-container'></div>
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