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

export function startLoop(ctx: CanvasRenderingContext2D) {
  let x = 0 // lives out here, not inside frame(), so it survives between calls

  function frame() {
    ctx.clearRect(0, 0, SIZE, SIZE) // erase the previous frame
    x += 2 // move x forward a little
    if (x > SIZE) x = 0 // wrap it back to 0 if it has gone past SIZE

    ctx.fillStyle = 'blue'
    ctx.fillRect(x, 0, SHAPE_SIZE, SHAPE_SIZE) // draw one square

    requestAnimationFrame(frame)
  }

  frame()
}
