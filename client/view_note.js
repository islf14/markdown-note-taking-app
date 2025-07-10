const $ = (el) => document.querySelector(el)

window.onload = function () {
  viewNote()
}

function viewNote() {
  const pathname = window.location.pathname.split('/')
  if (pathname[2]) {
    fetch(`../api/note/${pathname[2]}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        $('#left').innerText = data.noteOriginal
        $('#right1').innerHTML = data.noteConverted
        $('#right2').innerText = data.noteConverted
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error)
      })
  }
}
