import { useEffect, useRef } from 'react'

const SIZE = 400 // the size we want the canvas to actually appear on screen, in CSS pixels
const SHAPE_SIZE = 40 // the size of the one square we're placing

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    // TODO(you): compute x and y so the square sits centered — (SIZE - SHAPE_SIZE) / 2
    const x = (SIZE - SHAPE_SIZE) / 2
    const y = (SIZE - SHAPE_SIZE) / 2

    ctx.fillStyle = 'blue'
    ctx.fillRect(x, y, SHAPE_SIZE, SHAPE_SIZE)
  }, [])

  return (
    <main>
      <h1>cool patterns</h1>
      <p>high-res wave effect generator</p>
      <canvas ref={canvasRef} />
    </main>
  )
}

export default App
