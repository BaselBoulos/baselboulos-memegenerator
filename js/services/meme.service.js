'use strict'

var gMeme
var gLineId = 0

function createMeme(memeIdx) {
  gMeme = {
    selectedImgId: memeIdx,
    selectedLineIdx: 0,
    lines: [],
  }
}

function createLine(direction, pos, txt) {
  var line = {
    txt,
    size: 25,
    align: 'center',
    color: 'white',
    strokeColor: 'black',
    direction,
    fontType: 'impact',
    isDrag: false,
    pos,
    width: null,
    height: null,
  }
  gMeme.lines.push(line)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function getCurrLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function getImgUrl(memeIdx) {
  const memeImg = getMemeImg(gMeme.selectedImgId)
  return memeImg.url
}

function getLineTxt() {
  if (!gMeme.lines.length) return
  return gMeme.lines[gMeme.selectedLineIdx].txt
}

function setLineTxt(newTxt) {
  if (!gMeme.lines.length) return
  gMeme.lines[gMeme.selectedLineIdx].txt = newTxt
}

function addLine(txt) {
  var direction = 'middle'
  var pos = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
  if (gMeme.lines.length === 0) {
    direction = 'top'
    pos = { x: gElCanvas.width / 2, y: 0 }
  }
  if (gMeme.lines.length === 1) {
    direction = 'bottom'
    pos = { x: gElCanvas.width / 2, y: gElCanvas.height }
  }
  createLine(direction, pos, txt)
}

function setFontSize(diff) {
  if (!gMeme.lines.length) return
  const currSize = gMeme.lines[gMeme.selectedLineIdx].size
  if (currSize > 3) gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function setLinePos(canvasHeight, diff) {
  if (!gMeme.lines.length) return
  const currYPos = gMeme.lines[gMeme.selectedLineIdx].pos.y
  if (diff > 0 && currYPos + diff > canvasHeight) return
  if (currYPos + diff < diff) return
  gMeme.lines[gMeme.selectedLineIdx].pos.y += diff
}

function setLineDirection(direction) {
  if (!gMeme.lines.length) return
  gMeme.lines[gMeme.selectedLineIdx].direction = direction
}

function setAlign(align) {
  if (!gMeme.lines.length) return
  gMeme.lines[gMeme.selectedLineIdx].align = align
}

function setTxtColor(color) {
  if (!gMeme.lines.length) return
  gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setTxtStroke(color) {
  if (!gMeme.lines.length) return
  gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}

function setFontType(fontType) {
  if (!gMeme.lines.length) return
  gMeme.lines[gMeme.selectedLineIdx].fontType = fontType
}

function getMemeLines() {
  return gMeme.lines
}

function getCurrLineIdx() {
  return gMeme.selectedLineIdx
}

function deleteLine() {
  if (!gMeme.lines.length) return
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function checkPos(clickedPos) {
  if (!gMeme.lines.length) return
  var isLine = false
  gMeme.lines.forEach((line, idx) => {
    if (isLineClicked(clickedPos, line.pos, idx)) {
      gMeme.selectedLineIdx = idx
      isLine = true
    }
  })
  return isLine
}

function isLineClicked(clickedPos, pos, lineIdx) {
  const distance = Math.sqrt(
    (pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2
  )
  return distance <= gMeme.lines[lineIdx].size
}

function setLineDrag(isDrag) {
  if (!gMeme.lines.length) return
  gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveLine(dx, dy) {
  gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
  gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}

function setLineWidth(width) {
  gMeme.lines[gMeme.selectedLineIdx].width = width
}

function getLineWidth() {
  return gMeme.lines[gMeme.selectedLineIdx].width
}

function switchLine() {
  if (!gMeme.lines.length) return
  const linesCount = gMeme.lines.length
  const currLineIdx = gMeme.selectedLineIdx
  switch (linesCount) {
    case 1:
      gMeme.selectedLineIdx = 0
      break
    case 2:
      gMeme.selectedLineIdx = currLineIdx === 0 ? 1 : 0
      break
    default:
      gMeme.selectedLineIdx =
        currLineIdx >= linesCount - 1 ? 0 : gMeme.selectedLineIdx + 1
      break
  }
}

function getCurrMeme() {
  return gMeme
}

// not used
function getSavedImgs(memes) {
  var imgs = []
  memes.forEach((meme) => {
    imgs.push(getMemeImg(meme.selectedImgId))
  })
  return imgs
}
