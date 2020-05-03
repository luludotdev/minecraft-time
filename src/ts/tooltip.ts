const elements = document.querySelectorAll('[data-tooltip]')
const tooltip = document.getElementById('tooltip')

const coords = {
  x: 0,
  y: 0,
}

const onMouseEnter = (ev: MouseEvent) => {
  if (tooltip === null) return
  tooltip.classList.remove('hidden')

  // @ts-ignore
  const text: string = ev.target?.dataset.tooltip
  tooltip.innerHTML = text
}

const onMouseOver = (ev: MouseEvent) => {
  coords.x = ev.x
  coords.y = ev.y
}

const onMouseLeave = (ev: MouseEvent) => {
  if (tooltip === null) return
  tooltip.classList.add('hidden')
}

for (const element of elements) {
  const e = element as HTMLElement

  e.addEventListener('mouseover', onMouseEnter)
  e.addEventListener('mousemove', onMouseOver)
  e.addEventListener('mouseout', onMouseLeave)
}

const render = () => {
  if (tooltip === null) return

  tooltip.style.top = coords.y.toString()
  tooltip.style.left = coords.x.toString()

  requestAnimationFrame(render)
}

requestAnimationFrame(render)
