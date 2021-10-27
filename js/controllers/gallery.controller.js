'use strict'

function onInitGallery() {
  renderGallery()
}

function renderGallery() {
  const images = getImgs()
  var elGallery = document.querySelector('.gallery')
  var strHtmls = images.map((img) => {
    return `<figure
     class="gallery-item gallery-item${img.id}">
     <img src="${img.url}" alt="${img.url}" class="gallery-img" onclick="onMemeSelect(${img.id})"/>
     </figure>`
  })
  elGallery.innerHTML = strHtmls.join('')
}
