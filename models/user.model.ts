import mongoose from 'mongoose'
import User from '../interfaces/user.interface'

const userSchema = new mongoose.Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

export default mongoose.models.users ||
  mongoose.model<User>('users', userSchema)

userSchema.pre('deleteOne', (next) => {
  const user = this
  ;(user as any).model('notes').deleteMany({ userId: (user as any)._id }, next)
})
