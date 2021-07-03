import { Request, Response, NextFunction } from 'express';
import TokenHandler from '../assets/Token';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const tokenHandler = new TokenHandler();

  if (!authorization){
    return res.sendStatus(401);
  }

  try {
    tokenHandler.decrypt(authorization);

    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
}