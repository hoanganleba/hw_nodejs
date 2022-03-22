import express  from 'express'

const getAllNotes = (req: express.Request, res: express.Response) => {}

const getNote = (req: express.Request, res: express.Response) => {}

const createNote = (req: express.Request, res: express.Response) => {}

const updateNote = (req: express.Request, res: express.Response) => {}

const toggleCheckNote = (req: express.Request, res: express.Response) => {}

const deleteNote = (req: express.Request, res: express.Response) => {}

export default {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  toggleCheckNote,
}
