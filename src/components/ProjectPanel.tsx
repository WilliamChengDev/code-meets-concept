import './ProjectPanel.css'

function ProjectPanel(){

        return(
                <div className='project-panel-container'>
                        <div className='project-topbar-container'> {/* same object as topbar in Hero.tsx */}
                                <div className='project-topbar-tab'>
                                        <div className='project-topbar-tab-title'>
                                                <h1>LSTM.ipynb</h1>
                                        </div>
                                        <div className='project-topbar-tab-highlight'></div>
                                </div>
                                <div className='project-topbar-icons'>
                                </div>
                        </div>
                        <div className='project-code-section-container'> {/* referenced from code-section-container in Hero.tsx */}
                                <div className='project-numbered-lines-container'>
                                        {Array.from({ length: 60 }, (_, i) => (
                                                i < 9 ? <div key={"num" + i}>{"0" + (i + 1)}</div> : <div key={"num" + i}>{i + 1}</div>
                                        ))}
                                </div>
                                <div className='project-number-editor-bar'></div>
                                <div className='project-editor-container'></div>
                        </div>
                        <div className='project-terminal-section-container'>
                                <div className='terminal-topbar'>
                                        <div className='project-terminal-topbar-text'>Problems</div>
                                        <div className='project-terminal-topbar-text'>Output</div>
                                        <div className='project-terminal-topbar-text'>Debug Console</div>
                                        <div className='terminal-button-container'>
                                                <div className='project-terminal-button-text'>Terminal</div>
                                                <div className='terminal-button-bar'></div>
                                        </div>
                                        <div className='terminal-topbar-text'>Ports</div>
                                </div>
                                <div className='terminal-text-container'>
                                        <div className='terminal-text-left'>
                                                <div className='circle'></div>
                                                <h1>description</h1>
                                        </div>
                                </div>
                        </div>
                </div>
        );
}

export default ProjectPanel