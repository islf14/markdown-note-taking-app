import { Router } from 'express'
import { NoteController } from '../controllers/note.controller'

const noteRouter = Router()

const noteController = new NoteController()

noteRouter.post('/convert', noteController.convertNote)
noteRouter.post('/', noteController.createNote)
noteRouter.get('/', noteController.getAllNotes)
noteRouter.get('/:id', noteController.viewNote)

export default noteRouter
