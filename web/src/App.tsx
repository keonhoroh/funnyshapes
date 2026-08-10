import { useEffect, useRef } from 'react'

const SIZE = 400 // the size we want the canvas to actually appear on screen, in CSS pixels

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio

    // TODO(you): set canvas.width and canvas.height to SIZE * dpr (the buffer size)
    canvas.width = SIZE * dpr
    canvas.height = SIZE * dpr

    // TODO(you): set canvas.style.width and canvas.style.height to `${SIZE}px` (the pinned display size)
    canvas.style.width = `${SIZE}px`
    canvas.style.height = `${SIZE}px`

    // TODO(you): call ctx.scale so drawing code can keep using SIZE instead of the buffer size
    ctx.scale(dpr, dpr)

    ctx.fillStyle = 'blue'
    ctx.fillRect(0, 0, SIZE, SIZE)
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
