

const arr = [
  { value: 25},
  { value: 60},
  { value: 45},
  { value: 50},
  { value: 40}
]

const getE = ({ left, bottom, hypotenuse, angle, value }) => {
  return `
  <li style="--y: ${bottom}px; --x: ${left}px;">
    <div class="line-segment" style="--hypotenuse: ${hypotenuse}; --angle: ${angle}"></div>
    <div class="data-point" data-value="${value}"></div>
  </li>
  `
}

const [width,height] = [200,200]
const max = Math.max(...arr.map(i => i.value))
const len = arr.length
const xOffset = width / len
let html = ''

arr.forEach((item,i) => {

  const getNext = (nItem,item) => {
    let x = 0
    if(nItem){
      x = nItem.value
    }else{
      return 0
    }
    return item - ((x / max) * height )
  }

  const obj = {
    left: 0,
    bottom: 0,
    hypotenuse: 0,
    angle: 0,
    value: item.value
  }

  obj.left = xOffset * (i+1)
  obj.bottom = (item.value / max ) * height
  const yOffset = getNext(arr[i+1],obj.bottom)

  if(yOffset === 0){
    obj.hypotenuse = 0
    obj.angle = 0
  }else{
    obj.hypotenuse = Math.sqrt(xOffset * xOffset + yOffset * yOffset)
    obj.angle = Math.asin(yOffset / obj.hypotenuse) * (180/Math.PI)
  }

  html += getE(obj)
})

document.querySelector('.line-chart').innerHTML = html
