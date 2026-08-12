export const SIZE = 400 // the size we want the canvas to actually appear on screen, in CSS pixels

const LOOP_FRAMES = 120 // how many frames make up one full loop

type Params = {
  amplitude: number
  gridSize: number
  waveFrequency: number
  phaseSpeed: number
  shapeSize: number
}

export function startLoop(ctx: CanvasRenderingContext2D, paramsRef: { current: Params }) {
  let frameIndex = 0 // which frame of the loop we're on, 0 up to LOOP_FRAMES - 1

  function frame() {
    ctx.clearRect(0, 0, SIZE, SIZE) // erase the previous frame
    ctx.fillStyle = 'blue'

    const angle = (frameIndex / LOOP_FRAMES) * paramsRef.current.waveFrequency * 2 * Math.PI
    const cell = SIZE / paramsRef.current.gridSize
    for (let row = 0; row < paramsRef.current.gridSize; row++) {
      for (let col = 0; col < paramsRef.current.gridSize; col++) {
        const x = (cell - paramsRef.current.shapeSize) / 2 + col * cell
        const y = (cell - paramsRef.current.shapeSize) / 2 + row * cell

        const offset = Math.sin(angle + row * paramsRef.current.phaseSpeed + col * paramsRef.current.phaseSpeed) * paramsRef.current.amplitude
        ctx.fillRect(x, y + offset, paramsRef.current.shapeSize, paramsRef.current.shapeSize)
      }
    }

    frameIndex = (frameIndex + 1) % LOOP_FRAMES
    requestAnimationFrame(frame)
  }

  frame()
}
