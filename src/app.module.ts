import { Module } from '@nestjs/common';
import { UsersModule } from './modules/user/users.module';
import { DbConfigModule } from './database/config';

@Module({
  imports: [UsersModule, DbConfigModule],
})
export class AppModule {}
