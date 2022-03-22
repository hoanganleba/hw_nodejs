import LoginDto from '../dtos/login.dto'
import RegisterDto from '../dtos/register.dto'
import Message from '../interfaces/message.interface'
import mongodb from '../libs/mongodb'
import { generateHashPassword, validatePassword } from '../utils/password'

export const register = async (
  registerUserInfo: RegisterDto
): Promise<Message> => {
  const { db, closeDb } = await mongodb.connect()

  if (!registerUserInfo.username || !registerUserInfo.password) {
    return Promise.resolve({
      statusCode: 400,
      message: 'Please enter username and/or password',
    })
  } else {
    let userPassword: string | unknown = registerUserInfo.password
    userPassword = await generateHashPassword(registerUserInfo.password)
    const registerUser = {
      username: registerUserInfo.username,
      password: userPassword,
    }
    await db.collection('users').insertOne(registerUser)
    await closeDb()
    return Promise.resolve({
      statusCode: 200,
      message: 'Register successfully',
    })
  }
}

export const login = async (loginUserInfo: LoginDto): Promise<Message> => {
  const { db, closeDb } = await mongodb.connect()

  let userPassword: string = loginUserInfo.password

  const user = await db
    .collection('users')
    .findOne({ username: loginUserInfo.username })

  const passwordValidateResult: boolean | unknown = await validatePassword(
    userPassword,
    user?.password
  )

  if (!user || !passwordValidateResult) {
    await closeDb()
    return Promise.resolve({
      statusCode: 400,
      message: 'Invalid username and/or password',
    })
  } else {
    await closeDb()
    return Promise.resolve({
      statusCode: 200,
      message: 'Success',
    })
  }
}
