import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { Admin, IAdmin } from '../models/Admin';

export interface AuthRequest extends Request {
  user?: IUser;
  admin?: IAdmin;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as { id: string, role?: string };
      
      const user = await User.findById(decoded.id).select('-password_hash');
      if (user) {
        req.user = user;
        return next();
      }
      
      return res.status(401).json({ message: 'Not authorized, user not found' });
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const adminProtect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.cookies.adminJwt) {
    token = req.cookies.adminJwt;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as { id: string };
      const admin = await Admin.findById(decoded.id).select('-password_hash');
      if (admin && admin.is_active) {
        req.admin = admin;
        return next();
      }
      
      return res.status(401).json({ message: 'Not authorized as an admin' });
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
