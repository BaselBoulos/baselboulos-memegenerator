'use strict'

var gElCanvas
var gCtx
var gStartMovePos

// IsSaving not finished,
var isSaving = false
var isEditMode = false

function onMemeSelect(memeIdx) {
  gElCanvas = document.querySelector('.meme-canvas')
  gCtx = gElCanvas.getContext('2d')
  document.querySelector('.editor-panel').classList.remove('hidden')
  document.querySelector('.gallery-container').classList.add('hidden')
  _createMeme(memeIdx)
  _addListeners()
  _drawMeme()
}

function _drawMeme() {
  var memeImg = new Image()
  memeImg.onload = () => {
    // Aspect ratio
    gElCanvas.height = (memeImg.height * gElCanvas.width) / memeImg.width
    gCtx.drawImage(memeImg, 0, 0, gElCanvas.width, gElCanvas.height)
    _drawLines()
  }
  memeImg.src = getCurrMemeImg()
}

function _drawLines() {
  var lines = getMemeLines()
  if (!lines.length) return
  lines.map((line) => {
    if (!line.isEdit) _drawLine(line)
  })
  if (!isSaving && !isEditMode) _drawLineBorder()
}

function _drawLine(line) {
  var { txt, size, align, color, strokeColor, baseLine, fontType, pos } = line
  gCtx.lineWidth = 2
  gCtx.strokeStyle = strokeColor
  gCtx.fillStyle = color
  gCtx.font = `${size}px ${fontType}`
  gCtx.textAlign = align
  gCtx.textBaseline = baseLine
  gCtx.fillText(txt, pos.x, pos.y, gElCanvas.width)
  gCtx.strokeText(txt, pos.x, pos.y, gElCanvas.width)
}

function _renderInlineInput() {
  const line = getCurrLine()
  const { txt, size, align, color, strokeColor, baseLine, fontType, pos } = line
  var strHtmls = ``
  var borderY = pos.y - 20 // Middle line
  if (baseLine === 'top') borderY = pos.y - 5 // Top Line
  if (baseLine === 'bottom') borderY = pos.y - size - 5 // Bottom line
  strHtmls += `
    <input class="canvas-input" type="text" value="${txt}" oninput="onEditLineTxt(this.value)" onkeyup=handleEnter(this,event) style="color:${color};font-size:${size}px;text-align:${align}; -webkit-text-stroke-width: 1px; -webkit-text-stroke-color: ${strokeColor};font-family:${fontType};top:${borderY}px;"/>`
  const elCanvasLines = document.querySelector('.canvas-lines')
  elCanvasLines.innerHTML = strHtmls
  _toggleInlineInput()
  setLineTxt('')
  setLineEdit(true)
  isEditMode = true
  _drawMeme()
}

function _toggleInlineInput() {
  const elCanvasLines = document.querySelector('.canvas-lines')
  elCanvasLines.classList.toggle('hidden')
}

function handleEnter(elInlineInput, e) {
  const keyCode = e.keyCode
  if (keyCode === 13) {
    _toggleInlineInput()
    setLineTxt(elInlineInput.value)
    setLineEdit(false)
    isEditMode = false
    _drawMeme()
  }
}

function onEditLineTxt(newTxt) {
  setLineTxt(newTxt)
  const elTxtInput = document.querySelector('.line-input')
  elTxtInput.value = getLineTxt()
  _drawMeme()
}

function _drawLineBorder() {
  // Bug says, When the user resizes the font on the middle line only
  // The border size is not fitting correctly
  const line = getCurrLine()
  _drawLine(line) // To update the canvas to the relevant line measures
  const { txt, pos, size, baseLine } = line
  var borderY = pos.y - 20
  if (baseLine === 'top') borderY = pos.y - 5
  if (baseLine === 'bottom') borderY = pos.y - size - 5
  const lineWidth = gCtx.measureText(txt).width
  gCtx.strokeStyle = 'red'
  gCtx.strokeRect(pos.x - lineWidth, borderY, lineWidth * 2, size + 10)
}

function onEditMode(isEdit) {
  const lineTxt = getLineTxt()
  const elTxtInput = document.querySelector('.line-input')
  if (!lineTxt) addLine(elTxtInput.placeholder)
  if (elTxtInput.hasAttribute('readonly'))
    elTxtInput.removeAttribute('readonly')
  elTxtInput.value = isEdit === 'on' ? getLineTxt() : ''
  _drawMeme()
}

function onAddLine() {
  const elTxtInput = document.querySelector('.line-input')
  addLine(elTxtInput.placeholder)
  _drawMeme()
}

function onLineSizeChange(diff) {
  setLineSize(diff)
  _drawMeme()
}

function onMoveLine(diff) {
  setLinePos(gElCanvas.height, +diff)
  _drawMeme()
}

function onSwitchLineFocus() {
  if (!getLineTxt()) return
  switchLineFocus()
  const elTxtInput = document.querySelector('.line-input')
  elTxtInput.value = getLineTxt()
  _drawMeme()
}

function onChangeTxtAlign(align) {
  setTxtAlign(align)
  _drawMeme()
}

function onChangeTxtColor(color) {
  setTxtColor(color)
  _drawMeme()
}

function onChangeTxtStroke(color) {
  setTxtStroke(color)
  _drawMeme()
}

function onChangeFont(fontFamily) {
  setFontFamily(fontFamily)
  _drawMeme()
}

function onRemoveLine() {
  removeLine()
  switchLineFocus()
  _drawMeme()
}

function onDownload(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
}

function onShare() {
  uploadImg()
}

function _addListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('dblclick', onDblClick)
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('mouseup', onUp)
  gElCanvas.addEventListener('touchend', onUp)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('touchmove', onMove)
}

function onDown(ev) {
  if (isEditMode) return
  const pos = _getEvPos(ev)
  if (!isPosLine(pos)) return
  setLineDrag(true)
  gStartMovePos = pos
  const elMemeCanvas = document.querySelector('.meme-canvas')
  elMemeCanvas.style.cursor = 'grabbing'
  const elTxtInput = document.querySelector('.line-input')
  elTxtInput.value = getLineTxt()
  _drawMeme()
}

function onDblClick(ev) {
  if (isEditMode) return
  const pos = _getEvPos(ev)
  if (!isPosLine(pos)) return
  _renderInlineInput()
}

function onUp() {
  setLineDrag(false)
  const elMemeCanvas = document.querySelector('.meme-canvas')
  elMemeCanvas.style.cursor = 'grab'
}

function onMove(ev) {
  if (isEditMode) return
  const line = getCurrLine()
  if (!line) return
  if (line.isDrag) {
    const pos = _getEvPos(ev)
    const dx = pos.x - gStartMovePos.x
    const dy = pos.y - gStartMovePos.y
    gStartMovePos = pos
    moveLine(dx, dy)
    _drawMeme()
  }
}

function _getEvPos(ev) {
  const pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  return pos
}
