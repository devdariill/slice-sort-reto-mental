import { useState } from 'react'

function App() {
  const [status, setStatus] = useState<'initial'|'playing'|'finished'>('initial')
  const [time, setTime] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  
  return (
    <main className='h-screen flex flex-col w-screen'>
      <header className='flex gap-x-3 text-xs  w-full justify-center'>
        <h1>{0} puntos</h1>
        <h1>{0} segundos</h1>
      </header>
      { status === 'playing' &&
        <section>
          <span>Blanco</span>
        </section>
      } 
      <footer className='w-full h-full flex justify-center items-center'>
        <button onClick={()=>status === 'initial' ? setStatus('playing') : setStatus('initial')}>{status === 'initial' ?'Play':'Reset'}</button> 
      </footer>
    </main>
  )
}

export default App
