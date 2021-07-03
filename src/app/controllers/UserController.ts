import { Request, Response } from 'express';

import UserService from '../services/UserService';

class UserController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;
    const userService = new UserService();
    
    try{
      const user = await userService.create({email, password});

      res.status(201).json(user);
    } catch (err) {
      res.status(409).json({ message: err.message })
    }
}

  async list(req: Request, res: Response) {
      const userService = new UserService();

      try {
        const users = await userService.list();

        res.status(200).json(users);
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
  }

  async update(req: Request, res: Response) {
    const { email, password } = req.body;
    const userService = new UserService();
    
    try {
      const user = await userService.update({ email, password });

      return res.status(202).json(user);
    } catch (err) {
      return res.status(409).json({ message: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    const { email, password } = req.body;
    const userService = new UserService();

    try {
      const user = await userService.delete(email);

      return res.status(202).json(user)
    } catch (err) {
      return res.status(409).json({ message: err.message })
    }
  }
}

export default new UserController();