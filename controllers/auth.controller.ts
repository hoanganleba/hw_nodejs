import express from 'express'
import {
  register as registerService,
  login as loginService,
} from '../services/auth.service'

export const login = async (req: express.Request, res: express.Response) => {
  const { statusCode, message } = await loginService(req.body)
  return res.status(statusCode).send({ message: message })
}

export const register = async (req: express.Request, res: express.Response) => {
  const { statusCode, message } = await registerService(req.body)
  return res.status(statusCode).send({ message: message })
}

export default { register, login }
