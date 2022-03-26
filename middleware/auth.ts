import express from 'express'
import jwt from 'jsonwebtoken'

const auth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res.status(401).send({ message: 'No access token found' })
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err: any, decoded: any) => {
    if (err) return res.send(403).send({ message: 'Error' })
    if (decoded) {
      res.locals.decoded = decoded
      console.log(decoded)
    }
    next()
  })
}

export default auth
