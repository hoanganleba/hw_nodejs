import { ObjectId } from 'mongoose'

export default interface Note {
  userId: ObjectId
  completed: boolean
  text: string
}
