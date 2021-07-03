import { Request, Response } from 'express';

import AuthService from '../services/AuthService';

class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;
    const authService = new AuthService();

    try{
      const user = await authService.authenticate({ email, password });

      return res.json(user);
    } catch(err){
      return res.status(401).json({ message: err.message });
    }
  }
}

export default new AuthController();