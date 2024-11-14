import { PartialType } from '@nestjs/mapped-types';
import { SignUpDTO } from './authMongo.signUp.dto';

export class UpdateUserDTO extends PartialType(SignUpDTO) {}
