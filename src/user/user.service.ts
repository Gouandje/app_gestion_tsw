import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { DeleteUserResponse } from './dto/delete-response.dto';
import { randomUUID } from 'crypto';
import * as crypto from 'crypto';
import { UserUpdate } from './dto/user-update.dto';

@Injectable()
export class UserService {
  
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    // private readonly httpService: HttpService,
    ) {}


    async findByCredentials(
      emailAddress: string,
      mot_de_passe: string,
    ): Promise<User> {
      const conditions = {
        email: emailAddress,
        mot_de_passe: crypto.createHmac('sha256', mot_de_passe).digest('hex'),
      };
      return await this.userModel.findOne(conditions);
    }


    async create(createUserDto: CreateUserDto): Promise<User> {
      const alreadyExists = await this.userModel.exists({ email: createUserDto.email }).lean();
      if(alreadyExists){
        throw new ConflictException(`un administrateur avec cet email existes déjà`);
      }
      const passwordHash = crypto.createHmac('sha256', createUserDto.mot_de_passe).digest('hex');
      const createdUser = { ...createUserDto, adminId: randomUUID(), mot_de_passe: passwordHash };
      return this.userModel.create(createdUser);
    }

  async findAll(): Promise<User[]> {
     const users = await this.userModel.find().exec();
    //  console.log(users);
     return users;
  }

  async findByEmail(email: string){
    const user = await this.userModel.findOne({ email }).lean();
    
    // console.log('ici admin apr email',user);
    if (!user) {
      throw new NotFoundException(`L'administrateur n'existe pas ${email}`);
    }
    return user;
  }

  async findRoleByEmail(emailAddress: string): Promise<any> {
    const conditions = {
      email: emailAddress,
    };
    const userObject = await this.userModel.findOne(conditions);

    return userObject;
  }

  public getOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id });
  }

  // async findByEmail(email: string, mot_de_passe:string): Promise<User> {
  //   const user = await this.userModel.findOne({ email, mot_de_passe }).le;
  //   console.log('ici',user);
  //   if (!user) {
  //     throw new NotFoundException(`L'administrateur n'existe pas ${email}`);
  //   }
  //   return user;
  // }

  async getUser({ email, mot_de_passe }): Promise<User | undefined> {
    return this.userModel.findOne({
      email,
      mot_de_passe,
    });
  }

  async  updateById(adminId: string, userUpdates: UserUpdate){
    console.log('userUpdates',userUpdates);
    const user = await this.userModel.findById(adminId).exec();
    if(userUpdates.mot_de_passe == null){
      userUpdates.mot_de_passe = user.mot_de_passe;
    }else{
      userUpdates.mot_de_passe = crypto.createHmac('sha256', userUpdates.mot_de_passe).digest('hex');
    }

    return this.userModel
      .findOneAndUpdate({ _id: adminId }, userUpdates, {
        new: true,
      })
      .lean();
  }

  async findById(adminId: string): Promise<User> {
    const user = await this.userModel.findById(adminId).populate('countryId');
    if (!user) {
      throw new NotFoundException(`No existe user id ${adminId}`);
    }
    return user;
  }

  async remove(adminId: string): Promise<DeleteUserResponse> {
    return this.userModel.findByIdAndDelete(adminId).lean();
  }

  async updatePassword(adminId, param: any){
    const user= await this.userModel.findOne({adminId: adminId}).exec();
    if(user !=null){
      const result = await this.userModel.findByIdAndUpdate({_id: adminId}, {mot_de_passe: param.mot_de_passe}, {new: true}).lean();
      console.log(param.mot_de_passe);
      return result;
    }
    return;
  }

  async uploadAvatar(
    avatar: string,
    adminId: string,
  ): Promise<any> {
    const user = await this.userModel.findOne({_id:adminId});
    if (!user) {
      throw 'Administateur non trouvé';
    }

    const updated = await this.userModel.updateOne({_id: adminId},{avatar: avatar}).lean();
    console.log(updated);
    return user;
  }

  async userbackup(){
    return await this.userModel.find().exec();
  }
}
