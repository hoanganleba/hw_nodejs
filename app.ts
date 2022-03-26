import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import routes from './routes'
import 'dotenv/config'

const app: Application = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use('/api', routes)

export default app
