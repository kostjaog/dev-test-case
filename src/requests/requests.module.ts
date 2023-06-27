import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [RequestsController],
  providers: [RequestsService],
  imports: [PrismaModule, MailModule]
})
export class RequestsModule {}
