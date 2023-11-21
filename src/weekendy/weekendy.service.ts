import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Weekendy, WeekendyDocument } from './schemas/weekendy.schema';
import { Model,  Schema as MongooseSchema } from 'mongoose';
import { CreateWeekendyDto } from './dto/create-weekendy.dto';
import { UpdateWeekendyDto } from './dto/update-weekendy.dto';
import { ProduitService } from 'src/produit/produit.service';
import {StockagenceService} from 'src/stockagence/stockagence.service';
import { SalaireService } from 'src/salaire/salaire.service';
import { CreateSalaireDto } from 'src/salaire/dto/create-salaire.dto';
import { UpdateStockagenceDto } from 'src/stockagence/dto/update-stockagence.dto';
import { AffectationService } from 'src/affectation/affectation.service';
import { WeekendyDocteur, WeekendyDocteurDocument } from './schemas/weekendydocteur.schema';
import { CreateDocteurWeekendyDto } from './dto/create-docteur-weekendy.dto';
import { AgenceService } from 'src/angence/agence.service';
import { PayscaService } from 'src/paysca/paysca.service';
import { Produitvendupays, ProduitvendupaysDocument } from './schemas/produitsvendupays.schema';
import { ProduitvendubureauDocument } from './schemas/produitvendubureau.schema';
import { TauxService } from 'src/taux/taux.service';
import { ZoneService } from 'src/zone/zone.service';
import { SectionService } from 'src/section/section.service';
import { TauxzoneService } from 'src/tauxzone/tauxzone.service';
import { QueryDto } from './dto/requete.dto';

@Injectable()
export class WeekendyService {

  constructor(
    @InjectModel(Weekendy.name) private readonly weekendyModel: Model<WeekendyDocument>,
    @InjectModel(Produitvendupays.name) private readonly produitvendupaysModel: Model<ProduitvendupaysDocument>,
    @InjectModel(Weekendy.name) private readonly produitvendubureauModel: Model<ProduitvendubureauDocument>,
    @InjectModel(WeekendyDocteur.name) private readonly weekendyDocteurModel: Model<WeekendyDocteurDocument>,
    private produitService: ProduitService,
    private agenceservice: AgenceService,
    private zoneservice: ZoneService,
    private sectionservice: SectionService,
    private tauxzoneservice: TauxzoneService,
    private tauxservice: TauxService,
    private payscaservice: PayscaService,
    private stockagenceService: StockagenceService,
    private affectationservice: AffectationService,
    private salaireService: SalaireService

  ) {}

