import { Module } from '@nestjs/common';
import { UsersModule } from './modules/user/users.module';
import { DBConfigModule } from './database/config';

@Module({
  imports: [UsersModule, DBConfigModule],
})
export class AppModule {}