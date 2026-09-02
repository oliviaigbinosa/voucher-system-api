import jwt from 'jsonwebtoken'

function getJwtSecret() {
  const JWT_SECRET = process.env.JWT_SECRET
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET must be set in environment variables')
  }
  return JWT_SECRET
}

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }

  const JWT_SECRET = getJwtSecret()
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' })
    }
    req.user = user
    next()
  })
}

export function generateToken(user) {
  const JWT_SECRET = getJwtSecret()
  return jwt.sign(
    { email: user.email, role: user.role, department: user.department },
    JWT_SECRET,
    { expiresIn: '1h' }
  )
}
