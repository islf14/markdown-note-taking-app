import expres from 'express'

const app = expres()
const port = 3000

app.get('/', (_req, res) => {
  res.send('Welcome to the Markdown Note-taking App!')
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
