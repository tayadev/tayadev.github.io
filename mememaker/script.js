const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

reset()

var f = new FontFace('Impact', 'url(/impact.ttf)');

function showEditScreen() {
  document.querySelector('section#fileSelectSection').hidden = true
  document.querySelector('section#editSection').hidden = false
}

function showFileSelectScreen() {
  document.querySelector('section#fileSelectSection').hidden = false
  document.querySelector('section#editSection').hidden = true
}

f.load().then(function(font) {
  document.fonts.add(font)
  file.removeAttribute('disabled')
})

let image = undefined

file.addEventListener('change', function() {  
  const reader = new FileReader()
  reader.onload = e => {
    const img = new Image()
    img.onload = e => {
      image = e.target
      drawImage()
    }
    img.src = e.target.result
    showEditScreen()
  }
  reader.readAsDataURL(this.files[0])
})

let topText = 'Top Text'
topInput.oninput = e => {
  topText = e.target.value
  drawImage()
}

let bottomText = 'Bottom Text'
bottomInput.oninput = e => {
  bottomText = e.target.value
  drawImage()
}


function drawImage() {
  if(!image) return
  const width = canvas.width = image.width
  const height = canvas.height = image.height
  ctx.drawImage(image, 0, 0)
  drawText(topText, 'top')
  drawText(bottomText, 'bottom')
  dlButton.removeAttribute('disabled')
}

function drawText(t, align) {
  const fontSize = canvas.height/10

  const lineList = t.split('\n')

  const lines = lineList.length

  const x = canvas.width/2
  const yTop = align == 'top' ? fontSize
    : align == 'bottom' ? canvas.height - fontSize/4 - (lines-1)*fontSize : undefined

  for(const line in lineList) {
    text(lineList[line], x, yTop+line*fontSize, canvas.width, fontSize)
  }
}

function text(text, x, y, maxWidth, fontSize) {
  ctx.font = fontSize + 'px Impact'
  ctx.textAlign = 'center';
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'black'
  ctx.fillText(text, x, y, maxWidth)
  ctx.strokeText(text, x, y, maxWidth)
}

function download() {
  const link = document.createElement('a')
  link.download = 'meme.png'
  link.href = canvas.toDataURL()
  link.click()
}

function reset() {
  canvas.width = canvas.height = 1
  ctx.fillStyle = 'gray'
  ctx.fillRect(0, 0, 1, 1)
  topInput.value = ''
  bottomInput.value = ''
  showFileSelectScreen()
}