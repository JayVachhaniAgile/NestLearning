import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDTO {
  @IsEmail({}, { message: 'Please enter valid Email!' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password should be more than 8 chars' })
  password: string;
}
