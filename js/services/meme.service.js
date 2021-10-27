'use strict'

var gMeme

function createMeme(memeIdx) {
  gMeme = {
    selectedImgId: memeIdx,
    selectedLineIdx: 0,
    lines: [
      {
        txt: '',
        size: 50,
        align: 'left',
        color: 'red',
        pos: 'top',
      },
      {
        txt: '',
        size: 50,
        align: 'left',
        color: 'red',
        pos: 'bottom',
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

function getMemeTxt() {
  return gMeme['lines'][gMeme.selectedLineIdx].txt
}

function setMemeTxt(newTxt) {
  gMeme['lines'][gMeme.selectedLineIdx].txt = newTxt
}

function getFontSize() {
  return gMeme['lines'][gMeme.selectedLineIdx].size
}

function setFontSize(diff) {
  const currSize = gMeme['lines'][gMeme.selectedLineIdx].size
  if (currSize > 3) {
    gMeme['lines'][gMeme.selectedLineIdx].size += diff
  }
}

function getLinePos() {
  return gMeme['lines'][gMeme.selectedLineIdx].pos
}

function setLinePos(pos) {
  gMeme['lines'][gMeme.selectedLineIdx].pos = pos
}
