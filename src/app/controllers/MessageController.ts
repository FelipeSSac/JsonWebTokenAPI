import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Message from '../entities/Message';

import jwt from 'jsonwebtoken';
import { ITokenPayload }from '../middlewares/authMiddleware';

class MessageController {
  async list(req: Request, res: Response){
    const repository = getRepository(Message);
    const messages = await repository.find({
      relations: ["user"],
    }); 

    messages.forEach(message =>{
      delete message.user.password;
    })

    return res.status(200).json(messages);
  }

  async store(req: Request, res: Response){
    const repository = getRepository(Message);

    const { text } = req.body;
    const { authorization } = req.headers;

    const token = authorization.replace('Bearer', '').trim();
    let user_id;

    try {
      const data = jwt.verify(token, process.env.JWT_ENCRYPT);
      const { id } = data as ITokenPayload;
      user_id = id;

    } catch {
      return res.sendStatus(401);
    }

    let message = repository.create({ text, user_id });
    await repository.save(message);

    return res.status(201).send(message);
  } 
}

export default new MessageController();