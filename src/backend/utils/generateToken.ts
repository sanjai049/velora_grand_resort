import jwt from 'jsonwebtoken';
import { Response } from 'express';

export const generateToken = (res: Response, id: string, isAdmin = false) => {
  const token = jwt.sign({ id, role: isAdmin ? 'admin' : 'user' }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });

  const cookieName = isAdmin ? 'adminJwt' : 'jwt';

  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  
  return token;
};
