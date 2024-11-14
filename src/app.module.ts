import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthMongoModule } from './auth-mongo/auth-mongo.module';

@Module({
  imports: [AuthModule, AuthMongoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
