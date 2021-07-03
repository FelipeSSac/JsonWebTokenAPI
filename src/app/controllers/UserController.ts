import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../entities/User';

class UserController {
  async create(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password } = req.body;

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return res.sendStatus(409);
    }

    const user = repository.create({ email, password });
    await repository.save(user);

    return res.status(201).json(user);
}

  async list(req: Request, res: Response) {
      const repository = getRepository(User);

      const users = await repository.find({ where: {'is_deleted': false}});

      users.forEach(user => {

        delete user.is_deleted;
        delete user.password;
        
      })

      return res.status(200).json(users);
  }

  async update(req: Request, res: Response) {
    //req.body = { email, newPassword as password }
    const repository = getRepository(User);
    const { email } = req.body;

    const user = await repository.findOne({ where: { email, 'is_deleted': false} });

    if(!user) {
      return res.sendStatus(401)
    }

    repository.merge(user, req.body);
    await repository.save(user);

    return res.status(202).json(user);
  }

  async delete(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email } = req.body;

    const user = await repository.findOne({ where: { email } });

    if(!user) {
      return res.sendStatus(401)
    }

    if(user.is_deleted === true ){
      return res.sendStatus(208)
    }
    
    repository.merge(user, {is_deleted : true});
    await repository.save(user);

    return res.sendStatus(202);
  }
}

export default new UserController();