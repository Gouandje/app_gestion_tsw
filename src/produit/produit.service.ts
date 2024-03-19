import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Products, ProductsDocument } from './schemas/products.shema';
import { Model, Schema as MongooseSchema } from 'mongoose';


@Injectable()
export class ProduitService {
  constructor(
    @InjectModel(Products.name) private readonly productModel: Model<ProductsDocument>,
  ) {}

  async create(createProduitDto: CreateProduitDto): Promise<Products>{
    const alreadyExists = await this.productModel.exists({ name: createProduitDto.name }).lean();
    if(alreadyExists){
      throw new ConflictException(`cet produit existe déjà dans la base de données`);
    }
    const createdProduct = await this.productModel.create(createProduitDto);

    if (!createdProduct) {
      throw new InternalServerErrorException(
        'Impossible de créer le produit, veuillez réessayer',
      );
    }
    return createdProduct;
  }

  async findAll(): Promise<Products[]> {
    const products = await this.productModel.find().sort({updated: 'asc'}).exec();
    return products;
  }

  async findOne(productId:string){
    const product = await this.productModel.findById(productId);

    if (!product) {
      throw new NotFoundException('Produit non trouvé');
    }
    return product;
  }

  async update(productId: string, updateProduitDto: UpdateProduitDto) {
    const product = await this.findOne(productId);
    const updateData = {
      name: updateProduitDto.name,
      price: updateProduitDto.price,
      disponibilite: updateProduitDto.disponibilite,
      updated: Date.now()
    }

    const updatedProduct = this.productModel.findOneAndUpdate({_id: productId }, {$set: updateData}, {
      new: true,
    }).exec();


    return updatedProduct;
  }


  async remove(productId: string) {
    await this.productModel.findByIdAndRemove(productId).catch((err) => {
      throw new BadRequestException(`une erreur c'est produite lors de la suppression`);
    });

    return `Produit supprimé avec succès`;
  }

  async productsbackup(){
    return await this.productModel.find().exec();
  }
}
