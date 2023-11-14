import { Module } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { ProduitController } from './produit.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductsSchema } from './schemas/products.shema';
import { StockModule } from 'src/stock/stock.module';
import { StockService } from 'src/stock/stock.service';

@Module({
  imports: [    
    HttpModule,
    MongooseModule.forFeature(
      [
        { 
          name: Products.name, 
          schema: ProductsSchema 
        }
      ]
      )
  ],
  controllers: [ProduitController],
  providers: [ProduitService],
  exports: [ProduitService]
})
export class ProduitModule {}
