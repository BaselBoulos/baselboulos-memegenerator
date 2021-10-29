'use strict'

function uploadImg() {
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    share(encodedUploadedImgUrl)
  }
  doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData()
  formData.append('img', imgDataUrl)

  fetch('//ca-upload.com/here/upload.php', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.text())
    .then((url) => {
      onSuccess(url)
    })
    .catch((err) => {
      console.error(err)
    })
}

function share(url) {
  console.log(url)
  if (navigator.share) {
    navigator
      .share({
        title: 'LMAO THIS MEME IS FUNNY',
        url,
      })
      .then(() => {
        console.log('Thanks for sharing')
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
