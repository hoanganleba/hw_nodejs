import jwt from 'jsonwebtoken'

const generateAccessToken = (username: object) => {
  return jwt.sign(username, process.env.JWT_SECRET_KEY as string)
}

export default generateAccessToken
