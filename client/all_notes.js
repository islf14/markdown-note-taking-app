window.onload = function () {
  getAll()
}

function getAll() {
  const data = fetch('api/note/allnotes')
    .then((response) => {
      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      data.forEach((element) => {
        console.log(element.name)
      })
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error)
    })
}
