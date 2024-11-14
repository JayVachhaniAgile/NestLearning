import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthMongoService } from './auth-mongo.service';
import { SignUpDTO } from './dto/authMongo.signUp.dto';
import { SignInDTO } from './dto/authMongo.signIn.dto';

@Controller('auth-mongo')
export class AuthMongoController {
  constructor(private readonly authMongoService: AuthMongoService) {}
  @Post('signUp')
  async signUpUser(@Body() userDetails: SignUpDTO): Promise<{ token: string }> {
    const user = await this.authMongoService.signUp(userDetails);
    return user;
  }
  @Post('signIn')
  async signInUser(@Body() userDetails: SignInDTO): Promise<{ token: string }> {
    const user = await this.authMongoService.signIn(userDetails);
    if (!user) throw new NotFoundException();
    return user;
  }
  @Get('allUsers')
  async allUsers() {
    return this.authMongoService.getAllUsers();
  }
  @Get('findUser/:id')
  async findUser(@Param('id') id: string) {
    return this.authMongoService.getUserById(id);
  }
  @Patch('updateUser/:id')
  async updateUser(@Param('id') id: string, @Body() userDetails: any) {
    return this.authMongoService.updateUser(id, userDetails);
  }
  @Delete('deleteUser/:id')
  async deleteUser(@Param('id') id: string) {
    return this.authMongoService.deleteUser(id);
  }
}
