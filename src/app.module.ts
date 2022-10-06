import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { FeedbackModule } from './feedback/feedback.module';
import { PartnersModule } from './partners/partners.module';
import { ConfigModule } from '@nestjs/config';
import { EchoModule } from './echo/echo.module';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import { RequestModule } from './request/request.module';
import { ChapterModule } from './chapter/chapter.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule, PartnersModule, 
    FeedbackModule, EchoModule,
    NewsModule, AuthModule,
    RequestModule, ChapterModule
  ],
  providers: [],
})
export class AppModule {}
