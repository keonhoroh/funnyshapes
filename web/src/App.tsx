import { useEffect, useRef, useState } from 'react'
import { SIZE, startLoop } from '../../shared/animation'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [amplitude, setAmplitude] = useState(15)
  const amplitudeRef = useRef(amplitude)

  useEffect(() => {
    amplitudeRef.current = amplitude
  }, [amplitude])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio

    canvas.width = SIZE * dpr
    canvas.height = SIZE * dpr
    canvas.style.width = `${SIZE}px`
    canvas.style.height = `${SIZE}px`
    ctx.scale(dpr, dpr)

    startLoop(ctx, amplitudeRef)
  }, [])

  return (
    <main>
      <h1>cool patterns</h1>
      <p>high-res wave effect generator</p>
      <canvas ref={canvasRef} />
      <input
        type="range"
        min={0}
        max={40}
        value={amplitude}
        onChange={(event) => {
          setAmplitude(Number(event.target.value))
        }}
      />
    </main>
  )
}

export default App
