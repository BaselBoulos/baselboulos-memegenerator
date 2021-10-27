'use strict'

var gElCanvas
var gCtx

function onInit() {
  gElCanvas = document.querySelector('.meme-canvas')
  gCtx = gElCanvas.getContext('2d')
  drawMeme()
}

function drawMeme() {
  var meme = new Image()
  meme.onload = () => {
    gCtx.drawImage(meme, 0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.font = '50px IMPACT'
    gCtx.fillStyle = 'white'
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.textAlign = 'center'
    // the default textBaseline is "alphabetic", we change to top so we can control the Y in fillText
    gCtx.textBaseline = 'top'

    gCtx.fillText(getMemeTxt(), gElCanvas.width / 2, 0, gElCanvas.width)
    // gCtx.strokeText(getMemeTxt(), 0, 50)
  }
  meme.src = getMemeImg()
}

function onUpdateTxt() {
  var newTxt = document.querySelector('.meme-txt-input').value
  setMemeTxt(newTxt)
  onInit()
}
