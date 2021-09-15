const infoMsg = document.querySelector('.info')
const errMsgs = document.querySelectorAll('.error')

if (infoMsg) {
  setFade(infoMsg)
}

if (errMsgs) {
  errMsgs.forEach((err)=> {
    setFade(err)
  })
}

function setFade(msgElement) {
  setTimeout(() => {
    let currentOpacity = 1.0;
    let timer = setInterval(() => {
      if (currentOpacity < 0.05) {
        clearInterval(timer)
        msgElement.remove()
      }

      currentOpacity = currentOpacity - 0.05
      msgElement.style.opacity = currentOpacity
    }, 50);
  }, 4000);
}