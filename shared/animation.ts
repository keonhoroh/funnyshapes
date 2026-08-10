export const SIZE = 400 // the size we want the canvas to actually appear on screen, in CSS pixels
export const SHAPE_SIZE = 40 // the size of one square
export const GRID_SIZE = 5 // how many cells per row and per column
export const CELL = SIZE / GRID_SIZE // the size of one grid cell

const PHASE_STEP = 0.5 // how much each next row/col shifts the sine input

const LOOP_FRAMES = 120 // how many frames make up one full loop
const CYCLES = 1 // how many full sine cycles happen within one loop

export function startLoop(ctx: CanvasRenderingContext2D, amplitudeRef: { current: number }) {
  let frameIndex = 0 // which frame of the loop we're on, 0 up to LOOP_FRAMES - 1

  function frame() {
    ctx.clearRect(0, 0, SIZE, SIZE) // erase the previous frame
    ctx.fillStyle = 'blue'

    const angle = (frameIndex / LOOP_FRAMES) * CYCLES * 2 * Math.PI
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const x = (CELL - SHAPE_SIZE) / 2 + col * CELL
        const y = (CELL - SHAPE_SIZE) / 2 + row * CELL

        const offset = Math.sin(angle + row * PHASE_STEP + col * PHASE_STEP) * amplitudeRef.current
        ctx.fillRect(x, y + offset, SHAPE_SIZE, SHAPE_SIZE)
      }
    }

    frameIndex = (frameIndex + 1) % LOOP_FRAMES
    requestAnimationFrame(frame)
  }

  frame()
}
