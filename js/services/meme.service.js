'use strict'

var gMeme
var gLineId = 0

function createMeme(memeIdx) {
  gMeme = {
    selectedImgId: memeIdx,
    selectedLineIdx: 0,
    lines: [
      // {
      //   txt: 'top',
      //   size: 30,
      //   align: 'center',
      //   color: 'white',
      //   strokeColor: 'black',
      //   direction: 'top',
      //   fontType: 'impact',
      //   isDrag: false,
      //   pos: { x: gElCanvas.width / 2, y: 0 },
      //   width: null,
      //   height: null,
      // },
      // {
      //   txt: 'middle',
      //   size: 30,
      //   align: 'center',
      //   color: 'white',
      //   strokeColor: 'black',
      //   direction: 'middle',
      //   fontType: 'impact',
      //   isDrag: false,
      //   pos: { x: gElCanvas.width / 2, y: gElCanvas.height / 2 },
      //   width: null,
      //   height: null,
      // },
      // {
      //   txt: 'bottom',
      //   size: 30,
      //   align: 'center',
      //   color: 'white',
      //   strokeColor: 'black',
      //   direction: 'bottom',
      //   fontType: 'impact',
      //   isDrag: false,
      //   pos: { x: gElCanvas.width / 2, y: gElCanvas.height },
      //   width: null,
      //   height: null,
      // },
    ],
  }
}

function createLine(direction, pos, txt = 'NEW TEXT') {
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
  }
  gMeme.lines.push(line)
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
  const currYPos = gMeme.lines[gMeme.selectedLineIdx].pos.y
  if (diff <= 0 && currYPos <= 0) return
  if (diff > 0 && currYPos + diff >= canvasHeight) return
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

function setLineIdx() {
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

function deleteLine() {
  if (!gMeme.lines.length) return
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function isLineClicked(clickedPos) {
  const { pos } = gMeme.lines[gMeme.selectedLineIdx]
  console.log('pos', pos)
  console.log('clickedPos', clickedPos)
  const distance = Math.sqrt(
    (pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2
  )
  // return distance <= gCircle.size
}

function setLineWidth(width) {
  gMeme.lines[gMeme.selectedLineIdx].width = width
}

function getLineWidth() {
  return gMeme.lines[gMeme.selectedLineIdx].width
}
