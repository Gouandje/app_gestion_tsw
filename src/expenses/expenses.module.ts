import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from './schemas/expense.schema';
import { CaisseModule } from 'src/caisse/caisse.module';
import { Category, CategorySchema } from './schemas/category.schema';

@Module({
  
  imports: [    
    HttpModule,
    CaisseModule,
    MongooseModule.forFeature(
      [
        { 
          name: Expense.name, 
          schema: ExpenseSchema 
        },
        { 
          name: Category.name, 
          schema: CategorySchema 
        }
      ]
      )
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService],
  exports: [ExpensesService]
})
export class ExpensesModule {}