  async create(createWeekendyDto: CreateWeekendyDto){
    // console.log(createWeekendyDto);
    const weekendproduct = [];
    const payload = {...createWeekendyDto};
    for(let i=0; i<createWeekendyDto.items.length; i++){

      const product = await this.stockagenceService.findagenceproduit(createWeekendyDto.bureauId, createWeekendyDto.items[i].productId);
      if(product !=null && createWeekendyDto.items[i].quantity <= product.quantity){
        weekendproduct.push(createWeekendyDto.items[i]);
      }else{
        const produitindispo = await this.produitService.findOne(createWeekendyDto.items[i].productId);
        // console.log('produit rupture', produitindispo.name);
        throw new BadRequestException('Echèc d\'enregistrement du weekendy ' + ` ${produitindispo.name} ` + ' n\'est pas en stock suffisant dans ce bureau. ');
      }

    }
    const createdDataDto = {
      bureauId: createWeekendyDto.bureauId,
      mois: createWeekendyDto.mois,
      annee: createWeekendyDto.annee,
      items: weekendproduct,
      caTotal:createWeekendyDto.caTotal,
      TotaltoBank: createWeekendyDto.TotaltoBank,
      chargebureauTotal: createWeekendyDto.chargebureauTotal,
      primetrsportTotal: createWeekendyDto.primetrsportTotal,
      createdAt: createWeekendyDto.createdAt
    };
    const weekendy = await  this.weekendyModel.create(createdDataDto);
    if(weekendy){
      
      const bureau = await this.agenceservice.findbureau(createWeekendyDto.bureauId);
      console.log('bureau', bureau);
      const zoneca = await this.zoneservice.findzonecabyZone(bureau.zoneId, createWeekendyDto.annee);
      console.log('zoneca', zoneca);

      const tauxzone = await this.tauxzoneservice.findByzone(bureau.zoneId);

        console.log('tauxzone', tauxzone)

      // zone prime and ca
      if(zoneca !=null){
        const updateDatazoneca ={
          zoneId: bureau.zoneId,
          cazone:(createWeekendyDto.caTotal + zoneca['cazone']),
          annee: createWeekendyDto.annee
        }; 
        await this.zoneservice.updatezoneca(zoneca._id.toString('hex'),updateDatazoneca);

        const primesz = await this.zoneservice.findprimesz(bureau.zoneId, createWeekendyDto.mois, createWeekendyDto.annee);
        console.log('primesz', primesz);

        if(primesz !=null){
          const updateDataprimesz ={
            zoneId: bureau.zoneId,
            cazone:(createWeekendyDto.caTotal + primesz.cazone),
            annee: createWeekendyDto.annee,
            primesz: (createWeekendyDto.caTotal*tauxzone.taux_zone/100 + primesz.primesz),
          }; 
          console.log('updateDataprimesz', updateDataprimesz)
  
          await this.zoneservice.updateprimesz(primesz._id.toString('hex'),updateDataprimesz);

        }else{

          const createDataprime ={
            zoneId: bureau.zoneId,
            cazone:createWeekendyDto.caTotal,
            mois:createWeekendyDto.mois,
            annee: createWeekendyDto.annee,
            primesz: createWeekendyDto.caTotal*tauxzone.taux_zone/100,
          }; 
          console.log('createDataprime', createDataprime)
          await this.zoneservice.createprimesz(createDataprime);

        }

      }else{
        const createDatazoneca ={
          zoneId: bureau.zoneId,
          cazone:createWeekendyDto.caTotal,
          annee: createWeekendyDto.annee
        }; 
        await this.zoneservice.createzoneca(createDatazoneca);
        
        const createDataprime ={
          zoneId: bureau.zoneId,
          cazone:createWeekendyDto.caTotal,
          mois:createWeekendyDto.mois,
          annee: createWeekendyDto.annee,
          primesz: createWeekendyDto.caTotal*tauxzone.taux_zone/100,
        }; 
        console.log('createDataprime', createDataprime)
        await this.zoneservice.createprimesz(createDataprime);


      }

      // end

      // section prime and ca (pour plutard)
     
      // const sectionca = await this.sectionservice.findSectioncaforAgence(bureau.sectionId, createWeekendyDto.annee);
      // console.log('sectionca', sectionca)

      // if(sectionca !=null){
      //   const updateDatasectionca ={
      //     sectionId: bureau.sectionId,
      //     casection:(createWeekendyDto.caTotal + sectionca.casection),
      //     mois:createWeekendyDto.mois,
      //     annee: createWeekendyDto.annee
      //   }; 
      //   await this.sectionservice.updatesectionca(sectionca._id.toString('hex'),updateDatasectionca);

      // }else{
      //   const createDatasectionca ={
      //     sectionId: bureau.sectionId,
      //     casection:createWeekendyDto.caTotal,
      //     mois:createWeekendyDto.mois,
      //     annee: createWeekendyDto.annee
      //   }; 
      //   await this.sectionservice.createcasection(createDatasectionca);
      // }
      // const tauxsection = await this.tauxzoneservice.findBysection(bureau.zoneId);
      // const primechefsection = await this.sectionservice.findprimechefsection(bureau.sectionId, createWeekendyDto.mois, createWeekendyDto.annee);

      // if(primechefsection !=null){
      //   const updateDataprimechefsection ={
      //     sectionId: bureau.sectionId,
      //     casection:(createWeekendyDto.caTotal + primechefsection.casection),
      //     mois:createWeekendyDto.mois,
      //     annee: createWeekendyDto.annee,
      //     Chefsectionprime: (createWeekendyDto.caTotal*tauxsection.taux_section/100 + primechefsection.casection),
      //   }; 
      //   await this.sectionservice.updateprimechefsection(primechefsection._id.toString('hex'),updateDataprimechefsection);

      // }else{
      //   const createDataprimechefsection ={
      //     sectionId: bureau.sectionId,
      //     casection:createWeekendyDto.caTotal,
      //     mois:createWeekendyDto.mois,
      //     annee: createWeekendyDto.annee,
      //     Chefsectionprime: (createWeekendyDto.caTotal*tauxsection.taux_section/100),
      //   }; 
      //   await this.sectionservice.createprimechefsection(createDataprimechefsection);
      // }

      // end
     

      for(let i=0; i < createWeekendyDto.items.length; i++){
        const product = await this.stockagenceService.findagenceproduit(createWeekendyDto.bureauId, createWeekendyDto.items[i].productId);
        console.log('product',product);
        const productPrice = await this.produitService.findOne(createWeekendyDto.items[i].productId);
        const produitvendupays = await this.produitvendupaysModel.findOne({paysId: bureau.countryId, productId: createWeekendyDto.items[i].productId,  annee: createWeekendyDto.annee}).exec();
        console.log('produitvendupays', produitvendupays);

        if(produitvendupays == null){
          const createdproduitvenduDto = {
            paysId: bureau.countryId,
            productId: createWeekendyDto.items[i].productId,
            quantity: createWeekendyDto.items[i].quantity,
            annee: createWeekendyDto.annee,
            chiffreaffaire: createWeekendyDto.items[i].quantity*productPrice.price
          };

          await this.produitvendupaysModel.create(createdproduitvenduDto);

        }else{
          const updatedproduitvenduDto = {
            paysId: bureau.countryId,
            productId: createWeekendyDto.items[i].productId,
            quantity: produitvendupays.quantity + createWeekendyDto.items[i].quantity,
            annee: createWeekendyDto.annee,
            chiffreaffaire: produitvendupays.chiffreaffaire + createWeekendyDto.items[i].quantity*productPrice.price 
          };
          await this.produitvendupaysModel.findByIdAndUpdate({_id: produitvendupays._id}, updatedproduitvenduDto, {new: true}).lean();
        }

        if(product !=null){
          const updatedStockagence = {
           quantity: product.quantitytotalenmagasin - (createWeekendyDto.items[i].quantity)
          };
          const updatestockagence: UpdateStockagenceDto = {
            agenceId:createWeekendyDto.bureauId,
            productId: createWeekendyDto.items[i].productId,
            quantity: product.quantity - createWeekendyDto.items[i].quantity,
            quantitytotalenmagasin: product.quantitytotalenmagasin
         };
         await this.stockagenceService.updateagenceStock(product._id.toString('hex'),  updatestockagence);
      }
      }
      const managersbureau = await this.affectationservice.findManager_bureau(createWeekendyDto.bureauId);
      console.log('managers bureau',managersbureau);
      const taux = await this.tauxservice.findAll();
      const createSalaireDto = {
        bureauId:createWeekendyDto.bureauId,
        salaire_agent: createWeekendyDto.caTotal*taux[0].taux_salaire_agent/100,
        salaire_formateur: createWeekendyDto.caTotal*taux[0].taux_formateur/100,
        salaire_total_manager: (createWeekendyDto.caTotal*taux[0].taux_salaire_mgr/100)*(managersbureau.length),
        motant_total: createWeekendyDto.caTotal*taux[0].taux_salaire_agent/100 + createWeekendyDto.caTotal*taux[0].taux_formateur/100 + (createWeekendyDto.caTotal*taux[0].taux_salaire_mgr/100)*(managersbureau.length),
        mois: createWeekendyDto.mois,
        annee: createWeekendyDto.annee,
        chiffreDaf: createWeekendyDto.caTotal,
        montant_bank:createWeekendyDto.TotaltoBank,
        chargeBureau:createWeekendyDto.chargebureauTotal,
        date_paiment: createWeekendyDto.createdAt,
      };

      this.salaireService.create(createSalaireDto);

      const paysinfobyagence = await this.agenceservice.findbureau(createWeekendyDto.bureauId);

      const infoCapays = {
        countryId: paysinfobyagence.countryId,
        mois: createWeekendyDto.mois,
        annee: createWeekendyDto.annee,
        caTotal: createWeekendyDto.caTotal
      };

      const getPaysCaMois = await this.payscaservice.findOnePaysCamoisExist(infoCapays.countryId, infoCapays.mois);

      if(getPaysCaMois !=null){
        const upadateinfopaysCaMois = {
          countryId: paysinfobyagence.countryId,
          mois: createWeekendyDto.mois,
          annee: createWeekendyDto.annee,
          caTotal: createWeekendyDto.caTotal + getPaysCaMois.caTotal
        };
        await this.payscaservice.update(getPaysCaMois._id.toString('hex'), upadateinfopaysCaMois);
      }else{

        await this.payscaservice.create(infoCapays)
      }
    }
    // console.log(weekendy);
    return weekendy;
  }

