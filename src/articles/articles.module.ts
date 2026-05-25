import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from '../models/article.schema';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [MongooseModule, ArticlesService],
})
export class ArticlesModule {}
