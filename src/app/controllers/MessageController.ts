import { Request, Response } from 'express';

import MessageService from '../services/MessageService';

class MessageController {
  async list(req: Request, res: Response){
    const messageService = new MessageService();

    try {
      const messages = await messageService.list();

      return res.status(200).json(messages);
    } catch {
      return res.sendStatus(400);
    }
  }

  async create(req: Request, res: Response){
    const messageService = new MessageService();

    const { text } = req.body;
    const { authorization } = req.headers;
    
    try {
      const message = messageService.create({ text, authorization });

      return res.status(200).json((await message));
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  }
  
  async update(req: Request, res: Response) {
    const messageService = new MessageService();

    const { id, text } = req.body;

    try {
      const message = await messageService.update({ id, text })

      return res.status(202).json(message)
    } catch (err) {
      return res.status(409).json({ message: err.message })
    }
  }

  async delete(req: Request, res: Response) {
    const messageService = new MessageService();

    const { id } = req.body;

    try {
      const message = await messageService.delete(id)

      return res.status(202).json(message)
    } catch (err) {
      return res.status(409).json({ message: err.message })
    }
  }
}

export default new MessageController();