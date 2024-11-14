import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDetails } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO } from './dto/authMongo.signUp.dto';
import { SignInDTO } from './dto/authMongo.signIn.dto';

@Injectable()
export class AuthMongoService {
  constructor(
    @InjectModel(UserDetails.name)
    private readonly userModal: Model<UserDetails>,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(signUpDto: SignUpDTO): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashedPassword: ', hashedPassword);
    const user = await this.userModal.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log('user: ', user);
    const token = this.jwtService.sign({
      id: user._id,
      name: user.name,
    });
    console.log('token: ', token);
    return { token };
  }

  async signIn(signInDto: SignInDTO): Promise<{ token: string }> {
    const { email, password } = signInDto;
    const findUser = await this.userModal.findOne({ email });
    if (!findUser) throw new NotFoundException();
    const passwordCompare = await bcrypt.compare(password, findUser.password);
    if (!passwordCompare)
      throw new UnauthorizedException('Email or Password not matching!!');
    const token = this.jwtService.sign({ id: findUser._id });
    return { token };
  }

  async getAllUsers(): Promise<UserDetails[]> {
    const allUsers = await this.userModal.find();
    return allUsers;
  }
  async getUserById(id: string): Promise<UserDetails> {
    const findUser = await this.userModal.findOne({ _id: id });
    if (!findUser) throw new NotFoundException();
    return findUser;
  }
  async updateUser(id: string, updateDetails: SignUpDTO): Promise<UserDetails> {
    return this.userModal.findByIdAndUpdate(id, updateDetails);
  }
  async deleteUser(id: string): Promise<UserDetails> {
    return this.userModal.findByIdAndDelete(id);
  }
}
