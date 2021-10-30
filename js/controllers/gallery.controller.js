'use strict'

function onInitGallery() {
  renderGallery()
  renderSearchList()
  renderKeyWords()
}

function renderGallery(images) {
  if (!images) images = getImgsForDisplay()
  const strHtmls = images.map((img) => {
    return `<figure
     class="gallery-item gallery-item${img.id}">
     <img src="${img.url}" alt="" class="gallery-img img-${img.id}" onclick="onMemeSelect(${img.id})"/>
     </figure>`
  })
  var elGallery = document.querySelector('.gallery')
  elGallery.innerHTML = strHtmls.join('')
}

function onShowGallery() {
  var elEditor = document.querySelector('.editor-panel')
  if (!elEditor.classList.contains('hidden')) elEditor.classList.add('hidden')
  var elGallery = document.querySelector('.gallery-container')
  if (elGallery.classList.contains('hidden'))
    elGallery.classList.remove('hidden')
  onInitGallery()
}

function onSetFilter(category) {
  var imgs = getFilteredImgs(category)
  increasePopularity(category)
  renderGallery(imgs)
}

function renderSearchList() {
  var elSearch = document.querySelector('.search-input')
  elSearch.value = ''
  setCategories()
  var categories = getCategoriesMap()
  var strHtmls = ''
  for (let category in categories) {
    strHtmls += `<option>${category}</option>`
  }
  var elCategoryList = document.querySelector('#category-list')
  elCategoryList.innerHTML = strHtmls
}

function renderKeyWords() {
  var categories = getCategoriesMap()
  var elKeywords = document.querySelector('.search-keywords')
  var strHtmls = ''
  for (let category in categories) {
    let fontSize = getPopularity(category) / 16
    if (fontSize > 2) fontSize = 2
    strHtmls += `<a class="capitalize category cat-${category}" onclick="onSetFilter('${category}')" style="font-size:${fontSize}em">${category}</a>`
  }
  elKeywords.innerHTML = strHtmls
}
