'use strict'

var gImgId = 1

var gKeywords = {
  happy: 1,
  animal: 1,
}

var gImgs = [
  {
    id: gImgId++,
    url: 'img/1.jpg',
    keywords: ['happy'],
  },
  {
    id: gImgId++,
    url: 'img/2.jpg',
    keywords: ['animal'],
  },
  {
    id: gImgId++,
    url: 'img/3.jpg',
    keywords: ['animal'],
  },
  {
    id: gImgId++,
    url: 'img/4.jpg',
    keywords: ['animal'],
  },
  {
    id: gImgId++,
    url: 'img/5.jpg',
    keywords: ['animal'],
  },
  {
    id: gImgId++,
    url: 'img/6.jpg',
    keywords: ['animal'],
  },
  {
    id: gImgId++,
    url: 'img/7.jpg',
    keywords: ['animal'],
  },
  {
    id: gImgId++,
    url: 'img/8.jpg',
    keywords: ['animal'],
  },
  {
    id: gImgId++,
    url: 'img/9.jpg',
    keywords: ['animal'],
  },
  {
    id: gImgId++,
    url: 'img/10.jpg',
    keywords: ['animal'],
  },
]

function getMemeImg(memeIdx) {
  const memeImg = gImgs.find((img) => img.id === memeIdx)
  return memeImg
}

function getImgsForDisplay() {
  return gImgs
}
