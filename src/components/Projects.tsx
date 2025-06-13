import { useEffect, useState } from 'react';
import './Projects.css'
import ProjectPanel from './ProjectPanel';

function Projects(){

        //state for the 'now' date
        const [now, setNow] = useState<Date>(new Date());


        useEffect(() => {

                //update per second
                const id = window.setInterval(() => {
                        setNow(new Date());
                }, 1000);

                //Clean up on unmount
                return () => {
                        clearInterval(id);
                };
        },[])

        return(
                <div className='projects-container'>
                        <div className='windows-container'>
                                <ProjectPanel/>
                        </div>
                        <div className='bottom-row-container'>
                                <div className='clock'>{now.toLocaleTimeString()}</div>
                                <div className='project-tracker'></div>
                                <div className='about-me-button'></div>
                        </div>
                </div>
        );
}

export default Projects;