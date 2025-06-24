import { forwardRef, useImperativeHandle, useState, useEffect, useRef } from 'react';
import './Projects.css'
import ProjectPanel from './ProjectPanel';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrambleTextPlugin, TextPlugin);

//strongly type getTimeline return type
export interface ProjectHandles {
        getTimeline: () => gsap.core.Timeline;
}

const Projects = forwardRef<ProjectHandles, {}>((props, ref) => {

        const transitionTl = useRef(gsap.timeline({paused: false}));

        //state for the 'now' date
        const [now, setNow] = useState<Date>(new Date());
        const [projectData, setProjectData] = useState([
                [
                "1",
                "LSTM.ipynb", 
                "import torch\ndef train_model(epochs, model, train_loader, device, optimizer, loss_fn, val_loader):\n# The following code is similar to what we implement in Project Assignment 1\nfor epoch in range(1, epochs + 1):\n\u00a0\u00a0\u00a0\u00a0\u00a0model.train()\n\u00a0\u00a0\u00a0\u00a0\u00a0total_loss = 0.0\n\u00a0\u00a0\u00a0\u00a0\u00a0count = 0\n\u00a0\u00a0\u00a0\u00a0\u00a0running_loss = 0.0\n\u00a0\u00a0\u00a0\u00a0\u00a0for batch in train_loader:\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0batch_X, batch_y = batch\n\u00a0\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0batch_X = batch_X.to(device)\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0batch_y = batch_y.to(device)\n\u00a0\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0optimizer.zero_grad()\n\u00a0\u00a0\u00a0\u00a0\u00a0output = model.forward(batch_X).squeeze(1)\n\u00a0\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0loss = loss_fn(output, batch_y)\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0loss.backward()\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0optimizer.step()",
                "A sentiment classifier for movie reviews using the IMDB dataset, with custom data preprocessing and a long short-term memory (LSTM) -based classifier."
                ],
                [
                        "2",
                        "simulator.py",
                        "class Simulator:\n\"\"\"\nThe main simulator class.\n\"\"\"\n\u00a0\ndef __init__(self, transmission_delay=10, propagation_delay=1):\n\u00a0\u00a0\u00a0\u00a0\u00a0self.event_queue: List[Event] = []\n\u00a0\u00a0\u00a0\u00a0\u00a0self.transmission_delay: int = transmission_delay\n\u00a0\u00a0\u00a0\u00a0\u00a0self.propagation_delay: int = propagation_delay\n\u00a0\u00a0\u00a0\u00a0\u00a0self.clock = 0\n\u00a0\u00a0\u00a0\u00a0\u00a0self.nodes = {}\n\u00a0\u00a0\u00a0\u00a0\u00a0self.link_data = pd.DataFrame({'Seq num.': [], 'Queue @A': [], 'Transmit @A': [], 'Propagate @A': [], 'Receive @B': [], 'E2E delay': []})\n\u00a0\u00a0\u00a0\u00a0\u00a0self.switch_data = pd.DataFrame({'Seq num.': [], 'Source': [], 'Queue @src':[], 'Transmit @src': [], 'Receive @C': [], 'Transmit @C': [], 'Receive @D': [], 'E2E delay': [], 'Queueing delay': []})\n\u00a0\ndef schedule_event_after(self, event: Event, delay: int):]\n\u00a0\u00a0\u00a0\u00a0\u00a0\"\"\"\n\u00a0\u00a0\u00a0\u00a0\u00a0Schedules an event to be executed in the future\n\u00a0\n\u00a0\u00a0\u00a0\u00a0\u00a0:param event:\n\u00a0\u00a0\u00a0\u00a0\u00a0:param delay: - the delay after which the event will be executed\n\u00a0\u00a0\u00a0\u00a0\u00a0:return:\n\u00a0\u00a0\u00a0\u00a0\u00a0\"\"\"\n\u00a0\u00a0\u00a0\u00a0\u00a0event.time = self.clock + delay\n\u00a0\u00a0\u00a0\u00a0\u00a0heapq.heappush(self.event_queue, (event.time, event.cnt, event))",
                        "A discrete event simulator to compute the queuing times of packets between switches."
                ]
        ])

        //pass transitionTimeline to parent
        useImperativeHandle(ref, () => ({
                getTimeline: () => transitionTl.current //typed by `export interface HeroHandles`
        }));

        //animations
        useGSAP(() => {
                transitionTl.current
                        .from(".bottom-row-container", { opacity: 0, duration: 2, ease: "power2.inOut" })
                        .from(".project-panel-container", { scale:0.2, translateY: 200, opacity: 0, translateX: 100, duration: 0.5, stagger:0.1, ease: "power2.inOut" })
        })

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
                                {projectData.map(project => (
                                        <ProjectPanel key= {"project-panel" + project[0]} id={"project-panel" + project[0]} title={project[1]} paragraph={project[2]} description={project[3]} />
                                ))}
                        </div>
                        <div className='bottom-row-container'>
                                <div className='clock'>{now.toLocaleTimeString()}</div>
                                <div className='project-tracker'>
                                        <div className='left-bracket'>{"//"}</div>
                                        {projectData.map((_, index) => (
                                                <div key={"project-tracker" + index} className='project-name'>{"*"}</div>
                                        ))}
                                        <div className='right-bracket'>{"//"}</div>
                                </div>
                                <div className='about-me-button'></div>
                        </div>
                </div>
        );
})

export default Projects;