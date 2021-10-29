'use strict'

function onInitGallery() {
  renderGallery()
  renderSearchList()
  renderKeyWords()
}

function renderGallery(images) {
  if (!images) var images = getImgsForDisplay()
  var elGallery = document.querySelector('.gallery')
  var strHtmls = images.map((img) => {
    return `<figure
     class="gallery-item gallery-item${img.id}">
     <img src="${img.url}" alt="${img.url}" class="gallery-img img-${img.id}" onclick="onMemeSelect(${img.id})"/>
     </figure>`
  })
  elGallery.innerHTML = strHtmls.join('')
}

function onShowGallery() {
  var elGallery = document.querySelector('.gallery-container')
  var elEditor = document.querySelector('.editor-panel')
  if (!elEditor.classList.contains('hidden')) elEditor.classList.add('hidden')
  if (elGallery.classList.contains('hidden'))
    elGallery.classList.remove('hidden')
  onInitGallery()
}

function onSetFilter(filterBy) {
  var imgs = getFilteredImgs(filterBy)
  addPopularity(filterBy)
  renderGallery(imgs)
}

function renderSearchList() {
  var elSearch = document.querySelector('.search-input')
  elSearch.value = ''
  setCategories()
  var categories = getCategories()
  var strHtmls = ''
  for (let category in categories) {
    strHtmls += ` <option>${category}</option>`
  }
  var elCategoryList = document.querySelector('#category-list')
  elCategoryList.innerHTML = strHtmls
}

function renderKeyWords() {
  var categories = getCategories()
  var elKeywords = document.querySelector('.search-keywords')
  var strHtmls = ''
  for (let category in categories) {
    let fontSize = getCatPopularity(category) * 8
    if (fontSize > 45) fontSize = 45
    strHtmls += `<a class="capitalize category cat-${category}" onclick="onSetFilter('${category}')" style="font-size:${fontSize}px">${category}</a>`
  }
  elKeywords.innerHTML = strHtmls
}
