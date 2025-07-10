import express, { json } from 'express'
import noteRouter from './routes/note.route'
import 'dotenv/config'

const app = express()
const port = process.env.PORT ?? 3000
app.use(json())
app.use(express.static('client'))

app.get('/', (_req, res) => {
  res.json('Welcome to the Markdown Note-taking App!')
})
app.use('/note', (_req, res) => {
  res.sendFile(process.cwd() + '/client/formnote.html')
})
app.use('/allnotes', (_req, res) => {
  res.sendFile(process.cwd() + '/client/getallnotes.html')
})
app.use('/view/:id', (_req, res) => {
  res.sendFile(process.cwd() + '/client/viewnote.html')
})
app.use('/api/note', noteRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
