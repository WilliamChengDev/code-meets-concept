import './App.css'
import Hero from './components/Hero'
import Projects from './components/Projects'

function App() {
  return (
    <div className='app-container'>
        <section id='hero'><Hero /></section>
        <section id='projects'><Projects /></section>
    </div>
  )
}

export default App
