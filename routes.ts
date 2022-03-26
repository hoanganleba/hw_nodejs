import express, { Router } from 'express'
import userController from './controllers/user.controller'
import authController from './controllers/auth.controller'
import noteController from './controllers/note.controller'
import auth from './middleware/auth'

const router: Router = express.Router()

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.get('/users/me', auth, userController.getUser)
router.patch('/users/me', auth, userController.updatePasswordUser)
router.delete('/users/me', auth, userController.deleteUser)

router.get('/notes', auth, noteController.getAllNotes)
router.post('/notes', auth, noteController.createNote)

router.get('/notes/:id', auth, noteController.getNote)
router.put('/notes/:id', auth, noteController.updateNote)
router.patch('/notes/:id', auth, noteController.toggleCheckNote)
router.delete('/notes/:id', auth, noteController.deleteNote)

export default router
