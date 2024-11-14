import { Injectable } from '@nestjs/common';
import { authPayloadDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const dummyUsers = [
  {
    id: 1,
    username: 'test1',
    password: 'testUser1',
  },
  {
    id: 2,
    username: 'test2',
    password: 'testUser2',
  },
];
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  validateUser({ username, password }: authPayloadDTO) {
    const findUser = dummyUsers.find((user) => user.username === username);
    if (!findUser) return null;
    if (findUser.password === password) {
      const { password, ...rest } = findUser;
      return this.jwtService.sign(rest);
    }
  }
}
