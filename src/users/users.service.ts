import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(
    data: Pick<User, 'email' | 'firstName' | 'lastName'>,
  ): Promise<UserDocument> {
    const user = new this.userModel({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      isActive: true,
    });
    return user.save();
  }

  async update(
    id: string,
    data: Partial<Pick<User, 'email' | 'firstName' | 'lastName' | 'isActive'>>,
  ): Promise<UserDocument> {
    const user = await this.userModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
