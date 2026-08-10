import { useEffect, useRef } from 'react'
import { SIZE, drawGrid } from '../../shared/animation'

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

    drawGrid(ctx)
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
