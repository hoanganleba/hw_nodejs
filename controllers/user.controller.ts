import express from 'express'
import User from '../models/user.model'
import { validatePassword, generateHashPassword } from '../utils/password'

const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const user = await User.findOne({ _id: res.locals.decoded.id })
    res.status(200).send({ user })
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' })
  }
}

const updatePasswordUser = async (req: express.Request, res: express.Response) => {
  try {
    const { oldPassword, newPassword } = req.body
    const user = await User.findOne({ _id: res.locals.decoded.id })
    const validatePasswordResult: boolean | unknown = await validatePassword(
      oldPassword,
      user.password
    )

    if (!validatePasswordResult) {
      return res.status(400).send({ message: 'Invalid password' })
    }

    let newHashPassword = await generateHashPassword(newPassword)
    await User.updateOne(
      {
        _id: res.locals.decoded.id,
      },
      { password: newHashPassword }
    )

    res.status(200).send({ message: 'Success' })
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' })
  }
}

const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    await User.deleteOne({ _id: res.locals.decoded.id })
    res.status(200).send({ message: 'Success' })
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' })
  }
}

export default { getUser, updatePasswordUser, deleteUser }
