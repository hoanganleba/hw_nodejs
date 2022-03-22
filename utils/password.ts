import bcrypt from 'bcrypt'
const saltRounds = 20

export const generateHashPassword = async (plainPassword: string): Promise<boolean | unknown> => {
  try {
    return await bcrypt.hash(plainPassword, saltRounds)
  } catch (err) {
    return err
  }
}

export const validatePassword = async (plainPassword: string, hash: string): Promise<boolean | unknown> => {
  try {
    return await bcrypt.compare(plainPassword, hash)
  } catch (err) {
    return err
  }
}
