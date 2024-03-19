import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense, ExpenseDocument } from './schemas/expense.schema';
import { Model, Schema as MongooseSchema  } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Caisse, CaisseDocument } from 'src/caisse/schemas/caisse.schema';
import { CaisseService } from 'src/caisse/caisse.service';
import { CreateCaisseDto } from 'src/caisse/dto/create-caisse.dto';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ReportData } from './dto/reportData.dto';

@Injectable()
export class ExpensesService {

  constructor(
    @InjectModel(Expense.name) private readonly expenseModel: Model<ExpenseDocument>,
    @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
    private readonly caisseService: CaisseService
   ){}
   

  async create(createExpenseDto: CreateExpenseDto) {
    const result ="";
    const getcaisse = await this.caisseService.findAll();

    if(createExpenseDto.typetransaction =='entrée'){
      const createdExpense = await this.expenseModel.create(createExpenseDto);
        if(getcaisse.length == 0){
          const createCaisseDto = {
            solde: createdExpense.montant
          };
          const addtocaisse = this.caisseService.create(createCaisseDto);
        }else{
          const id = getcaisse[0]._id.toString('hex');
          const montantcurrent = createdExpense.montant + getcaisse[0].solde
          const updatetocaisse = await this.caisseService.update(id, {solde:montantcurrent});
        }
      }else{
        if(getcaisse.length == 0){
          throw new NotFoundException(`Aucun fond disponible`);
        }else{
          const createdExpense = await this.expenseModel.create(createExpenseDto);

          if(getcaisse[0].solde >= createExpenseDto.montant){
            const id = getcaisse[0]._id.toString('hex');
          const montantcurrent = (getcaisse[0].solde - createdExpense.montant);
          const updatetocaisse = await this.caisseService.update(id, {solde:montantcurrent});
          }else{
            throw new NotFoundException(`Solde insufisant. le solde actuel est: ${getcaisse[0].solde}`);
          }
          
        }
      }   

      return { message: "Créé avec succès"};  
    }

  async findAll() {
    const expenses = await this.expenseModel.find().populate('categoryId').exec();
    return expenses;
  }

  async findAllByAnnee(annee: number){
    const data = [];
    const expenses = await this.expenseModel.find({annee: annee}).populate('categoryId').exec();
    // // const data = {
    // //   auteur: String

    // // }
    // // expenses.date.split('-')[0]
    // for(let i=0; expenses.length<0; i++){
    //   // date: expenses[i].date.split('-')[0];
    // const obj = {
    //   auteur: expenses[i].auteur,
    //   date: expenses[i].toString().split('T')[0],
    //   // date: expenses[i].date.toISOString().split('T')[0],
    //   montant:expenses[i].montant,
    //   motif: expenses[i].motif,
    //   typetransaction: expenses[i].typetransaction
      
    // }
    // data.push(obj)

    // console.log('date',expenses[i].toString().split('T')[0]);
    // }
    // console.log('data',expenses)
    return expenses;
  }

  async findReportData(reportData: ReportData){
    const data = [];
    const report = await this.expenseModel.find({date: {$gte:reportData.dateStart, $lte: reportData.dateEnd}}).populate('categoryId').exec();
    // // const data = {
    // //   auteur: String

    // // }
    // // expenses.date.split('-')[0]
    // for(let i=0; expenses.length<0; i++){
    //   // date: expenses[i].date.split('-')[0];
    // const obj = {
    //   auteur: expenses[i].auteur,
    //   date: expenses[i].toString().split('T')[0],
    //   // date: expenses[i].date.toISOString().split('T')[0],
    //   montant:expenses[i].montant,
    //   motif: expenses[i].motif,
    //   typetransaction: expenses[i].typetransaction
      
    // }
    // data.push(obj)

    // console.log('date',expenses[i].toString().split('T')[0]);
    // }
    // console.log('data',report)
    return report;
  }

  async findAllByTypeoperation(typetransaction, annee){
    const data = [];
    const expenses  = await this.expenseModel.find({typetransaction: typetransaction, annee: annee}).populate('categoryId').exec();
    // for(let i=0; expenses.length>0; i++){
    //   // if(expenses[i].typetransaction == typetransaction){
    //   const obj = {
    //     annee:expenses[i].annee,
    //     auteur: expenses[i].auteur,
    //     categoryId: expenses[i].categoryId,
    //     date:expenses[i].date,
    //     montant: expenses[i].montant,
    //     motif: expenses[i].motif,
    //     typetransaction: expenses[i].typetransaction,
    //     _id:expenses[i]._id
    //   };

    //   data.push(obj)
    // // }

    // }
    return expenses;
  }

  async findOne(expenseId: MongooseSchema.Types.ObjectId): Promise<Expense> {
    const expense = await this.expenseModel.findById(expenseId);

    if (!expense) {
      throw new NotFoundException('ligne non trouvé');
    }
    return expense;
  }

  async update(expenseId: MongooseSchema.Types.ObjectId, updateExpenseDto: UpdateExpenseDto) {
    const product = await this.findOne(expenseId);

    const updatedProduct = this.expenseModel.findOneAndUpdate({_id: expenseId }, updateExpenseDto, {
      new: true,
    }).exec();


    return updatedProduct;
  }

  async remove(id: MongooseSchema.Types.ObjectId) {
    await this.expenseModel.findByIdAndRemove(id).catch((err) => {
      throw new BadRequestException(`une erreur s'est produite lors de la suppression`);
    });

    return `supprimé avec succès`;
  }


  async createCategory(createCategoryDto: CreateCategoryDto) {
    const createdCategory = await this.categoryModel.create(createCategoryDto);
    return createdCategory;
  }

  async findAllCategory() {
    const category = await this.categoryModel.find().exec();
    return category;
  }

  async findOneCategory(categoryId: string){
    const category = await this.categoryModel.findById(categoryId);

    if (!category) {
      throw new NotFoundException('ligne non trouvé');
    }
    return category;
  }

  async removeCategory(id: string) {
    await this.categoryModel.findByIdAndRemove(id).catch((err) => {
      throw new BadRequestException(`une erreur s'est produite lors de la suppression`);
    });

    return `supprimé avec succès`;
  }

  async updateCategory(categoryId: string, updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = this.categoryModel.findOneAndUpdate({_id: categoryId }, updateCategoryDto, {
      new: true,
    }).exec();


    return updatedCategory;
  }

  async expensesbackup() {
   return await this.expenseModel.find().exec();
  }

  async categoriesbackup() {
    return await this.categoryModel.find().exec();
  }
}
