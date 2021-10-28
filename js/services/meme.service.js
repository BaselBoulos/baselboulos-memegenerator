'use strict'

var gMeme
var gLineId = 0

function createMeme(memeIdx) {
  gMeme = {
    selectedImgId: memeIdx,
    selectedLineIdx: 0,
    lines: [
      {
        lineId: gLineId++,
        txt: 'basel',
        size: 50,
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        direction: 'top',
        fontType: 'impact',
        posX: 0,
        posY: 0,
      },
      {
        lineId: gLineId++,
        txt: 'test',
        size: 50,
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        direction: 'bottom',
        fontType: 'impact',
        posX: 0,
        posY: 0,
      },
    ],
  }
}

function getImgUrl(memeIdx) {
  const memeImg = getMemeImg(memeIdx)
  return memeImg.url
}

function getCurrMemeIdx() {
  return gMeme.selectedImgId
}

// function getMemeTxt() {
//   return gMeme['lines'][gMeme.selectedLineIdx].txt
// }

function getMemeTxt(txtId) {
  return gMeme.lines[txtId].txt
}

function setMemeTxt(newTxt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = newTxt
}

function getFontSize() {
  return gMeme.lines[gMeme.selectedLineIdx].size
}

function setFontSize(diff) {
  const currSize = gMeme.lines[gMeme.selectedLineIdx].size
  if (currSize > 3) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
  }
}

function getLineDirection() {
  return gMeme.lines[gMeme.selectedLineIdx].direction
}

function setLineDirection(direction) {
  gMeme.lines[gMeme.selectedLineIdx].direction = direction
}

function getAlign(txtId) {
  return gMeme.lines[txtId].align
}

function setAlign(txtId, align) {
  gMeme.lines[txtId].align = align
}

function getTxtColor(txtId) {
  return gMeme.lines[txtId].color
}

function setTxtColor(txtId, color) {
  gMeme.lines[txtId].color = color
}

function getTxtStroke(txtId) {
  return gMeme.lines[txtId].strokeColor
}

function setTxtStroke(txtId, color) {
  gMeme.lines[txtId].strokeColor = color
}

function getFontType(txtId) {
  return gMeme.lines[txtId].fontType
}

function setFontType(txtId, fontType) {
  gMeme.lines[txtId].fontType = fontType
}

function getMemeLines() {
  return gMeme.lines
}
