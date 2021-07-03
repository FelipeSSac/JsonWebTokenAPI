import { getRepository, Repository } from 'typeorm';

import bcrypt from 'bcryptjs';

import User from '../entities/User';

interface IUser {
  email: string;
  password: string;
}

class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  async create({ email, password }: IUser) {
    const userExists = await this.userRepository.findOne({ email });

    if(userExists) {
      throw new Error("User already exists!");
    }

    const user = this.userRepository.create({ email, password });
    await this.userRepository.save(user);

    delete user.password;

    return user;
  }

  async list() {
    const users = await this.userRepository.find({ where: {'is_deleted': false}});

    users.forEach(user => {

      delete user.is_deleted;
      delete user.password;
      
    })

    return users;
  }

  async update({ email, password }: IUser){
    const user = await this.userRepository.findOne({ where: { email, 'is_deleted': false }});

    if(!user) {
      throw new Error("User nonexistent!");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(isValidPassword) {
      throw new Error("Password already in use!");
    }

    this.userRepository.merge(user, { email, password });
    await this.userRepository.save(user);

    delete user.password;

    return user;
  }

  async delete(email: string) {
    const user = await this.userRepository.findOne({ where: { email }});

    if(!user) {
      throw new Error("User Nonexistent!");
    }

    if(user.is_deleted){
      throw new Error("User Already Deleted!");
    }
    
    this.userRepository.merge(user, {is_deleted : true});
    await this.userRepository.save(user);

    delete user.password;

    return user;
  }
}

export default UserService;