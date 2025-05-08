export const validationMessages = {
  auth: {
    email: {
      required: 'El correo electrónico es requerido',
      invalid: 'El correo electrónico no es válido',
      exists: 'Este correo electrónico ya está registrado'
    },
    password: {
      required: 'La contraseña es requerida',
      minLength: 'La contraseña debe tener al menos 6 caracteres',
      invalid: 'La contraseña no es válida'
    },
    name: {
      required: 'El nombre es requerido',
      minLength: 'El nombre debe tener al menos 2 caracteres'
    }
  },
  product: {
    name: {
      required: 'El nombre del producto es requerido',
      minLength: 'El nombre debe tener al menos 3 caracteres'
    },
    price: {
      required: 'El precio es requerido',
      invalid: 'El precio debe ser un número válido',
      min: 'El precio debe ser mayor a 0'
    },
    stock: {
      required: 'El stock es requerido',
      invalid: 'El stock debe ser un número válido',
      min: 'El stock debe ser mayor o igual a 0'
    }
  },
  common: {
    required: 'Este campo es requerido',
    invalid: 'Valor inválido',
    serverError: 'Error en el servidor',
    unauthorized: 'No autorizado',
    forbidden: 'Acceso denegado'
  }
}; 