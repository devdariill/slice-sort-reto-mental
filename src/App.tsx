import { useEffect, useMemo, useState } from 'react'

const COLORS:Color[] =[
  {
    name: 'red',
    color: '#ff0000',
    correct: false
  },
  {
    name: 'blue',
    color: '#0000ff',
    correct: false
  },
  {
    name: 'green',
    color: '#00ff00',
    correct: false
  },
  {
    name: 'yellow',
    color: '#ffff00',
    correct: false
  }
]
type Color = {
  name: string
  color: string
  correct: boolean
}

function App() {
  const [status, setStatus] = useState<'initial'|'playing'|'finished'>('initial')
  const [time, setTime] = useState<number>(0)
  const [score, setScore] = useState<number>(0)

  // const [wrongColor, setWrongColor] = useState<null|Color>(null)
  // const [correctColor, setCorrectColor] = useState<null|Color>(null)
  
  const [gameColors, setGameColors] = useState<(Color &{correct:boolean})[]>([])
  const correctColor = useMemo<Color>(()=>gameColors.find(color => color.correct)!,[gameColors])
  
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
    const [correctColor, wrongColor] = COLORS.slice().sort(()=>Math.random() - 0.5)
    setGameColors([
      {...correctColor,correct:true},
      wrongColor
    ].sort(()=>Math.random() - 0.5))

    // setCorrectColor(correctColor)
    // setWrongColor(wrongColor)
    // setColor(COLORS[Math.floor(Math.random() * COLORS.length)])
  }

  const handlerColorClick = (clickColor:Color) => {
    if (clickColor.correct) setScore(score => score + 1)

    if (score === 10) {
      setStatus('finished')
      return
    }
    
    const [color, wrongColor] = COLORS.slice().sort(()=>Math.random() - 0.5)
    setGameColors([{...color,correct:true},{...wrongColor,correct:false}].sort(()=>Math.random() - 0.5))
  }

  return (
    <main className='h-screen flex flex-col w-screen'>
      <header className='flex gap-x-3 w-full justify-center'>
        <h2>{score} puntos</h2>
        <h2>{time} segundos</h2>
      </header>
      { status === 'playing' &&
        <section className='w-full h-full items-center justify-center flex'>
          <span className='capitalize text-5xl font-semibold ' style={{color:gameColors[1].color}}>{correctColor.name}</span>
        </section>
      } 
      <footer className={`w-full flex ${status ==='initial' ? 'justify-center items-center  h-full' : 'items-end justify-center' }`}>
        <button onClick={()=>status === 'initial' ? handlePlay() : setStatus('initial')}>{status === 'initial' ?'Play':'Reset'}</button> 
        {status === 'playing' &&
          <>
            <button style={{backgroundColor:gameColors[0].color}} className='h-28 w-28' onClick={()=>handlerColorClick(gameColors[0])}/>
            <button style={{backgroundColor:gameColors[1].color}} className='h-28 w-28' onClick={()=>handlerColorClick(gameColors[1])}/>
          </>
        }
      </footer>
    </main>
  )
}

export default App
