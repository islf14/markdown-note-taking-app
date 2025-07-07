import express, { json } from 'express'
import noteRouter from './routes/note.route'

const app = express()
const port = 3000
app.use(json())
app.use(express.static('client'))

app.get('/', (_req, res) => {
  res.send('Welcome to the Markdown Note-taking App!')
})

app.use('/note', (_req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

app.use('/api/note', noteRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
