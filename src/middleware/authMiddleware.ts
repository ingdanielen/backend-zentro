import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { validationMessages } from '../constants/validationMessages';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Extender la interfaz Request para incluir el usuario
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: string;
      }
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: validationMessages.common.unauthorized,
      data: null,
      errors: [{
        field: 'token',
        message: 'Token no proporcionado'
      }]
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
      role: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: validationMessages.common.forbidden,
      data: null,
      errors: [{
        field: 'token',
        message: 'Token inválido o expirado'
      }]
    });
  }
};

// Middleware para verificar si el usuario es administrador
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: validationMessages.common.forbidden,
      data: null,
      errors: [{
        field: 'role',
        message: 'Se requieren privilegios de administrador'
      }]
    });
  }
  next();
}; 