import {
    ConflictException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { InjectModel } from '@nestjs/mongoose';
  import * as bcrypt from 'bcrypt';
  import { Model } from 'mongoose';
  import { UserDocument } from 'src/models/user.schema';
  import { UsersService } from 'src/users/users.service';
  import { Auth, AuthDocument } from 'src/models/auth.schema';
  const SALT_ROUNDS = 10;
  
  @Injectable()
  export class AuthService {
    constructor(
      @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
      private readonly userService: UsersService,
      private readonly jwtService: JwtService,
    ) {}
  
    async register(data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }){
      const existingCredential = await this.authModel
        .findOne({ email: data.email })
        .exec();
  
      if (existingCredential) {
        throw new ConflictException('Email already used');
      }
  
      const user = await this.userService.create({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });
  
      const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
  
      await this.authModel.create({
        //userId: user._id,
        email: data.email,
        password: hashedPassword,
      });
  
      return {
        accessToken: await this.signToken(user),
        user,
      };
    }
  
    async login(data: {
      email: string;
      password: string;
    }) {
      const credential = await this.authModel
        .findOne({ email: data.email })
        .exec();
  
      if (
        !credential ||
        !(await bcrypt.compare(data.password, credential.password))
      ) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      const user = await this.userService.findOne(credential.userId.toString());
  
      return {
       accessToken: await this.signToken(user),
       user,
      };
    }
  
    private async signToken(user: UserDocument): Promise<string> {
      return this.jwtService.signAsync({
        sub: user._id.toString(),
        email: user.email,
      });
    }
  }
  