  async createVenteDocteur(createDocteurWeekendyDto: CreateDocteurWeekendyDto){
    // console.log(createWeekendyDto);
    const weekendproduct = [];
    for(let i=0; i<createDocteurWeekendyDto.items.length; i++){

      const product = await this.stockagenceService.findagenceproduit(createDocteurWeekendyDto.bureauId, createDocteurWeekendyDto.items[i].productId);
      if(product !=null && createDocteurWeekendyDto.items[i].quantity <= product.quantity){
        weekendproduct.push(createDocteurWeekendyDto.items[i]);
      }else{
        const produitindispo = await this.produitService.findOne(createDocteurWeekendyDto.items[i].productId);
        // console.log('produit rupture', produitindispo.name);
        throw new BadRequestException('Echèc d\'enregistrement du weekendy: ' + ` ${produitindispo.name} ` + ' n\'est pas en stock suffisant dans ce bureau. La quantité disponible après weekendy du mois passé est: ' + `${product.quantity}` + ' la quantité renseignée est supérieure à celle disponible');
      }

    }
    const createdDataDto = {
      bureauId: createDocteurWeekendyDto.bureauId,
      mois: createDocteurWeekendyDto.mois,
      annee: createDocteurWeekendyDto.annee,
      items: weekendproduct,
      caTotal:createDocteurWeekendyDto.caTotal,
      createdAt: createDocteurWeekendyDto.createdAt
    };
    const weekendy = await  this.weekendyDocteurModel.create(createdDataDto);
    if(weekendy){
      const bureau = await this.agenceservice.findbureau(createDocteurWeekendyDto.bureauId);

      for(let i=0; i < createDocteurWeekendyDto.items.length; i++){

        const product = await this.stockagenceService.findagenceproduit(createDocteurWeekendyDto.bureauId, createDocteurWeekendyDto.items[i].productId);
        const productPrice = await this.produitService.findOne(createDocteurWeekendyDto.items[i].productId);
        const produitvendupays = await this.produitvendupaysModel.findOne({paysId: bureau.countryId, productId: createDocteurWeekendyDto.items[i].productId,  annee: createDocteurWeekendyDto.annee}).exec();
        if(produitvendupays == null){

          const createdproduitvenduDto = {
            paysId: bureau.countryId,
            productId: createDocteurWeekendyDto.items[i].productId,
            quantity: createDocteurWeekendyDto.items[i].quantity,
            annee: createDocteurWeekendyDto.annee,
            chiffreaffaire: createDocteurWeekendyDto.items[i].quantity*productPrice['price']
          };

          await this.produitvendupaysModel.create(createdproduitvenduDto);

        }else{
          const updatedproduitvenduDto = {
            paysId: bureau.countryId,
            productId: createDocteurWeekendyDto.items[i].productId,
            quantity: produitvendupays.quantity + createDocteurWeekendyDto.items[i].quantity,
            annee: createDocteurWeekendyDto.annee,
            chiffreaffaire: produitvendupays.chiffreaffaire + createDocteurWeekendyDto.items[i].quantity*productPrice.price
          };
          await this.produitvendupaysModel.findByIdAndUpdate({_id: produitvendupays._id}, updatedproduitvenduDto, {new: true}).lean();
        }

        if(product !=null){
          const updatedStockagence = {
           quantity: product.quantitytotalenmagasin - (createDocteurWeekendyDto.items[i].quantity)
          };
          console.log(product._id);
          const updatestockagence: UpdateStockagenceDto = {
            agenceId:createDocteurWeekendyDto.bureauId,
            productId: createDocteurWeekendyDto.items[i].productId,
            quantity: product.quantitytotalenmagasin - createDocteurWeekendyDto.items[i].quantity,
            quantitytotalenmagasin: product.quantitytotalenmagasin
         };
         await this.stockagenceService.updateagenceStock(product._id.toString('hex'),  updatestockagence);

      }
      }
      
      const paysinfobyagence = await this.agenceservice.findbureau(createDocteurWeekendyDto.bureauId);

      const infoCapays = {
        countryId: paysinfobyagence.countryId,
        mois: createDocteurWeekendyDto.mois,
        caTotal: createDocteurWeekendyDto.caTotal
      };

      const getPaysCaMois = await this.payscaservice.findOnePaysCamoisExist(infoCapays.countryId, infoCapays.mois);

      if(getPaysCaMois !=null){
        const upadateinfopaysCaMois = {
          countryId: paysinfobyagence.countryId,
          mois: createDocteurWeekendyDto.mois,
          caTotal: createDocteurWeekendyDto.caTotal + getPaysCaMois.caTotal
        };
        await this.payscaservice.update(getPaysCaMois._id.toString('hex'), upadateinfopaysCaMois);
      }else{

        await this.payscaservice.create(infoCapays)
      }
    }
    // console.log(weekendy);
    return weekendy;
  }


