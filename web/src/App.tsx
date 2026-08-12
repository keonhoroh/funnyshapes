import { useEffect, useRef, useState } from 'react'
import { SIZE, startLoop } from '../../shared/animation'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [params, setParams] = useState({
    amplitude: 15,
    gridSize: 5,
    waveFrequency: 1,
    phaseSpeed: 0.5,
    shapeSize: 40,
    paletteIndex: 0,
  })
  const paramsRef = useRef(params)

  useEffect(() => {
    paramsRef.current = params
  }, [params])

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

    startLoop(ctx, paramsRef)
  }, [])

  return (
    <main>
      <h1>cool wave</h1>
      <p>high-res wave effect generator</p>
      <canvas ref={canvasRef} />
      <input
        type="range"
        min={0}
        max={40}
        value={params.amplitude}
        onChange={(event) => {
          setParams({ ...params, amplitude: Number(event.target.value)})
        }}
      />
      <input
        type="range"
        min={1}
        max={15}
        value={params.gridSize}
        onChange={(event) => {
          setParams({ ...params, gridSize: Number(event.target.value)})
        }}
      />
      <input
        type="range"
        min={1}
        max={3}
        value={params.waveFrequency}
        onChange={(event) => {
          setParams({ ...params, waveFrequency: Number(event.target.value)})
        }}
      />
      <input
        type="range"
        min={0.5}
        max={1.5}
        step={0.1}
        value={params.phaseSpeed}
        onChange={(event) => {
          setParams({ ...params, phaseSpeed: Number(event.target.value)})
        }}
      />
      <input
        type="range"
        min={20}
        max={50}
        value={params.shapeSize}
        onChange={(event) => {
          setParams({ ...params, shapeSize: Number(event.target.value)})
        }}
      />
      <select
        value={params.paletteIndex}
        onChange={(event) => {
          setParams({ ...params, paletteIndex: Number(event.target.value)})
        }}
      >
        <option value={0}>Purple</option>
        <option value={1}>Blue</option>
        <option value={2}>Yellow</option>
        <option value={3}>Green</option>
        <option value={4}>Pink</option>
      </select>
    </main>
  )
}

export default App
