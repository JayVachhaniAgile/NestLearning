import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class UserDetails {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'This email is already in use, Please use another'] })
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDetails);
