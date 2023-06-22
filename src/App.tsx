import { useEffect, useState } from 'react'

const COLORS:Color[] =[
  {
    name: 'red',
    color: '#ff0000'
  },
  {
    name: 'blue',
    color: '#0000ff'    
  },
  {
    name: 'green',
    color: '#00ff00'
  },
  {
    name: 'yellow',
    color: '#ffff00'
  }
]
type Color = {
  name: string
  color: string
}

function App() {
  const [status, setStatus] = useState<'initial'|'playing'|'finished'>('initial')
  const [time, setTime] = useState<number>(0)
  const [score, setScore] = useState<number>(0)

  const [color, setColor] = useState<null|Color>(null)
  const [wrongColor, setWrongColor] = useState<null|Color>(null)
  
  useEffect(()=>{
    let interval: number // NodeJS.Timeout
    if (status === 'playing') {
      interval = setInterval(() => {
        setTime(time => time + 1)
      }, 1000);
    }
    return () => clearInterval(interval)
  },[status])

  const handlePlay = () => {
    setStatus('playing')
    setTime(0)
    setScore(0)
    // setColor(COLORS[Math.floor(Math.random() * COLORS.length)])
  }

  return (
    <main className='h-screen flex flex-col w-screen'>
      <header className='flex gap-x-3 text-xs  w-full justify-center'>
        <h1>{0} puntos</h1>
        <h1>{time} segundos</h1>
      </header>
      { status === 'playing' &&
        <section className='w-full justify-center flex mt-5'>
          <span className='capitalize'>{color!.name}</span>
        </section>
      } 
      <footer className={`w-full h-full flex ${status ==='initial' ? 'justify-center items-center' : 'items-end justify-center' }`}>
        <button onClick={()=>status === 'initial' ? handlePlay() : setStatus('initial')}>{status === 'initial' ?'Play':'Reset'}</button> 
        {status === 'playing' && color && 
          <button style={{backgroundColor:color.color}} className='text-black h-28 w-28' onClick={()=>setStatus('finished')}/>
        }
      </footer>
    </main>
  )
}

export default App
