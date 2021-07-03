import { getRepository, Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import TokenHandler from '../assets/Token';

import User from '../entities/User';


interface IUser {
  email: string;
  password: string;
}

class AuthService {
  private authRepository: Repository<User>

  constructor() {
    this.authRepository = getRepository(User);
  }

  async authenticate({email, password}: IUser) {
    const user = await this.authRepository.findOne({ where: { email }})
    const tokenHandler = new TokenHandler();

    if(!user) {
      throw new Error('User not found!')
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword) {
      throw new Error('Invalid password!')
    }

    const token = tokenHandler.encrypt( user.id, email );

    delete user.password;
    delete user.is_deleted;

    return {
      user,
      token,
    };
  }
}

export default AuthService;