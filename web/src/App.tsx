import { useEffect, useRef, useState } from 'react'
import { SIZE, startLoop } from '../../shared/animation'

function getInitialParams() {
  const amplitude = new URLSearchParams(window.location.search).get('amplitude') || 15
  const gridSize = new URLSearchParams(window.location.search).get('gridSize') || 5
  const waveFrequency = new URLSearchParams(window.location.search).get('waveFrequency') || 1
  const phaseSpeed = new URLSearchParams(window.location.search).get('phaseSpeed') || 0.5
  const shapeSize = new URLSearchParams(window.location.search).get('shapeSize') || 40
  const paletteIndex = new URLSearchParams(window.location.search).get('paletteIndex') || 0

  return {
    amplitude: Number(amplitude),
    gridSize: Number(gridSize),
    waveFrequency: Number(waveFrequency),
    phaseSpeed: Number(phaseSpeed),
    shapeSize: Number(shapeSize),
    paletteIndex: Number(paletteIndex),
  }
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [params, setParams] = useState(getInitialParams)
  const paramsRef = useRef(params)

  useEffect(() => {
    const searchParams = new URLSearchParams()
    searchParams.set('amplitude', String(params.amplitude))
    searchParams.set('gridSize', String(params.gridSize))
    searchParams.set('waveFrequency', String(params.waveFrequency))
    searchParams.set('phaseSpeed', String(params.phaseSpeed))
    searchParams.set('shapeSize', String(params.shapeSize))
    searchParams.set('paletteIndex', String(params.paletteIndex))

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`
    window.history.replaceState(null, '', newUrl)
  }, [params])

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
      <h1>waves.</h1>
      <p>high-res wave effect generator</p>
      <div className="studio">
      <canvas ref={canvasRef} />
      <div className="controls">
      <div className="control">
        <label htmlFor="amplitude">Amplitude</label>
        <input
          id="amplitude"
          type="range"
          min={0}
          max={40}
          value={params.amplitude}
          onChange={(event) => {
            setParams({ ...params, amplitude: Number(event.target.value)})
          }}
        />
      </div>
      <div className="control">
        <label htmlFor="gridSize">Grid Size</label>
        <input
          id="gridSize"
          type="range"
          min={1}
          max={15}
          value={params.gridSize}
          onChange={(event) => {
            setParams({ ...params, gridSize: Number(event.target.value)})
          }}
        />
      </div>
      <div className="control">
        <label htmlFor="waveFrequency">Wave Frequency</label>
        <input
          id="waveFrequency"
          type="range"
          min={1}
          max={3}
          value={params.waveFrequency}
          onChange={(event) => {
            setParams({ ...params, waveFrequency: Number(event.target.value)})
          }}
        />
      </div>
      <div className="control">
        <label htmlFor="phaseSpeed">Phase Speed</label>
        <input
          id="phaseSpeed"
          type="range"
          min={0.5}
          max={1.5}
          step={0.1}
          value={params.phaseSpeed}
          onChange={(event) => {
            setParams({ ...params, phaseSpeed: Number(event.target.value)})
          }}
        />
      </div>
      <div className="control">
        <label htmlFor="shapeSize">Shape Size</label>
        <input
          id="shapeSize"
          type="range"
          min={20}
          max={50}
          value={params.shapeSize}
          onChange={(event) => {
            setParams({ ...params, shapeSize: Number(event.target.value)})
          }}
        />
      </div>
      <div className="control">
        <label htmlFor="paletteIndex">Palette Index</label>
        <select
          id="paletteIndex"
          value={params.paletteIndex}
          onChange={(event) => {
            setParams({ ...params, paletteIndex: Number(event.target.value)})
          }}
        >
          <option value={0}>Teal / Coral</option>
          <option value={1}>Noir / Chartreuse</option>
          <option value={2}>Cream / Indigo</option>
          <option value={3}>Magenta / Gold</option>
          <option value={4}>Forest / Peach</option>
        </select>
      </div>
      </div>
      </div>
    </main>
  )
}

export default App