  async findAll(bureauId: string) {
    const weekendy = await this.weekendyModel
                                .find({bureauId: bureauId})
                                .populate('bureauId')
                                .populate('mois')
                                .populate('annee')
                                .exec();
      // cas où le calcul n'est exécuté automatiquement
    // for(let i=0; i<weekendy.length; i++){
    //   // console.log('weekendy==>',  weekendy[i]['items']);
    //   for(let j=0; j<weekendy[i]['items'].length; j++){
    //     // console.log('elementItem', weekendy[i]['items'][j].quantity);
    //     const product = await this.stockagenceService.findagenceproduit(bureauId, weekendy[i]['items'][j].productId);
    //     const updatestockagence: UpdateStockagenceDto = {
    //       agenceId:bureauId,
    //       productId: weekendy[i]['items'][j].productId.toString(),
    //       quantity: product.quantity - (Number(weekendy[i]['items'][j].quantity)),
    //       quantitytotalenmagasin: product.quantitytotalenmagasin
    //    };
    //    console.log('updatestockagence',updatestockagence);
    //    await this.stockagenceService.updateagenceStock(product._id.toString('hex'),  updatestockagence);
    //   }
    // }
    // fin 
                                
    return weekendy;
  }

  async findAllVenteDocteur(bureauId: string) {
    const weekendy = await this.weekendyDocteurModel
                                .find({bureauId: bureauId})
                                .populate('bureauId')
                                .populate('mois')
                                .populate('annee').exec();
    return weekendy;
  }

