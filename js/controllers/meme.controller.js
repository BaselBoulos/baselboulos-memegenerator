'use strict'

var gElCanvas
var gCtx
var gStartMovePos
var gSavedMemes = []

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
    gCtx.drawImage(memeImg, 0, 0, gElCanvas.width, gElCanvas.height)
    drawLines()
  }
  memeImg.src = getImgUrl()
}

function drawLines() {
  let lines = getMemeLines()
  if (!lines.length) return
  lines.map((line) => {
    var { txt, size, align, color, strokeColor, direction, fontType, pos } =
      line
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${fontType}`
    gCtx.textAlign = align
    gCtx.textBaseline = direction
    gCtx.fillText(txt, pos.x, pos.y, gElCanvas.width)
    gCtx.strokeText(txt, pos.x, pos.y, gElCanvas.width)
  })
  _drawAroundSelectedLine()
}

function _drawAroundSelectedLine() {
  var { txt, pos, size, direction } = getCurrLine()
  setLineWidth(gCtx.measureText(txt).width)
  var LineWidth = getLineWidth()
  gCtx.strokeStyle = 'red'
  var borderY = pos.y - 20
  if (direction === 'top') borderY = pos.y - 5
  if (direction === 'bottom') borderY = pos.y - size - 5
  gCtx.strokeRect(pos.x - LineWidth, borderY, LineWidth * 2, size + 10)
}

// continue organizin from here

function editMode(isEdit) {
  var elTxtInput = document.querySelector('.line-input')
  var txt = getLineTxt()
  if (!txt) addLine(elTxtInput.placeholder)
  if (isEdit === 'on') {
    elTxtInput.value = getLineTxt()
    elTxtInput.removeAttribute('readonly')
  } else elTxtInput.value = ''
  drawMeme()
}

function onAddLine() {
  var elTxtInput = document.querySelector('.line-input')
  // var txt = elTxtInput.value
  // if (!txt) txt = elTxtInput.placeholder
  addLine(elTxtInput.placeholder)
  drawMeme()
}

function onEditLine(newTxt) {
  setLineTxt(newTxt)
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
  if (!getLineTxt()) return
  switchLine()
  document.querySelector('.line-input').value = getLineTxt()
  drawMeme()
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
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('mouseup', onUp)
  gElCanvas.addEventListener('touchend', onUp)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('touchmove', onMove)
}

function onDown(ev) {
  const pos = getEvPos(ev)
  if (!checkPos(pos)) return
  setLineDrag(true)
  gStartMovePos = pos
  document.querySelector('.meme-canvas').style.cursor = 'grabbing'
  document.querySelector('.line-input').value = getLineTxt()
  drawMeme()
}

function onUp() {
  setLineDrag(false)
  document.querySelector('.meme-canvas').style.cursor = 'grab'
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

// Not working
function saveMeme() {
  var meme = getCurrMeme()
  gSavedMemes.push(meme)
  saveToStorage('memesDB', gSavedMemes)
}

function loadSavedMemes() {
  document.querySelector('.gallery-container').classList.add('hidden')
  document.querySelector('.editor-panel').classList.add('hidden')
  var memes = loadFromStorage('memesDB')
  var memesImgs = getSavedImgs(memes)
  renderSaved(memesImgs)
}

function renderSaved(images) {
  // if (!images) var images = getImgsForDisplay()
  var elSavedGallery = document.querySelector('.saved-gallery')
  var strHtmls = images.map((img) => {
    return `<figure
     class="gallery-item gallery-item${img.id}">
     <img src="${img.url}" alt="${img.url}" class="gallery-img img-${img.id}" onclick="onMemeSelect(${img.id})"/>
     </figure>`
  })
  elSavedGallery.innerHTML = strHtmls.join('')
}
