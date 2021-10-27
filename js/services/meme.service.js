'use strict'

var gKeywords = {
  happy: 1,
  animal: 1,
}

var gImgs = [
  {
    id: 1,
    url: 'img/1.jpg',
    keywords: ['happy'],
  },
  {
    id: 2,
    url: 'img/2.jpg',
    keywords: ['animal'],
  },
]

var gMeme = {
  selectedImgId: 2,
  selectedLineIdx: 0,
  lines: [
    {
      txt: '',
      size: 20,
      align: 'left',
      color: 'red',
    },
  ],
}

function getMemeImg() {
  const memeImg = gImgs.find((img) => img.id === gMeme.selectedImgId)
  return memeImg.url
}

function getMemeTxt() {
  return gMeme['lines'][0].txt
}

function setMemeTxt(newTxt) {
  gMeme['lines'][0].txt = newTxt
}
