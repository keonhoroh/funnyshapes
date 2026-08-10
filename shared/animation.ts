export const SIZE = 400 // the size we want the canvas to actually appear on screen, in CSS pixels
export const SHAPE_SIZE = 40 // the size of one square
export const GRID_SIZE = 5 // how many cells per row and per column
export const CELL = SIZE / GRID_SIZE // the size of one grid cell

export function drawGrid(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = 'blue'

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const x = (CELL - SHAPE_SIZE) / 2 + col * CELL
      const y = (CELL - SHAPE_SIZE) / 2 + row * CELL

      ctx.fillRect(x, y, SHAPE_SIZE, SHAPE_SIZE)
    }
  }
}

const CENTER = (SIZE - SHAPE_SIZE) / 2 // the x the square oscillates around
const AMPLITUDE = 150 // how far it swings left and right of CENTER

export function startLoop(ctx: CanvasRenderingContext2D) {
  let angle = 0 // lives out here, not inside frame(), so it survives between calls

  function frame() {
    ctx.clearRect(0, 0, SIZE, SIZE) // erase the previous frame

    const x = CENTER + AMPLITUDE * Math.sin(angle) // calculate the new x position
    angle += 0.05 // increment the angle for the next frame

    ctx.fillStyle = 'blue'
    ctx.fillRect(x, 0, SHAPE_SIZE, SHAPE_SIZE) // draw one square

    requestAnimationFrame(frame)
  }

  frame()
}
