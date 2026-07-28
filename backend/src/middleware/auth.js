import jwt from 'jsonwebtoken';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret === 'CHANGE_ME_to_a_64_char_random_string') {
    throw new Error('JWT_SECRET is not configured. Set it in backend/.env');
  }
  return secret;
}

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  try {
    const token = header.slice(7);
    req.admin = jwt.verify(token, getJwtSecret());
    next();
  } catch (err) {
    if (err.message?.includes('JWT_SECRET')) {
      return res.status(500).json({ error: 'Server auth misconfigured' });
    }
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export function signToken(admin) {
  return jwt.sign(
    { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
    getJwtSecret(),
    { expiresIn: '7d' }
  );
}
