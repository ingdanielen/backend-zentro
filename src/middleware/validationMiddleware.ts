import { Request, Response, NextFunction } from 'express';
import { validationMessages } from '../constants/validationMessages';

interface ValidationError {
  field: string;
  message: string;
}

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const errors: ValidationError[] = [];
  const { email, password } = req.body;

  if (!email) {
    errors.push({
      field: 'email',
      message: validationMessages.auth.email.required
    });
  } else if (!isValidEmail(email)) {
    errors.push({
      field: 'email',
      message: validationMessages.auth.email.invalid
    });
  }

  if (!password) {
    errors.push({
      field: 'password',
      message: validationMessages.auth.password.required
    });
  } else if (password.length < 6) {
    errors.push({
      field: 'password',
      message: validationMessages.auth.password.minLength
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      data: null,
      errors
    });
  }

  next();
};

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  const errors: ValidationError[] = [];
  const { name, price, stock } = req.body;

  if (!name) {
    errors.push({
      field: 'name',
      message: validationMessages.product.name.required
    });
  } else if (name.length < 3) {
    errors.push({
      field: 'name',
      message: validationMessages.product.name.minLength
    });
  }

  if (!price) {
    errors.push({
      field: 'price',
      message: validationMessages.product.price.required
    });
  } else if (isNaN(Number(price)) || Number(price) <= 0) {
    errors.push({
      field: 'price',
      message: validationMessages.product.price.min
    });
  }

  if (!stock) {
    errors.push({
      field: 'stock',
      message: validationMessages.product.stock.required
    });
  } else if (isNaN(Number(stock)) || Number(stock) < 0) {
    errors.push({
      field: 'stock',
      message: validationMessages.product.stock.min
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      data: null,
      errors
    });
  }

  next();
};

// Helper function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
} 