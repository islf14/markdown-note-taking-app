window.onload = function () {
  getAll()
}

function getAll() {
  fetch('api/note')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      let i = 0
      data.forEach((element) => {
        i++
        const table = document.querySelector('#notesTable')
        const newRow = table.insertRow(-1)
        const cellZero = newRow.insertCell(0)
        const cellOne = newRow.insertCell(1)
        const cellTwo = newRow.insertCell(2)
        const a = document.createElement('a')
        a.setAttribute('href', `view/${element._id}`)
        a.textContent = 'View note'

        cellZero.appendChild(document.createTextNode(i))
        cellOne.appendChild(document.createTextNode(element.name))
        cellTwo.appendChild(a)
      })
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error)
    })
}
