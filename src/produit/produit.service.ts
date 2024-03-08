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

  async createDirec(){
    const data = [
      {
          
          "name": "GOBELET",
          "price": 25000,
          "disponibilite": "Oui",
         
        },
        {
          
          "name": "Disk P Pyramid",
          "price": 35000,
          "disponibilite": "Oui",
          "codeColor": "green"
        },
        {
         
          "name": "Lunettes",
          "price": 40000,
          "disponibilite": "Oui",
          "codeColor": "blue"
        },
        {

          "name": "Roll Therapy",
          "price": 60000,
          "disponibilite": "Oui",
          "codeColor": "yellow"
        },
        {

          "name": "Ceinture",
          "price": 50000,
          "disponibilite": "Oui",
          "codeColor": "red"

        },
        {

          "name": "Twist and Slim",
          "price": 40000,
          "disponibilite": "Oui",
          "codeColor": "orange"
        },
        {
          
          "name": "Oroki",
          "price": 15000,
          "disponibilite": "Oui",
          "codeColor": "pink"
        },
        {
          
          "name": "Thé Vert",
          "price": 10000,
          "disponibilite": "Oui",
          "codeColor": "magenta"
        },
        {
         
          "name": "Thé Rouge",
          "price": 10000,
          "disponibilite": "Oui",
          "codeColor": "mauve"
        },
        {
         
          "name": "Thé Minceur",
          "price": 10000,
          "disponibilite": "Oui",
          "codeColor": "violet",
        },
        {
          
          "name": "Easy Slim",
          "price": 10000,
          "disponibilite": "Oui",
          "codeColor": "purple",
        
        },
        {
          
          "name": "Acné Soap",
          "price": 5000,
          "disponibilite": "Oui",
          "codeColor": "grey"
        },
        {
         
          "name": "Savon Randy",
          "price": 10000,
          "disponibilite": "Oui",
          "codeColor": "brown"
        },
        {
          
          "name": "Sweet Lady",
          "price": 6000,
          "disponibilite": "Oui",
          "colorCode": "scarlet"
        },
        {
         
          "name": "Clear Vision",
          "price": 25000,
          "disponibilite": "Oui",
          "codeColor": "burgundy"
        },
        {
          
          "name": "Vital Force",
          "price": 25000,
          "disponibilite": "Oui",
          "codeColor": "indigo"
         
        },
        {
          
          "name": "Propolis",
          "price": 25000,
          "disponibilite": "Oui",
          "codeColor": "burgundy"
         
        },
        {
          
          "name": "Ovary Care",
          "price": 20000,
          "disponibilite": "Oui",
          "codeColor": "turquoise"
         
        },
        {
          
          "name": "MSM",
          "price": 25000,
          "disponibilite": "Oui",
          "codeColor": "mustard",
       
        },
        {
          
          "name": "Multi Vitamine",
          "price": 25000,
          "disponibilite": "Oui",
          "codeColor": "tan"
        
        },
        
        {
          
          "name": "L-Carnitine",
          "price": 20000,
          "disponibilite": "Oui",
          "codeColor": "teal"
          
        },
        {
         
          "name": "Collagen",
          "price": 20000,
          "disponibilite": "Oui",
          "codeColor": "scarlet"
         
        }
  ];
    // const alreadyExists = await this.productModel.exists({ name: createProduitDto.name }).lean();
    // if(alreadyExists){
    //   throw new ConflictException(`cet produit existe déjà dans la base de données`);
    // }
    for(let i=0; i<data.length; i++){
      await this.productModel.create(data[i]);
    }

    // if (!createdProduct) {
    //   throw new InternalServerErrorException(
    //     'Impossible de créer le produit, veuillez réessayer',
    //   );
    // }
    // return createdProduct;
  }

  async findAll(): Promise<Products[]> {
    const products = await this.productModel.find().exec();
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

    const updatedProduct = this.productModel.findOneAndUpdate({_id: productId }, updateProduitDto, {
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
}
