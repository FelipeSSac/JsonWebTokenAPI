import jwt from 'jsonwebtoken';

interface ITokenPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

class TokenHandler {
  encrypt(id: string, email: string){
    return jwt.sign({ id, email }, process.env.JWT_ID , { expiresIn: '1d' });
  }

  decrypt(authorization: string){
    const token = authorization.replace('Bearer', '').trim();

    try {
      const data = jwt.verify(token, process.env.JWT_ID);
      const { id, email } = data as ITokenPayload;

      return { id, email };
    } catch {
      throw new Error('Invalid Token!')
    }
  }
}

export default TokenHandler;