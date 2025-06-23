import { forwardRef } from 'react';
import './ProjectPanel.css'

const ProjectPanel = forwardRef<unknown, {id: string, title: string, paragraph: string, description: string }>((props, ref) => {

        const lines = props.paragraph.split(/\r?\n/)

        return(
                <div className='project-panel-container' id={props.id}>
                        <div className='project-topbar-container'> {/* same object as topbar in Hero.tsx */}
                                <div className='project-topbar-tab'>
                                        <div className='project-topbar-tab-title'>
                                                <h1>{props.title}</h1>
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
                                <div className='project-editor-container'>
                                        {lines.map((line, index) => (
                                                <div key={index} className='project-editor-line'>
                                                        {line}
                                                </div>
                                        ))}
                                </div>
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
                                        <div className='project-terminal-topbar-text'>Ports</div>
                                </div>
                                <div className='project-terminal-text-container'>
                                        <div className='project-terminal-text'>
                                                <div className='project-circle'></div>
                                                <h1>{"PS C:\\>"}</h1>
                                                <div className='project-description'>{props.description}</div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
})

export default ProjectPanel