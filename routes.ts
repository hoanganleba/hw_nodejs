import express, { Router } from 'express'
import userController from './controllers/user.controller'
import authController from './controllers/auth.controller'
import noteController from './controllers/note.controller'

const router: Router = express.Router()

router.get('/users/me', userController.getUser)
router.patch('/users/me', userController.patchUser)
router.delete('/users/me', userController.deleteUser)

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.get('/notes', noteController.getAllNotes)
router.post('/notes', noteController.createNote)

router.get('/notes/:id', noteController.getNote)
router.put('/notes/:id', noteController.updateNote)
router.patch('/notes/:id', noteController.toggleCheckNote)
router.delete('/notes/:id', noteController.deleteNote)

export default router