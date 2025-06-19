import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Token de acesso requerido'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'dev_secret', (err: any, user: any) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: 'Token inválido'
      });
    }

    req.user = user;
    next();
  });
}

export function optionalAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET || 'dev_secret', (err: any, user: any) => {
      if (!err) {
        req.user = user;
      }
    });
  }

  next();
}

