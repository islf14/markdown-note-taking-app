const q$ = (el) => document.querySelector(el)

q$('#html').addEventListener('click', (e) => {
  e.preventDefault()
  q$('#html').classList.add('active')
  code.classList.remove('active')
  q$('#right1').style.display = 'block'
  q$('#right2').style.display = 'none'
})

q$('#code').addEventListener('click', (e) => {
  e.preventDefault()
  q$('#code').classList.add('active')
  html.classList.remove('active')
  q$('#right1').style.display = 'none'
  q$('#right2').style.display = 'block'
})
