import express from 'express'
import User from '../models/user.model'
import { generateHashPassword, validatePassword } from '../utils/password'
import generateAccessToken from '../utils/generateAccessToken'

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const user: any = await User.findOne({ username: req.body.username })
    if (!user) {
      return res
        .status(400)
        .send({ message: 'Invalid username and/or password' })
    }

    const validatePasswordResult: boolean | unknown = await validatePassword(
      req.body.password,
      user.password
    )

    if (!validatePasswordResult) {
      return res
        .status(400)
        .send({ message: 'Invalid username and/or password' })
    }

    const token = generateAccessToken({ id: user._id, username: req.body.username })
    res.status(200).send({ message: 'Success', token })
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' })
  }
}

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const user = {
      username: req.body.username,
      password: await generateHashPassword(req.body.password),
    }
    const newUser = new User(user)
    await newUser.save()
    res.status(200).send({ message: 'Success' })
  } catch {
    res.status(500).send({ message: 'Internal server error' })
  }
}

export default { register, login }
