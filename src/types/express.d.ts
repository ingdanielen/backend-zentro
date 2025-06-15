import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: string;
      };
      body: any;
      params: any;
      query: any;
      headers: any;
    }

    interface Response {
      status(code: number): this;
      json(body: any): this;
      send(body: any): this;
    }

    interface NextFunction {
      (err?: any): void;
    }
  }
}

declare module 'express' {
  export interface Request {
    user?: {
      userId: string;
      email: string;
      role: string;
    };
    body: any;
    params: any;
    query: any;
    headers: any;
  }
  
  export interface Response {
    status(code: number): this;
    json(body: any): this;
    send(body: any): this;
  }
  
  export interface NextFunction {
    (err?: any): void;
  }
  
  export interface Application {
    use: any;
    listen: any;
    get: any;
    post: any;
    put: any;
    delete: any;
    patch: any;
  }
  
  export interface Router {
    get: any;
    post: any;
    put: any;
    delete: any;
    patch: any;
    use: any;
  }
  
  export interface RequestHandler {
    (req: Request, res: Response, next: NextFunction): void;
  }
  
  export function Router(): Router;
  export function json(): RequestHandler;
  export function urlencoded(options: { extended: boolean }): RequestHandler;
  export default function express(): Application;
} 