import { Router } from 'express'
import { NoteController } from '../controllers/note.controller'

const noteRouter = Router()

const noteController = new NoteController()

noteRouter.post('/convert', noteController.convertNote)
noteRouter.post('/save', noteController.createNote)
noteRouter.get('/allnotes', noteController.getAllNotes)

export default noteRouter
