import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

declare module 'express' {
  export interface Request {
    user?: JwtPayload;
  }
  
  export interface Response {
    status(code: number): this;
    json(body: any): this;
    send(body: any): this;
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
    (req: Request, res: Response, next: Function): void;
  }
  
  export function Router(): Router;
  export function json(): RequestHandler;
  export function urlencoded(options: { extended: boolean }): RequestHandler;
  export default function express(): Application;
} 