'use strict'

var gElCanvas
var gCtx
var gStartMovePos

function onMemeSelect(memeIdx) {
  gElCanvas = document.querySelector('.meme-canvas')
  gCtx = gElCanvas.getContext('2d')
  document.querySelector('.editor-panel').classList.remove('hidden')
  document.querySelector('.gallery-container').classList.add('hidden')
  createMeme(memeIdx)
  addListeners()
  drawMeme()
}

function drawMeme() {
  var memeImg = new Image()
  memeImg.onload = () => {
    // Aspect ratio
    gElCanvas.height = (memeImg.height * gElCanvas.width) / memeImg.width
    gCtx.drawImage(memeImg, 0, 0, gElCanvas.width, gElCanvas.height)
    drawLines()
  }
  memeImg.src = getCurrMemeImg()
}

function drawLines() {
  let lines = getMemeLines()
  if (!lines.length) return
  lines.map((line) => {
    var { txt, size, align, color, strokeColor, baseLine, fontType, pos } = line
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${fontType}`
    gCtx.textAlign = align
    gCtx.textBaseline = baseLine
    gCtx.fillText(txt, pos.x, pos.y, gElCanvas.width)
    gCtx.strokeText(txt, pos.x, pos.y, gElCanvas.width)
  })
  _drawLineBorder()
}

function _drawLineBorder() {
  var { txt, pos, size, baseLine } = getCurrLine()
  var borderY = pos.y - 20
  if (baseLine === 'top') borderY = pos.y - 5
  if (baseLine === 'bottom') borderY = pos.y - size - 5
  var LineWidth = gCtx.measureText(txt).width
  gCtx.strokeStyle = 'red'
  gCtx.strokeRect(pos.x - LineWidth, borderY, LineWidth * 2, size + 10)
}

function onEditMode(isEdit) {
  var lineTxt = getLineTxt()
  var elTxtInput = document.querySelector('.line-input')
  if (!lineTxt) addLine(elTxtInput.placeholder)
  elTxtInput.value = isEdit === 'on' ? getLineTxt() : ''
  if (elTxtInput.hasAttribute('readonly'))
    elTxtInput.removeAttribute('readonly')
  drawMeme()
}

function onAddLine() {
  var elTxtInput = document.querySelector('.line-input')
  addLine(elTxtInput.placeholder)
  drawMeme()
}

function onEditLineTxt(newTxt) {
  setLineTxt(newTxt)
  drawMeme()
}

function onLineSizeChange(diff) {
  setLineSize(diff)
  drawMeme()
}

function onMoveLine(diff) {
  setLinePos(gElCanvas.height, +diff)
  drawMeme()
}

function onSwitchLineFocus() {
  if (!getLineTxt()) return
  switchLineFocus()
  var elTxtInput = document.querySelector('.line-input')
  elTxtInput.value = getLineTxt()
  drawMeme()
}

function onChangeTxtAlign(align) {
  setTxtAlign(align)
  drawMeme()
}

function onChangeTxtColor(color) {
  setTxtColor(color)
  drawMeme()
}

function onChangeTxtStroke(color) {
  setTxtStroke(color)
  drawMeme()
}

function onChangeFont(fontFamily) {
  setFontFamily(fontFamily)
  drawMeme()
}

function onRemoveLine() {
  removeLine()
  drawMeme()
}

function onDownload(elLink) {
  var imgContent = gElCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
}

function onShare() {
  uploadImg()
}

function addListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('mouseup', onUp)
  gElCanvas.addEventListener('touchend', onUp)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('touchmove', onMove)
}

function onDown(ev) {
  const pos = getEvPos(ev)
  if (!isPosLine(pos)) return
  setLineDrag(true)
  gStartMovePos = pos
  var elMemeCanvas = document.querySelector('.meme-canvas')
  elMemeCanvas.style.cursor = 'grabbing'
  var elTxtInput = document.querySelector('.line-input')
  elTxtInput.value = getLineTxt()
  drawMeme()
}

function onUp() {
  setLineDrag(false)
  var elMemeCanvas = document.querySelector('.meme-canvas')
  elMemeCanvas.style.cursor = 'grab'
}

function onMove(ev) {
  const line = getCurrLine()
  if (!line) return
  if (line.isDrag) {
    const pos = getEvPos(ev)
    const dx = pos.x - gStartMovePos.x
    const dy = pos.y - gStartMovePos.y
    gStartMovePos = pos
    moveLine(dx, dy)
    drawMeme()
  }
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  return pos
}
