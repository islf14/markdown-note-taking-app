import markdownit from 'markdown-it'
import { stringRandom } from './utils'
import { NoteModel } from '../models/note.model'

export class NoteController {
  // convert note
  public convertNote(req: any, res: any) {
    if (!req.body || !req.body.note) {
      res.send({ error: 'No note data provided' })
      return
    }
    const data = req.body.note
    const md = markdownit()
    const result = md.render(data)
    res.json({ data: result })
  }

  // create note
  public async createNote(req: any, res: any) {
    if (!req.body || !req.body.note) {
      res.send({ error: 'No note data provided' })
      return
    }
    const data = req.body.note
    const splitData = data.split('\n')
    // /[^a-zA-Z0-9]/g
    const zeroClean = splitData[0].replace(/(\r)+/g, '')

    if (splitData[0] === '' || zeroClean.length < 1) {
      res.send({ error: 'Error in note data provided' })
      return
    }
    // Generate a random string of 5 characters
    const nameNote = zeroClean + ' %' + stringRandom(5)

    // Save the note in db
    try {
      const insertedId = await NoteModel.saveNote({
        name: nameNote,
        content: JSON.stringify(data)
      })
      res.status(201).json({ insertedId })
    } catch (e: any) {
      console.error({ error: e.message })
      res.status(500).json({ error: 'Error saving note' })
    }
  }

  public async getAllNotes(_req: any, res: any) {
    try {
      const notes = await NoteModel.gellAll()
      res.status(200).json(notes)
    } catch (e: any) {
      console.error({ error: e.message })
      res.status(500).json({ error: 'Error getting notes' })
    }
  }

  public async viewNote(req: any, res: any) {
    const { id } = req.params
    const md = markdownit()
    let note = null
    try {
      note = await NoteModel.viewNote({ id })
    } catch (e: any) {
      console.error({ error: e.message })
      return res.status(400).json({ error: 'Error getting note' })
    }
    if (note && note.content) {
      const content = JSON.parse(note.content)
      const result = md.render(content)
      const data = {
        name: note.name,
        noteOriginal: content,
        noteConverted: result,
        createdAt: note.createdAt
      }
      return res.status(200).json(data)
    } else return res.status(400).json({ error: 'Error getting note' })
  }
}
