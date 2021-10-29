'use strict'

var gImgId = 1

var gCategories = {}
var gCategoryPopularity = { politics: 2, animals: 3, kids: 4, celeb: 2 }

var gImgs = [
  {
    id: gImgId++,
    url: 'img/1.jpg',
    keywords: ['politics'],
  },
  {
    id: gImgId++,
    url: 'img/2.jpg',
    keywords: ['animals'],
  },
  {
    id: gImgId++,
    url: 'img/3.jpg',
    keywords: ['animals', 'kids'],
  },
  {
    id: gImgId++,
    url: 'img/4.jpg',
    keywords: ['animals'],
  },
  {
    id: gImgId++,
    url: 'img/5.jpg',
    keywords: ['kids'],
  },
  {
    id: gImgId++,
    url: 'img/6.jpg',
    keywords: ['celeb'],
  },
  {
    id: gImgId++,
    url: 'img/7.jpg',
    keywords: ['kids'],
  },
  {
    id: gImgId++,
    url: 'img/8.jpg',
    keywords: ['celeb'],
  },
  {
    id: gImgId++,
    url: 'img/9.jpg',
    keywords: ['kids'],
  },
  {
    id: gImgId++,
    url: 'img/10.jpg',
    keywords: ['politics'],
  },
  {
    id: gImgId++,
    url: 'img/11.jpg',
    keywords: ['politics'],
  },
  {
    id: gImgId++,
    url: 'img/12.jpg',
    keywords: ['politics'],
  },
  {
    id: gImgId++,
    url: 'img/13.jpg',
    keywords: ['politics'],
  },
  {
    id: gImgId++,
    url: 'img/14.jpg',
    keywords: ['politics'],
  },
  {
    id: gImgId++,
    url: 'img/15.jpg',
    keywords: ['politics'],
  },
  {
    id: gImgId++,
    url: 'img/16.jpg',
    keywords: ['animals'],
  },
  {
    id: gImgId++,
    url: 'img/17.jpg',
    keywords: ['politics'],
  },
  {
    id: gImgId++,
    url: 'img/18.jpg',
    keywords: ['politics'],
  },
  {
    id: gImgId++,
    url: 'img/19.jpg',
    keywords: ['politics'],
  },
  {
    id: gImgId++,
    url: 'img/20.jpg',
    keywords: ['politics'],
  },
  {
    id: gImgId++,
    url: 'img/21.jpg',
    keywords: ['politics'],
  },
  {
    id: gImgId++,
    url: 'img/22.jpg',
    keywords: ['politics'],
  },
  {
    id: gImgId++,
    url: 'img/23.jpg',
    keywords: ['politics'],
  },
  {
    id: gImgId++,
    url: 'img/24.jpg',
    keywords: ['politics'],
  },
  {
    id: gImgId++,
    url: 'img/25.jpg',
    keywords: ['politics'],
  },
]

function getMemeImg(memeIdx) {
  const memeImg = gImgs.find((img) => img.id === memeIdx)
  return memeImg
}

function getImgsForDisplay() {
  return gImgs
}

function setCategories() {
  var categoryMap = gImgs.reduce((acc, img) => {
    img.keywords.map((keyword) => {
      if (!acc[keyword]) acc[keyword] = 0
      acc[keyword]++
    })
    return acc
  }, {})
  gCategories = categoryMap
}

function getKeyWordsMap() {
  return gCategories
}

function getFilteredImgs(filterBy) {
  return gImgs.filter((img) => {
    return img.keywords.some((keyword) => keyword.includes(filterBy))
  })
}

function getCategories() {
  return gCategories
}

function addPopularity(category) {
  if (!gCategoryPopularity[category]) return
  console.log('before', gCategoryPopularity[category])
  gCategoryPopularity[category] = gCategoryPopularity[category] + 1
  console.log('after', gCategoryPopularity[category])
}

function getCatPopularity(category) {
  return gCategoryPopularity[category]
}
