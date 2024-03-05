import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Schema as MongooseSchema} from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ReportData } from './dto/reportData.dto';

@Controller('expenses')
export class ExpensesController {
  
  constructor(private readonly expensesService: ExpensesService) {}

  @Post('newexpense')
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get('allexpense')
  findAll() {
    return this.expensesService.findAll();
  }

  @Get('allexpenseanne/:annee')
  findAllByAnne(@Param('annee') annee: number) {
    return this.expensesService.findAllByAnnee(annee);
  }

  @Post('report')
  findReportData(@Body() reportData: ReportData) {
    return this.expensesService.findReportData(reportData);
  }

  @Get('singleexpense/:annee')
  findOne(@Param('id') id: MongooseSchema.Types.ObjectId) {
    return this.expensesService.findOne(id);
  }

  @Get('allexpensebytype/:typetransaction')
  findAllByTypeOperation(@Param('typetransaction') typetransaction: string){
    const date = new Date()
    const annee = date.getFullYear();
    console.log('annee', annee);
    return this.expensesService.findAllByTypeoperation(typetransaction, annee);
  }

  @Patch('updateexpense/:id')
  update(@Param('id') id: MongooseSchema.Types.ObjectId, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete('deleteexpense/:id')
  remove(@Param('id') id: MongooseSchema.Types.ObjectId) {
    return this.expensesService.remove(id);
  }

  @Post('newcategory')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.expensesService.createCategory(createCategoryDto);
  }

  
  @Get('allcategory')
  findAllCategory() {
    return this.expensesService.findAllCategory();
  }

  @Get('singlecategory/:id')
  findOneCategory(@Param('id') id: string) {
    return this.expensesService.findOneCategory(id);
  }

  @Patch('updatecategory/:id')
  updateCategory(@Param('id') id: string, @Body() updateCategoryDto: CreateCategoryDto) {
    return this.expensesService.updateCategory(id, updateCategoryDto);
  }

  @Delete('deletecategory/:id')
  removeCategory(@Param('id') id: string) {
    return this.expensesService.removeCategory(id);
  }
}
