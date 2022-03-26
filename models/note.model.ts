import mongoose, { Schema } from 'mongoose'
import Note from '../interfaces/note.interface'

const noteSchema = new mongoose.Schema<Note>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    completed: { type: Boolean, default: false },
    text: { type: String },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

export default mongoose.models.notes ||
  mongoose.model<Note>('notes', noteSchema)
