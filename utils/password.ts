import bcrypt from 'bcrypt'

export const generateHashPassword = async (plainPassword: string): Promise<boolean | unknown> => {
  try {
    return await bcrypt.hash(plainPassword, 10)
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
