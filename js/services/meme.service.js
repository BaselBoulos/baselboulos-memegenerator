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

function createLine(baseLine, pos, txt) {
  const line = {
    txt,
    size: 25,
    color: 'white',
    strokeColor: 'black',
    fontType: 'impact',
    align: 'center',
    baseLine,
    isDrag: false,
    pos,
  }
  gMeme.lines.push(line)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function getCurrLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function getCurrMemeImg() {
  // From gallery service
  const memeImg = getImg(gMeme.selectedImgId)
  return memeImg.url
}

function setLineTxt(newTxt) {
  if (!gMeme.lines.length) return
  gMeme.lines[gMeme.selectedLineIdx].txt = newTxt
}

function getLineTxt() {
  if (!gMeme.lines.length) return
  return gMeme.lines[gMeme.selectedLineIdx].txt
}

function addLine(txt) {
  var baseLine = 'middle'
  var pos = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
  if (gMeme.lines.length === 0) {
    baseLine = 'top'
    pos.y = 0
  }
  if (gMeme.lines.length === 1) {
    baseLine = 'bottom'
    pos.y = gElCanvas.height
  }
  createLine(baseLine, pos, txt)
}

function setLineSize(diff) {
  if (!gMeme.lines.length) return
  const currLineSize = gMeme.lines[gMeme.selectedLineIdx].size
  if (currLineSize <= 0 && diff <= 0) return
  gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function setLinePos(canvasHeight, diff) {
  if (!gMeme.lines.length) return
  const currYPos = gMeme.lines[gMeme.selectedLineIdx].pos.y
  if (diff > 0 && currYPos + diff > canvasHeight) return
  if (currYPos + diff < diff) return
  gMeme.lines[gMeme.selectedLineIdx].pos.y += diff
}

function setTxtAlign(align) {
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

function setFontFamily(fontFamily) {
  if (!gMeme.lines.length) return
  gMeme.lines[gMeme.selectedLineIdx].fontType = fontFamily
}

function getMemeLines() {
  return gMeme.lines
}

function removeLine() {
  if (!gMeme.lines.length) return
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function isPosLine(clickedPos) {
  if (!gMeme.lines.length) return
  var isLine = false
  gMeme.lines.forEach((line, idx) => {
    if (_isLine(clickedPos, line.pos, idx)) {
      gMeme.selectedLineIdx = idx
      isLine = true
    }
  })
  return isLine
}

function _isLine(clickedPos, pos, lineIdx) {
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

function switchLineFocus() {
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
