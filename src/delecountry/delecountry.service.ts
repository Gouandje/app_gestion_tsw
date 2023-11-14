import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDelecountryDto } from './dto/create-delecountry.dto';
import { UpdateDelecountryDto } from './dto/update-delecountry.dto';
import { AgenceService } from 'src/angence/agence.service';
import { ZoneService } from 'src/zone/zone.service';
import { SectionService } from 'src/section/section.service';
import { EntrepotService } from 'src/entrepot/entrepot.service';
import { MouvementstockService } from 'src/mouvementstock/mouvementstock.service';
import { StockPaysService } from 'src/stock-pays/stock-pays.service';
import { StockService } from 'src/stock/stock.service';
import { WeekendyService } from 'src/weekendy/weekendy.service';
import { SalaireService } from 'src/salaire/salaire.service';
import { PayscaService } from 'src/paysca/paysca.service';
import { StockagenceService } from 'src/stockagence/stockagence.service';
import { SuperviseurzoneService } from 'src/superviseurzone/superviseurzone.service';
import { AffectationService } from 'src/affectation/affectation.service';
import { PatientService } from 'src/patient/patient.service';
import { PaysService } from 'src/pays/pays.service';
import { ChefsectionService } from 'src/chefsection/chefsection.service';

@Injectable()
export class DelecountryService {

  constructor(
    private readonly paysService: PaysService,
    private readonly agenceService: AgenceService,
    private readonly zoneService: ZoneService,
    private readonly sectionService: SectionService,
    private readonly entrepotService: EntrepotService,
    private readonly mvtService: MouvementstockService,
    private readonly stockPaysService: StockPaysService,
    private readonly stockService: StockService,
    private readonly weekendyService: WeekendyService,
    private readonly salaireService: SalaireService,
    private readonly payscaService: PayscaService,
    private readonly stockBureService: StockagenceService,
    private readonly affectationService: AffectationService,
    private readonly superviseurzone: SuperviseurzoneService,
    private readonly chefsectionservice: ChefsectionService,
    private readonly patientService: PatientService,){}

  async remove(id: string) {
    console.log('id pays',id)
    const zone = await this.zoneService.findOne(id);
    const section = await this.sectionService.findOnebycountry(id);
    const bureau = await this.agenceService.findAllagenceCountry(id);
    if(bureau !=null){
      await this.paysService.remove(id);
      for(let i=0; i<bureau.length; i++){
        await this.agenceService.remove(bureau[i]._id.toString('hex'));
        await this.superviseurzone.removefordelete(bureau[i].zoneId);
        await this.chefsectionservice.removechefsectionfordelete(bureau[i].sectionId);
        await this.sectionService.remove(bureau[i].sectionId);
        await this.zoneService.remove(bureau[i].zoneId);
        await this.mvtService.findOnebyBureauForDelete(bureau[i]._id.toString('hex'));
        await this.weekendyService.findOneByweekendyForDelete(bureau[i]._id.toString('hex'));

        await this.salaireService.removefindSalaireFordelete(bureau[i]._id.toString('hex'));

        await this.stockBureService.remove(bureau[i]._id.toString('hex'));

        await this.affectationService.findaffecteForDelele(bureau[i]._id.toString('hex'));

        await this.affectationService.findaffecteForDelele(bureau[i]._id.toString('hex'));
        await this.patientService.findandDelete(bureau[i]._id.toString('hex'));
      }
    }else{
      await this.sectionService.findsectionpaysDelete(id)
      await this.zoneService.findzonepaysDelete(zone._id.toString('hex'));
      await this.superviseurzone.removefordelete(zone._id.toString('hex'));
      await this.chefsectionservice.removechefsectionfordelete(section._id.toString('hex'));
      await this.payscaService.remove(id)
      await this.stockService.removebyCountry(id);
      const product = await this.stockPaysService.findAllproductbycountry(id);
      if(product !=null){
        for(let i=0; i<product.length; i++){
          await this.stockPaysService.remove(product[i]._id.toString('hex'));
        }

      }
    }
    await this.entrepotService.remove(id);
    await this.paysService.remove(id);
    return "deleted";

  }

  async removezone(id: string) {
    const bureau = await this.agenceService.findAllagenceZone(id);
    const section = await this.sectionService.findOnebycountry(id);
    if(bureau !=null){
      for(let i=0; i<bureau.length; i++){
        await this.agenceService.remove(bureau[i]._id.toString('hex'));
        await this.sectionService.remove(bureau[i].sectionId);
        await this.mvtService.findOnebyBureauForDelete(bureau[i]._id.toString('hex'));
        await this.weekendyService.findOneByweekendyForDelete(bureau[i]._id.toString('hex'));
        await this.superviseurzone.removefordelete(bureau[i].zoneId);
        await this.chefsectionservice.removechefsectionfordelete(bureau[i].sectionId);
        await this.salaireService.removefindSalaireFordelete(bureau[i]._id.toString('hex'));

        await this.stockBureService.remove(bureau[i]._id.toString('hex'));

        await this.affectationService.findaffecteForDelele(bureau[i]._id.toString('hex'));

        await this.affectationService.findaffecteForDelele(bureau[i]._id.toString('hex'));
        await this.patientService.findandDelete(bureau[i]._id.toString('hex'));
      }
    }else{
      await this.sectionService.findsectionzoneDelete(id)
      await this.superviseurzone.removefordelete(id);
      await this.chefsectionservice.removechefsectionfordelete(section._id.toString('hex'));
     
    }
    return "deleted";

  }

  async removesection(id: string) {
    const bureau = await this.agenceService.findAllagenceSection(id);
    if(bureau !=null){
      for(let i=0; i<bureau.length; i++){
        await this.agenceService.remove(bureau[i]._id.toString('hex'));
        await this.sectionService.remove(bureau[i].sectionId);
        await this.mvtService.findOnebyBureauForDelete(bureau[i]._id.toString('hex'));
        await this.weekendyService.findOneByweekendyForDelete(bureau[i]._id.toString('hex'));
        await this.salaireService.removefindSalaireFordelete(bureau[i]._id.toString('hex'));

        await this.stockBureService.remove(bureau[i]._id.toString('hex'));

        await this.affectationService.findaffecteForDelele(bureau[i]._id.toString('hex'));

        await this.affectationService.findaffecteForDelele(bureau[i]._id.toString('hex'));
        await this.patientService.findandDelete(bureau[i]._id.toString('hex'));
      }
    }else{
      await this.sectionService.remove(id)
      await this.chefsectionservice.removechefsectionfordelete(id);      
    }
    return "deleted";

  }

  async removebureau(id: string) {
    const affectation = await this.affectationService.findByreau(id);
    if(affectation.length !=0){
      for(let i=0; i<affectation.length; i++){
        await this.affectationService.remove(affectation[i]._id.toString('hex'));
        await this.mvtService.findOnebyBureauForDelete(affectation[i].bureauId);
        await this.weekendyService.findOneByweekendyForDelete(affectation[i].bureauId);
        await this.salaireService.removefindSalaireFordelete(affectation[i].bureauId);

        await this.stockBureService.remove(affectation[i].bureauId);

        await this.patientService.findandDelete(affectation[i].bureauId);
        await this.agenceService.remove(id)
      }
    }else{
      console.log('ici vrai action id',id)
      await this.agenceService.remove(id);
    }
    return {message: "deleted"};

  }
}
