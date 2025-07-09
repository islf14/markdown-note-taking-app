const $ = (el) => document.querySelector(el)

const fileIn = $('#fileIn')
const submit = $('#submit')
const message = $('#message')
const left = $('#left')
const right1 = $('#right1')
const right2 = $('#right2')
const html = $('#html')
const code = $('#code')

html.addEventListener('click', (e) => {
  e.preventDefault()
  html.classList.add('active')
  code.classList.remove('active')
  right1.style.display = 'block'
  right2.style.display = 'none'
})
code.addEventListener('click', (e) => {
  e.preventDefault()
  code.classList.add('active')
  html.classList.remove('active')
  right1.style.display = 'none'
  right2.style.display = 'block'
})

fileIn.addEventListener('change', () => {
  const file = fileIn.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target.result
      left.innerText = content
      fetch('/api/note/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ note: content })
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          right1.innerHTML = data.data
          right2.innerText = data.data
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error)
        })
    }
    reader.readAsText(file)
  }
})

submit.addEventListener('click', (e) => {
  e.preventDefault()
  const file = fileIn.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target.result
      fetch('/api/note/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ note: content })
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          message.innerText = 'Successfully saved'
          message.style.color = 'green'
        })
        .catch((error) => {
          message.innerText = 'Error, try again'
          message.style.color = 'red'
          console.error('There was a problem with the fetch operation:', error)
        })
    }
    reader.readAsText(file)
  }
})
