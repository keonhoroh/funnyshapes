import { useEffect, useRef } from 'react'

const SIZE = 400 // the size we want the canvas to actually appear on screen, in CSS pixels
const SHAPE_SIZE = 40 // the size of one square
const GRID_SIZE = 5 // how many cells per row and per column
const CELL = SIZE / GRID_SIZE // the size of one grid cell

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

    ctx.fillStyle = 'blue'

    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        // TODO(you): compute x and y for this cell — same centering formula as
        // Task 1.6, (CELL - SHAPE_SIZE) / 2, plus this cell's own offset:
        // col * CELL for x, row * CELL for y
        const x = (CELL - SHAPE_SIZE) / 2 + col * CELL
        const y = (CELL - SHAPE_SIZE) / 2 + row * CELL

        ctx.fillRect(x, y, SHAPE_SIZE, SHAPE_SIZE)
      }
    }
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