  async allGetAllProduitVendyPays(query: QueryDto){
    const result=[];
    console.log('query', query);
    const ventes = await this.produitvendupaysModel.find({paysId: query.paysId, annee: query.anneeId}).populate('paysId').populate('productId').populate('annee').exec();
    console.log('ventes',ventes);
    return ventes;                                               
  }


  async findOne(weekendyId: string) {
    let products = []
    const weekedy = await this.weekendyModel.findById(weekendyId).populate('bureauId').populate('mois').populate('annee').exec();                      
    if (!weekedy) {
      throw new NotFoundException('weekendy non trouvé');
    }
    return weekedy ;
  }

  async update(weekendyId: string, updateWeekendyDto: UpdateWeekendyDto) {
    const weekedy = await this.findOne(weekendyId);

    const updatedWeekedy = this.weekendyModel.findOneAndUpdate({ ...updateWeekendyDto }, { new: true });

    return updatedWeekedy;
  }

  async remove(weekedyId: MongooseSchema.Types.ObjectId) {
    await this.weekendyModel.findByIdAndRemove(weekedyId).catch((err) => {
      throw new BadRequestException(`une erreur c'est produite lors de la suppression`);
    });

    return `Weekendy supprimé avec succès`;
  }

  async findOneByweekendyForDelete(id: string) {

    const weekedy = await this.weekendyModel.find({bureauId: id}).exec();           
    if (weekedy !=null) {
     for(let i=0; i<weekedy.length; i++){
      await this.weekendyModel.findByIdAndRemove({_id: weekedy[i]._id});
     }
    }
    return 'weekedy';
  }

  
}
