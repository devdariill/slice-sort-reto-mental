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

  const [correctColor, setCorrectColor] = useState<null|Color>(null)
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
    const [color, wrongColor] = COLORS.slice().sort(()=>Math.random() - 0.5)
    setCorrectColor(color)
    setWrongColor(wrongColor)
    // setColor(COLORS[Math.floor(Math.random() * COLORS.length)])
  }

  const handlerColorClick = (clickColor:Color) => {
    if (clickColor === correctColor) {
      setScore(score => score + 1)
    }
    const [color, wrongColor] = COLORS.slice().sort(()=>Math.random() - 0.5)
    setCorrectColor(color)
    setWrongColor(wrongColor)
  }

  return (
    <main className='h-screen flex flex-col w-screen'>
      <header className='flex gap-x-3 text-xs  w-full justify-center'>
        <h1>{score} puntos</h1>
        <h1>{time} segundos</h1>
      </header>
      { status === 'playing' &&
        <section className='w-full h-full items-center justify-center flex bg-black'>
          <span className='capitalize text-5xl font-semibold ' style={{color:wrongColor?.color}}>{correctColor!.name}</span>
        </section>
      } 
      <footer className={`w-full flex ${status ==='initial' ? 'justify-center items-center  h-full' : 'items-end justify-center' }`}>
        <button onClick={()=>status === 'initial' ? handlePlay() : setStatus('initial')}>{status === 'initial' ?'Play':'Reset'}</button> 
        {status === 'playing' && correctColor && wrongColor &&
          <>
            <button style={{backgroundColor:correctColor.color}} className='h-28 w-28' onClick={()=>handlerColorClick(correctColor)}/>
            <button style={{backgroundColor:wrongColor.color}} className='h-28 w-28' onClick={()=>handlerColorClick(wrongColor)}/>
          </>
        }
      </footer>
    </main>
  )
}

export default App
