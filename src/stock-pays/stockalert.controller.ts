import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { StockAlertPaysService } from "./stockalert.service";
import { CreateStockAlerteEntrepotDto } from "src/entrepot/dto/create-stock-alerte.dto";
import { UpdateEntrepotDto } from "src/entrepot/dto/update-entrepot.dto";

@Controller('stockalertpays')
export class StockAlertPaysController {
    constructor(private readonly stockalertPaysService: StockAlertPaysService) {}

    @Post('newstockalertepays')
    createstockalerte(@Body() createstockalerteEntrepotDto: CreateStockAlerteEntrepotDto) {
        return this.stockalertPaysService.create(createstockalerteEntrepotDto);
    }

    @Get('allsalert')
    findAll(){
        return this.stockalertPaysService.findAll();
    }
  
    @Get('singlestockalertpays/:id')
    findalertOne(@Param('id') id: string) {
        return this.stockalertPaysService.findsinglebyproduct(id);
    }

    @Patch('updatestockalertpays/:id')
    updatealert(@Param('id') id: string, @Body() updateEntrepotDto: UpdateEntrepotDto) {
        return this.stockalertPaysService.update(id, updateEntrepotDto);
    }

    @Delete('deletestockalertpays/:id')
    remove(@Param('id') id: string) {
        return this.stockalertPaysService.remove(id);
    }

   
}