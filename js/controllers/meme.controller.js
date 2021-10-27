'use strict'

var gElCanvas
var gCtx

function onInitMemes() {
  gElCanvas = document.querySelector('.meme-canvas')
  gCtx = gElCanvas.getContext('2d')
}

function drawMeme(memeIdx) {
  var memeImg = new Image()
  memeImg.onload = () => {
    gCtx.drawImage(memeImg, 0, 0, gElCanvas.width, gElCanvas.height)
    drawText()
  }
  memeImg.src = getImgUrl(memeIdx)
}

function drawText() {
  const linePos = getLinePos()
  const txt = getMemeTxt()
  const fontSize = getFontSize()
  gCtx.font = `${fontSize}px IMPACT`
  gCtx.fillStyle = 'white'
  gCtx.strokeStyle = 'black'
  gCtx.lineWidth = 2
  gCtx.textAlign = 'center'
  switch (linePos) {
    case 'bottom':
      gCtx.textBaseline = 'bottom'
      gCtx.fillText(txt, gElCanvas.width / 2, gElCanvas.height, gElCanvas.width)
      gCtx.strokeText(
        txt,
        gElCanvas.width / 2,
        gElCanvas.height,
        gElCanvas.width
      )
      break
    default:
      gCtx.textBaseline = 'top'
      gCtx.fillText(txt, gElCanvas.width / 2, 0, gElCanvas.width)
      gCtx.strokeText(txt, gElCanvas.width / 2, 0, gElCanvas.width)
  }
}

function onAddLine() {
  var newTxt = document.querySelector('.line-input').value
  setMemeTxt(newTxt)
  drawMeme(getCurrMemeIdx())
}

function onMemeSelect(memeIdx) {
  createMeme(memeIdx)
  drawMeme(memeIdx)
}

function OnFontChange(diff) {
  setFontSize(diff)
  drawMeme(getCurrMemeIdx())
}

function onMoveLine(direction) {
  setLinePos(direction)
  drawMeme(getCurrMemeIdx())
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}
