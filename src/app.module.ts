import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ArticlesModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URI ?? 'mongodb://localhost:27017/cms-nestjs',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
