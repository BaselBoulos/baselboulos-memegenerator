'use strict'

var gElCanvas
var gCtx
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onInitEditor() {
  gElCanvas = document.querySelector('.meme-canvas')
  gCtx = gElCanvas.getContext('2d')
  addListeners()
}

function onMemeSelect(memeIdx) {
  document.querySelector('.editor-panel').classList.remove('hidden')
  document.querySelector('.gallery-container').classList.add('hidden')
  createMeme(memeIdx)
  drawMeme()
}

function drawMeme() {
  var memeImg = new Image()
  memeImg.onload = () => {
    gCtx.drawImage(memeImg, 0, 0, gElCanvas.width, gElCanvas.height)
    let lines = getMemeLines()
    lines.map((line) => drawText(line))
  }
  memeImg.src = getImgUrl()
}

function drawText(line) {
  var { txt, size, align, color, strokeColor, direction, fontType, pos } = line
  gCtx.lineWidth = 2
  gCtx.strokeStyle = strokeColor
  gCtx.fillStyle = color
  gCtx.font = `${size}px ${fontType}`
  gCtx.textAlign = align
  gCtx.textBaseline = direction
  gCtx.fillText(txt, pos.x, pos.y, gElCanvas.width)
  gCtx.strokeText(txt, pos.x, pos.y, gElCanvas.width)
  drawAroundTxt()
}

function drawAroundTxt() {
  var { txt, pos, size } = getCurrLine()
  setLineWidth(gCtx.measureText(txt).width)
  var LineWidth = getLineWidth()
  gCtx.strokeStyle = 'white'
  gCtx.strokeRect(pos.x - LineWidth, pos.y - size, LineWidth * 2, size * 2)
}

function onAddLine() {
  var txt = document.querySelector('.line-input').value
  if (!txt) return
  addLine(txt)
  onSwitchLine()
  drawMeme()
}

function onFontSizeChange(diff) {
  setFontSize(diff)
  drawMeme()
}

function onMoveLine(diff) {
  setLinePos(gElCanvas.height, +diff)
  drawMeme()
}

function onSwitchLine() {
  setLineIdx()
  drawMeme()
  document.querySelector('.line-input').value = getLineTxt()
}

function onChangeAlign(align) {
  setAlign(align)
  drawMeme()
}

function onChangeFontColor(color) {
  setTxtColor(color)
  drawMeme()
}

function onChangeStroke(color) {
  setTxtStroke(color)
  drawMeme()
}

function onChangeFont(fontType) {
  setFontType(fontType)
  drawMeme()
}

function onDownload(elLink) {
  let imgContent = gElCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
}

function onShareMeme() {
  uploadImg()
}

function onDeleteLine() {
  deleteLine()
  drawMeme()
}

function addListeners() {
  addMouseListeners()
  addTouchListeners()
}

function addMouseListeners() {
  // gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mousedown', onDown)
  // gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  // gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchstart', onDown)
  // gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  const pos = getEvPos(ev)
  if (!isLineClicked(pos)) return
  setCircleDrag(true)
  gStartPos = pos
  document.body.style.cursor = 'grabbing'
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}
