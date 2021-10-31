'use strict'

var gImgId = 1
var gCategories = {}
var gCategoryPopularity = {}

var gImgs = [
  {
    id: gImgId++,
    url: 'img/1.jpg',
    keywords: ['nature', 'happy'],
  },
  {
    id: gImgId++,
    url: 'img/2.jpg',
    keywords: ['politics'],
  },
  {
    id: gImgId++,
    url: 'img/3.jpg',
    keywords: ['animals'],
  },
  {
    id: gImgId++,
    url: 'img/4.jpg',
    keywords: ['animals', 'kids'],
  },
  {
    id: gImgId++,
    url: 'img/5.jpg',
    keywords: ['kids', 'happy'],
  },
  {
    id: gImgId++,
    url: 'img/6.jpg',
    keywords: ['animals'],
  },
  {
    id: gImgId++,
    url: 'img/7.jpg',
    keywords: ['celeb'],
  },
  {
    id: gImgId++,
    url: 'img/8.jpg',
    keywords: ['kids', 'happy'],
  },
  {
    id: gImgId++,
    url: 'img/9.jpg',
    keywords: ['celeb'],
  },
  {
    id: gImgId++,
    url: 'img/10.jpg',
    keywords: ['politics', 'celeb'],
  },
  {
    id: gImgId++,
    url: 'img/11.jpg',
    keywords: ['celeb'],
  },
  {
    id: gImgId++,
    url: 'img/12.jpg',
    keywords: ['celeb'],
  },
  {
    id: gImgId++,
    url: 'img/13.jpg',
    keywords: ['kids', 'happy'],
  },
  {
    id: gImgId++,
    url: 'img/14.jpg',
    keywords: ['politics'],
  },
  {
    id: gImgId++,
    url: 'img/15.jpg',
    keywords: ['kids', 'happy'],
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
    keywords: ['love'],
  },
  {
    id: gImgId++,
    url: 'img/19.jpg',
    keywords: ['celeb'],
  },
  {
    id: gImgId++,
    url: 'img/20.jpg',
    keywords: ['celeb'],
  },
  {
    id: gImgId++,
    url: 'img/21.jpg',
    keywords: ['celeb'],
  },
  {
    id: gImgId++,
    url: 'img/22.jpg',
    keywords: ['celeb'],
  },
  {
    id: gImgId++,
    url: 'img/23.jpg',
    keywords: ['politics', 'celeb'],
  },
  {
    id: gImgId++,
    url: 'img/24.jpg',
    keywords: ['politics'],
  },
  {
    id: gImgId++,
    url: 'img/25.jpg',
    keywords: ['happy'],
  },
]

function getImg(imgid) {
  const memeImg = gImgs.find((img) => img.id === imgid)
  return memeImg
}

function getImgsForDisplay() {
  return gImgs
}

function setCategories() {
  // Set images count for each category
  var categoryMap = gImgs.reduce((acc, img) => {
    img.keywords.map((keyword) => {
      if (!acc[keyword]) acc[keyword] = 0
      acc[keyword]++
    })
    return acc
  }, {})
  gCategories = categoryMap
  // Dummy data for start ( goal of this is for visual only )
  gCategories.funny = 12
  gCategories.travel = 32
  gCategories.sad = 22
  gCategories.coding = 29
  gCategories.music = 20
  gCategories.running = 12
  gCategories.swimming = 5
  gCategories.gentleman = 16
  gCategories.clothes = 16
  gCategories.coffee = 8
  _initDummyData()
}

function _initDummyData() {
  for (let category in gCategories) {
    gCategoryPopularity[category] = getRandomInt(8, 32)
  }
}

function getFilteredImgs(category) {
  return gImgs.filter((img) => {
    return img.keywords.some((keyword) => keyword.includes(category))
  })
}

function getCategoriesMap() {
  return gCategories
}

function increasePopularity(category) {
  if (!gCategoryPopularity[category]) return
  gCategoryPopularity[category] = gCategoryPopularity[category] + 1
}

function getPopularity(category) {
  if (!gCategoryPopularity[category]) return
  return gCategoryPopularity[category]
}
