import { getRepository, Repository } from 'typeorm';
import TokenHandler from '../assets/Token';

import Message from '../entities/Message';

interface IMessage {
  id?: string;
  text: string;
  authorization?: string;
}

class MessageService {
  private messageRepository: Repository<Message>;

  constructor() {
    this.messageRepository = getRepository(Message);
  }

  async list(){
    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.user', 'user')
      .orderBy('created_at', 'ASC')
      .getMany();

    messages.forEach(message =>{
      delete message.user.password;
    })

    return messages
  }

  async create({ text, authorization }: IMessage){
    const tokenHandler = new TokenHandler();

    try {
      const { id } = tokenHandler.decrypt(authorization);

      const message = this.messageRepository.create({ text, 'user_id': id });
      await this.messageRepository.save(message);

      return message;
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async update({ id, text }: IMessage){
    const message = await this.messageRepository.findOne(id);

    if(!message) {
      throw new Error("Deleted Message!");
    }

    this.messageRepository.merge(message, { text });
    await this.messageRepository.save(message);

    return message;
  }

  async delete(id: string){
    const message = await this.messageRepository.findOne(id);

    if(!message) {
      throw new Error("Deleted Message!");
    }

    this.messageRepository.remove(message);

    return message;
  }
}

export default MessageService;