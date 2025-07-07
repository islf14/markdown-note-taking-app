import markdownit from 'markdown-it'

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
  public createNote(req: any, res: any) {
    if (!req.body || !req.body.note) {
      res.send({ error: 'No note data provided' })
      return
    }
    const data = req.body.note
    const md = markdownit()
    const result = md.render(data)
    console.log(`Note created with content: ${result}`)
    res.json({ message: 'ok' })
  }

  public getAllNotes(_req: any, res: any) {
    const notes = [
      { id: 1, content: 'Sample note 1' },
      { id: 2, content: 'Sample note 2' }
    ]
    res.json(notes)
  }
}
