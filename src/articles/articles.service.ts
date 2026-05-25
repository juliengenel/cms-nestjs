import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from '../models/article.interface';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = new this.articleModel(createArticleDto);
    return article.save();
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleModel.findById(id).exec();
    if (!article) {
      throw new NotFoundException(`Article #${id} not found`);
    }
    return article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto): Promise<Article> {
    const article = await this.articleModel
      .findByIdAndUpdate(
        id,
        { ...updateArticleDto, updatedAt: new Date() },
        { new: true },
      )
      .exec();
    if (!article) {
      throw new NotFoundException(`Article #${id} not found`);
    }
    return article;
  }

  async remove(id: string): Promise<Article> {
    const article = await this.articleModel.findByIdAndDelete(id).exec();
    if (!article) {
      throw new NotFoundException(`Article #${id} not found`);
    }
    return article;
  }
}
