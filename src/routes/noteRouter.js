const express = require ('express')
const NoteRouter = express.Router()
const notesController = require('../controllers/note/index.js')
// const authenticate= require('../helpers/middleware/auth.js')
// NoteRouter.use(authenticate)

NoteRouter.get('/', notesController)
// NoteRouter.get('/', notesController.getNoteById)
// NoteRouter.post('/',notesController.addNote)
// NoteRouter.patch('/',notesController.updateNote)
// NoteRouter.delete('/',notesController.deleteNote)

module.exports = NoteRouter