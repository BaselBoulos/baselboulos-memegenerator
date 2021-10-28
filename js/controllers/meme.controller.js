'use strict'

var gElCanvas
var gCtx

function onInitEditor() {
  gElCanvas = document.querySelector('.meme-canvas')
  gCtx = gElCanvas.getContext('2d')
}

function onMemeSelect(memeIdx) {
  document.querySelector('.editor-panel').classList.remove('hidden')
  document.querySelector('.gallery-container').classList.add('hidden')
  // resizeCanvas()
  createMeme(memeIdx)
  drawMeme(memeIdx)
}

function resizeCanvas() {
  var elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
}

function drawMeme(memeIdx) {
  var memeImg = new Image()
  memeImg.onload = () => {
    gCtx.drawImage(memeImg, 0, 0, gElCanvas.width, gElCanvas.height)
    // drawText()
    renderTexts()
  }
  memeImg.src = getImgUrl(memeIdx)
}

function renderTexts() {
  console.log(getMemeTxt(0))
  // to render texts i need the lines array
  var lines = getMemeLines()
  // then i need to go over each line
  lines.map((line) => drawText(line))
  // and make drawtext to each line
  // with it's txt,font,etc
}

function drawText(line) {
  console.log(line)
  gCtx.font = `${line.size}px ${line.fontType}`
  gCtx.fillStyle = line.color
  gCtx.strokeStyle = line.strokeStyle
  gCtx.lineWidth = 2
  gCtx.textAlign = line.align
  switch (line.direction) {
    case 'bottom':
      gCtx.textBaseline = 'bottom'
      gCtx.fillText(
        line.txt,
        gElCanvas.width / 2,
        gElCanvas.height,
        gElCanvas.width
      )
      gCtx.strokeText(
        line.txt,
        gElCanvas.width / 2,
        gElCanvas.height,
        gElCanvas.width
      )
      break
    default:
      gCtx.textBaseline = 'top'
      gCtx.fillText(line.txt, gElCanvas.width / 2, 0, gElCanvas.width)
      gCtx.strokeText(line.txt, gElCanvas.width / 2, 0, gElCanvas.width)
  }
}

// function drawText(line) {
//   console.log(line)
//   // const txt = getMemeTxt()
//   gCtx.font = `${getFontSize()}px ${getFontType(0)}`
//   gCtx.fillStyle = getTxtColor(0)
//   gCtx.strokeStyle = getTxtStroke(0)
//   gCtx.lineWidth = 2
//   gCtx.textAlign = getAlign(0)
//   switch (getLineDirection()) {
//     case 'bottom':
//       gCtx.textBaseline = 'bottom'
//       gCtx.fillText(txt, gElCanvas.width / 2, gElCanvas.height, gElCanvas.width)
//       gCtx.strokeText(
//         txt,
//         gElCanvas.width / 2,
//         gElCanvas.height,
//         gElCanvas.width
//       )
//       break
//     default:
//       gCtx.textBaseline = 'top'
//       gCtx.fillText(txt, gElCanvas.width / 2, 0, gElCanvas.width)
//       gCtx.strokeText(txt, gElCanvas.width / 2, 0, gElCanvas.width)
//   }
// }

function onAddLine(txt) {
  setMemeTxt(txt)
  drawMeme(getCurrMemeIdx())
}

function onFontSizeChange(diff) {
  setFontSize(diff)
  drawMeme(getCurrMemeIdx())
}

function onMoveLine(direction) {
  setLineDirection(direction)
  drawMeme(getCurrMemeIdx())
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onSwitchLine() {}

function onChangeAlign(align) {
  setAlign(0, align)
  drawMeme(getCurrMemeIdx())
}

function onChangeFontColor(color) {
  setTxtColor(0, color)
  drawMeme(getCurrMemeIdx())
}

function onChangeStroke(color) {
  setTxtStroke(0, color)
  drawMeme(getCurrMemeIdx())
}

function onChangeFont(fontType) {
  setFontType(0, fontType)
  drawMeme(getCurrMemeIdx())
}

function onDownload(elLink) {
  let imgContent = gElCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
}

function onShareMeme() {
  uploadImg()
}
