import express from 'express'
import mongoose from 'mongoose'
import Note from '../models/note.model'

const getAllNotes = async (req: express.Request, res: express.Response) => {
  try {
    const notes = await Note.find(
      {
        userId: new mongoose.Types.ObjectId(res.locals.decoded.id),
      },
      null,
      { limit: (req.query.limit as any) || 0 }
    )
    res.status(200).send({ notes })
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' })
  }
}

const getNote = (req: express.Request, res: express.Response) => {
  try {
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' })
  }
}

const createNote = async (req: express.Request, res: express.Response) => {
  try {
    const newNote = new Note({
      userId: new mongoose.Types.ObjectId(res.locals.decoded.id),
      text: req.body.text,
    })
    await newNote.save()
    res.status(200).send({ message: 'Success' })
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' })
  }
}

const updateNote = async (req: express.Request, res: express.Response) => {
  try {
    await Note.updateOne(
      {
        _id: req.params.id,
      },
      {
        text: req.body.text,
      }
    )
    res.status(200).send({ message: 'Success' })
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' })
  }
}

const toggleCheckNote = async (req: express.Request, res: express.Response) => {
  try {
    const note = await Note.findOne({ _id: req.params.id })
    note.completed = !note.completed
    await Note.updateOne(
      {
        _id: req.params.id,
      },
      { completed: note.completed }
    )
    res.status(200).send({ message: 'Success' })
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' })
  }
}

const deleteNote = async (req: express.Request, res: express.Response) => {
  try {
    await Note.deleteOne({ _id: req.params.id })
    res.status(200).send({ message: 'Success' })
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' })
  }
}

export default {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  toggleCheckNote,
}
