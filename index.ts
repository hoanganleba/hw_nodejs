import mongoose from 'mongoose'
import app from './app'
const PORT: number = 8080

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Listening on port:', PORT)
    })
  })
