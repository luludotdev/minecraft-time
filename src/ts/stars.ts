const canvas = document.getElementById('stars') as HTMLCanvasElement | null
if (canvas === null) throw new Error('Stars element is null!')

const ctx = canvas.getContext('2d')
if (ctx === null) throw new Error('Canvas context is null!')

const sizeCanvas = () => {
  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight
}

const randRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const renderCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const size = 4
  const halfSize = size / 2
  const gradientSize = size * 3.8
  const halfGradSize = gradientSize / 2

  const drawRect = (x: number, y: number) => {
    const cx = x + 0.5 * size
    const cy = y + 0.5 * size
    ctx.translate(cx, cy)

    const rotation = randRange(0, 90)
    ctx.rotate((Math.PI / 180) * rotation)
    ctx.translate(-cx, -cy)

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, gradientSize * 0.5)
    gradient.addColorStop(0, 'rgba(220, 220, 220, 0.8)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

    ctx.fillStyle = gradient
    ctx.fillRect(x - halfGradSize, y - halfGradSize, gradientSize, gradientSize)

    ctx.fillStyle = 'white'
    ctx.fillRect(x - halfSize, y - halfSize, size, size)

    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }

  const offset = 100
  for (let i = 0; i < randRange(50, 100); i++) {
    const x = randRange(-1 * offset, canvas.width + offset)
    const y = randRange(-1 * offset, canvas.height * 0.6 + offset)

    drawRect(x, y)
  }
}

window.addEventListener('resize', () => {
  sizeCanvas()
  renderCanvas()
})

sizeCanvas()
renderCanvas()
