import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../entities/User';

class AuthController {
  async authenticate(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password } = req.body;

    const user = await repository.findOne({ where: { email } })

    if(!user){
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword) {
      return res.sendStatus(401);
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_ENCRYPT , { expiresIn: '1d' });

    delete user.password;
    
    return res.json({
      user,
      token,
    });
  }
}

export default new AuthController();