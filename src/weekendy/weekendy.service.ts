import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
import { SalaireManagerService } from 'src/salaire_manager/salaire_manager.service';
import { SalaireDoctor, SalaireDoctorDocument } from './schemas/salairedoctor.schema';
import { SalairekineDTO } from './dto/salairedoctor.dto';

@Injectable()
export class WeekendyService {

  constructor(
    @InjectModel(Weekendy.name) private readonly weekendyModel: Model<WeekendyDocument>,
    @InjectModel(Produitvendupays.name) private readonly produitvendupaysModel: Model<ProduitvendupaysDocument>,
    @InjectModel(Weekendy.name) private readonly produitvendubureauModel: Model<ProduitvendubureauDocument>,
    @InjectModel(WeekendyDocteur.name) private readonly weekendyDocteurModel: Model<WeekendyDocteurDocument>,
    @InjectModel(SalaireDoctor.name) private readonly salaireDoctorModel: Model<SalaireDoctorDocument>,
    private produitService: ProduitService,
    private agenceservice: AgenceService,
    private zoneservice: ZoneService,
    private sectionservice: SectionService,
    private tauxzoneservice: TauxzoneService,
    private tauxservice: TauxService,
    private payscaservice: PayscaService,
    private stockagenceService: StockagenceService,
    private affectationservice: AffectationService,
    private salaireService: SalaireService,
    private salairemanagerService: SalaireManagerService 

  ) {}

  async create(createWeekendyDto: CreateWeekendyDto){
    // console.log(createWeekendyDto);
    const weekendproduct = [];
    const payload = {...createWeekendyDto};
    const taux = await this.tauxservice.findAll();
    for (let i = 0; i < createWeekendyDto.items.length; i++) {
      if (createWeekendyDto.items[i].quantity > 0) {
        const product = await this.stockagenceService.findagenceproduit(createWeekendyDto.bureauId, createWeekendyDto.items[i].productId);
        console.log(product);
        const value = Number(product.quantity) - Number(createWeekendyDto.items[i].quantity);
        if (value >= 0) {
          weekendproduct.push(createWeekendyDto.items[i]);
        } else {
          const produitindispo = await this.produitService.findOne(createWeekendyDto.items[i].productId);
          throw new BadRequestException('Echèc d\'enregistrement du weekendy ' + ` ${produitindispo.name} ` + ' n\'est pas en stock suffisant dans ce bureau. ');
        }
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
    const alreadyExists = await this.weekendyModel.findOne({ bureauId: createWeekendyDto.bureauId,
      mois: createWeekendyDto.mois, annee:createdDataDto.annee}).lean();
    if(alreadyExists){
        throw new ConflictException(`Pour ce Bureau il existe déjà un Monthending pour ce mois et pour cette année dans la base de données`);
    }else{
      const weekendy = await  this.weekendyModel.create(createdDataDto);
      if(weekendy){
        
        const bureau = await this.agenceservice.findbureau(createWeekendyDto.bureauId);
       
        // bureau n'ayant pas ni de zone ni de section
        if(bureau.sectionId == "" && bureau.zoneId == "" ){
          const managersbureau = await this.affectationservice.findManager_bureau(createWeekendyDto.bureauId);
          const getPaysCaMois = await this.payscaservice.findOnePaysCamoisExist(bureau.countryId, createWeekendyDto.mois,createWeekendyDto.annee);
          const getPaysCaAnnee = await this.payscaservice.findOnePaysCaYearExist(bureau.countryId, createWeekendyDto.annee)
         
          for(let i=0; i < createWeekendyDto.items.length; i++){
            const product = await this.stockagenceService.findagenceproduit(createWeekendyDto.bureauId, createWeekendyDto.items[i].productId);
            const productPrice = await this.produitService.findOne(createWeekendyDto.items[i].productId);
            const produitvendupays = await this.produitvendupaysModel.findOne({paysId: bureau.countryId, productId: createWeekendyDto.items[i].productId,  annee: createWeekendyDto.annee}).exec();
          
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
          if(managersbureau.length == 0){

            const createSalaireDto = {
              bureauId:createWeekendyDto.bureauId,
              salaire_agent: createWeekendyDto.caTotal*taux[0].taux_salaire_agent/100,
              salaire_formateur: createWeekendyDto.caTotal*taux[0].taux_formateur/100,
              salaire_total_manager: (createWeekendyDto.caTotal*taux[0].taux_salaire_mgr/100)*(managersbureau.length),
              motant_total: 0,
              mois: createWeekendyDto.mois,
              annee: createWeekendyDto.annee,
              chiffreDaf: createWeekendyDto.caTotal,
              montant_bank:createWeekendyDto.TotaltoBank,
              chargeBureau:createWeekendyDto.chargebureauTotal,
              date_paiment: createWeekendyDto.createdAt,
            };
      
            this.salaireService.create(createSalaireDto);
          }else{
            
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

          }
        
          if(getPaysCaMois !=null){
            const upadateinfopaysCaMois = {
              countryId: bureau.countryId,
              mois: createWeekendyDto.mois,
              annee: createWeekendyDto.annee,
              caTotal: createWeekendyDto.caTotal + getPaysCaMois.caTotal
            };
            await this.payscaservice.updateCaPaysMois(getPaysCaMois._id.toString('hex'), upadateinfopaysCaMois);
          }else{
    
            const infoCapays = {
              countryId: bureau.countryId,
              mois: createWeekendyDto.mois,
              annee: createWeekendyDto.annee,
              caTotal: createWeekendyDto.caTotal
            };
    
            await this.payscaservice.create(infoCapays)
          }
    
          if(getPaysCaAnnee !=null){
            const upadateinfopaysCaYear = {
              countryId: bureau.countryId,
              year: createWeekendyDto.annee,
              caTotal: createWeekendyDto.caTotal + getPaysCaAnnee.caTotal
            };
            await this.payscaservice.updateyear(getPaysCaAnnee._id.toString('hex'), upadateinfopaysCaYear);
          }else{
    
            const infoCapaysYear = {
              countryId: bureau.countryId,
              year: createWeekendyDto.annee,
              caTotal: createWeekendyDto.caTotal
            };
    
            await this.payscaservice.createCaPaysYear(infoCapaysYear)
          }

          return weekendy;

        }
        // bureau ayant une zone ma pas de section
        else if(bureau.sectionId == "" && bureau.zoneId !=""){

          const zoneca = await this.zoneservice.findzonecabyZone(bureau.zoneId, createWeekendyDto.annee);
          const zonecamois = await this.zoneservice.findzonecamoisbyZone(bureau.zoneId, createWeekendyDto.annee, createWeekendyDto.mois);
  
          const tauxzone = await this.tauxzoneservice.findByzone(bureau.zoneId);
          const paysinfobyagence = await this.agenceservice.findbureau(createWeekendyDto.bureauId);
          const getPaysCaMois = await this.payscaservice.findOnePaysCamoisExist(paysinfobyagence.countryId, createWeekendyDto.mois,createWeekendyDto.annee);
          const getPaysCaAnnee = await this.payscaservice.findOnePaysCaYearExist(paysinfobyagence.countryId, createWeekendyDto.annee)
         
            // recuperation des managers du bureau ou hcef
            const managersbureau = await this.affectationservice.findManager_bureau(createWeekendyDto.bureauId);
            const primesz = await this.zoneservice.findprimesz(bureau.zoneId, createWeekendyDto.mois, createWeekendyDto.annee);
            
            // const sectionca = await this.sectionservice.findsectioncabySection(bureau.sectionId, createWeekendyDto.annee);
            // const sectioncamois = await this.sectionservice.findsectioncamoisbySection(bureau.zoneId, createWeekendyDto.annee, createWeekendyDto.mois);
            // const tauxsection = await this.tauxzoneservice.findBysection(bureau.sectionId);
            // const primecs = await this.sectionservice.findprimechefsection(bureau.sectionId, createWeekendyDto.mois, createWeekendyDto.annee);
  

          if(zoneca !=null && zonecamois !=null){
            const updateDatazoneca ={
              zoneId: bureau.zoneId,
              cazone:(createWeekendyDto.caTotal + zoneca.cazone),
              annee: createWeekendyDto.annee
            }; 
    
            const updateDatazonecamois ={
              zoneId: bureau.zoneId,
              cazone:(createWeekendyDto.caTotal + zonecamois.cazone),
              mois: createWeekendyDto.mois,
              annee: createWeekendyDto.annee
            };
            await this.zoneservice.updatezoneca(zoneca._id.toString('hex'),updateDatazoneca);
            await this.zoneservice.updatezonecamois(zonecamois._id.toString('hex'), updateDatazonecamois);
    
            // prime du superviseur de zone
            if(primesz !=null){
              const updateDataprimesz ={
                zoneId: bureau.zoneId,
                cazone:(createWeekendyDto.caTotal + primesz.cazone),
                mois: createWeekendyDto.mois,
                annee: createWeekendyDto.annee,
                primesz: (createWeekendyDto.caTotal*tauxzone.taux_zone/100 + primesz.primesz),
              }; 
      
              await this.zoneservice.updateprimesz(primesz._id.toString('hex'),updateDataprimesz);
    
            }else{
    
              const createDataprime ={
                zoneId: bureau.zoneId,
                cazone:createWeekendyDto.caTotal,
                mois:createWeekendyDto.mois,
                annee: createWeekendyDto.annee,
                primesz: createWeekendyDto.caTotal*tauxzone.taux_zone/100,
              }; 
              await this.zoneservice.createprimesz(createDataprime);
    
            }
    
          }else{
            const createDatazoneca ={
              zoneId: bureau.zoneId,
              cazone:createWeekendyDto.caTotal,
              annee: createWeekendyDto.annee
            }; 
            await this.zoneservice.createzoneca(createDatazoneca);
    
            const createDatazonecamois ={
              zoneId: bureau.zoneId,
              cazone:createWeekendyDto.caTotal,
              mois: createWeekendyDto.mois,
              annee: createWeekendyDto.annee
            }; 
            await this.zoneservice.createzonecamois(createDatazonecamois);
            
            const createDataprime ={
              zoneId: bureau.zoneId,
              cazone:createWeekendyDto.caTotal,
              mois:createWeekendyDto.mois,
              annee: createWeekendyDto.annee,
              primesz: createWeekendyDto.caTotal*tauxzone.taux_zone/100,
            }; 
    
            await this.zoneservice.createprimesz(createDataprime);
    
    
          }
          // produits vendus
          for(let i=0; i < createWeekendyDto.items.length; i++){
            const product = await this.stockagenceService.findagenceproduit(createWeekendyDto.bureauId, createWeekendyDto.items[i].productId);
            const productPrice = await this.produitService.findOne(createWeekendyDto.items[i].productId);
            const produitvendupays = await this.produitvendupaysModel.findOne({paysId: bureau.countryId, productId: createWeekendyDto.items[i].productId,  annee: createWeekendyDto.annee}).exec();
    
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
          // reccupere les managers du bureau
    
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
    
          if(getPaysCaMois !=null){
            const upadateinfopaysCaMois = {
              countryId: paysinfobyagence.countryId,
              mois: createWeekendyDto.mois,
              annee: createWeekendyDto.annee,
              caTotal: createWeekendyDto.caTotal + getPaysCaMois.caTotal
            };
            await this.payscaservice.updateCaPaysMois(getPaysCaMois._id.toString('hex'), upadateinfopaysCaMois);
          }else{
    
            const infoCapays = {
              countryId: paysinfobyagence.countryId,
              mois: createWeekendyDto.mois,
              annee: createWeekendyDto.annee,
              caTotal: createWeekendyDto.caTotal
            };
    
            await this.payscaservice.create(infoCapays)
          }
    
          if(getPaysCaAnnee !=null){
            const upadateinfopaysCaYear = {
              countryId: paysinfobyagence.countryId,
              year: createWeekendyDto.annee,
              caTotal: createWeekendyDto.caTotal + getPaysCaAnnee.caTotal
            };
            await this.payscaservice.updateyear(getPaysCaAnnee._id.toString('hex'), upadateinfopaysCaYear);
          }else{
    
            const infoCapaysYear = {
              countryId: paysinfobyagence.countryId,
              year: createWeekendyDto.annee,
              caTotal: createWeekendyDto.caTotal
            };
    
            await this.payscaservice.createCaPaysYear(infoCapaysYear)
          }
          return weekendy;

        }
        // sinon la section et la zone existe pour le bureau
        else{
          const zoneca = await this.zoneservice.findzonecabyZone(bureau.zoneId, createWeekendyDto.annee);
          const zonecamois = await this.zoneservice.findzonecamoisbyZone(bureau.zoneId, createWeekendyDto.annee, createWeekendyDto.mois);
  
          const tauxzone = await this.tauxzoneservice.findByzone(bureau.zoneId);
          const paysinfobyagence = await this.agenceservice.findbureau(createWeekendyDto.bureauId);
          const getPaysCaMois = await this.payscaservice.findOnePaysCamoisExist(paysinfobyagence.countryId, createWeekendyDto.mois,createWeekendyDto.annee);
          const getPaysCaAnnee = await this.payscaservice.findOnePaysCaYearExist(paysinfobyagence.countryId, createWeekendyDto.annee)
         
            // recuperation des managers du bureau ou hcef
            const managersbureau = await this.affectationservice.findManager_bureau(createWeekendyDto.bureauId);
            const primesz = await this.zoneservice.findprimesz(bureau.zoneId, createWeekendyDto.mois, createWeekendyDto.annee);
            
            const sectionca = await this.sectionservice.findsectioncabySection(bureau.sectionId, createWeekendyDto.annee);
            const sectioncamois = await this.sectionservice.findsectioncamoisbySection(bureau.zoneId, createWeekendyDto.annee, createWeekendyDto.mois);
            const tauxsection = await this.tauxzoneservice.findBysection(bureau.sectionId);
            const primecs = await this.sectionservice.findprimechefsection(bureau.sectionId, createWeekendyDto.mois, createWeekendyDto.annee);
  
          // traitement des information de la section 
          if(sectionca !=null && sectioncamois !=null){
            const updateDatasectionca ={
              sectionId: bureau.sectionId,
              casection: (createWeekendyDto.caTotal + sectionca.casection),
              annee: createWeekendyDto.annee
            }; 
    
            const updateDatasectioncamois ={
              sectionId: bureau.sectionId,
              casection:(createWeekendyDto.caTotal + sectioncamois.casection),
              mois: createWeekendyDto.mois,
              annee: createWeekendyDto.annee
            };
            await this.sectionservice.updatesectionca(sectionca._id.toString('hex'), updateDatasectionca);
            await this.sectionservice.updateprimechefsection(sectioncamois._id.toString('hex'), updateDatasectioncamois);
    
    
            if(primecs !=null){
              const updateDataprimecs ={
                sectionId: bureau.sectionId,
                casection:(createWeekendyDto.caTotal + primecs.casection),
                mois: createWeekendyDto.mois,
                annee: createWeekendyDto.annee,
                Chefsectionprime: (createWeekendyDto.caTotal*tauxsection.taux_section/100 + primecs.Chefsectionprime),
              }; 
      
              await this.sectionservice.updateprimechefsection(primecs._id.toString('hex'),updateDataprimecs);
    
            }
            else{
    
              const createDataprimecs ={
                sectionId: bureau.sectionId,
                casection: createWeekendyDto.caTotal,
                Chefsectionprime:createWeekendyDto.caTotal*tauxsection.taux_section/100,
                mois:createWeekendyDto.mois,
                annee: createWeekendyDto.annee,
              }; 
              await this.sectionservice.createprimechefsection(createDataprimecs);
    
            }
    
          }else{
            const createDatasectionca ={
              sectionId: bureau.sectionId,
              casection:createWeekendyDto.caTotal,
              annee: createWeekendyDto.annee
            }; 
            await this.sectionservice.createcasection(createDatasectionca);
    
            const createDatasectioncamois ={
              sectionId: bureau.sectionId,
              casection:createWeekendyDto.caTotal,
              mois: createWeekendyDto.mois,
              annee: createWeekendyDto.annee
            }; 
            await this.sectionservice.createcasection(createDatasectioncamois);
            
            const createDataprime ={
              sectionId: bureau.sectionId,
              casection: createWeekendyDto.caTotal,
              Chefsectionprime:createWeekendyDto.caTotal*tauxsection.taux_section/100,
              mois:createWeekendyDto.mois,
              annee: createWeekendyDto.annee,
            }; 
    
            await this.sectionservice.createprimechefsection(createDataprime);
    
          }
          // fin des traitements liés à la section

          // traitement de la zone du bureau
          if(zoneca !=null && zonecamois !=null){
            const updateDatazoneca ={
              zoneId: bureau.zoneId,
              cazone:(createWeekendyDto.caTotal + zoneca.cazone),
              annee: createWeekendyDto.annee
            }; 

            const updateDatazonecamois ={
              zoneId: bureau.zoneId,
              cazone:(createWeekendyDto.caTotal + zonecamois.cazone),
              mois: createWeekendyDto.mois,
              annee: createWeekendyDto.annee
            };
            await this.zoneservice.updatezoneca(zoneca._id.toString('hex'),updateDatazoneca);
            await this.zoneservice.updatezonecamois(zonecamois._id.toString('hex'), updateDatazonecamois);

            if(primesz !=null){
              const updateDataprimesz ={
                zoneId: bureau.zoneId,
                cazone:(createWeekendyDto.caTotal + primesz.cazone),
                mois: createWeekendyDto.mois,
                annee: createWeekendyDto.annee,
                primesz: (createWeekendyDto.caTotal*tauxzone.taux_zone/100 + primesz.primesz),
              }; 
      
              await this.zoneservice.updateprimesz(primesz._id.toString('hex'),updateDataprimesz);

            }else{

              const createDataprime ={
                zoneId: bureau.zoneId,
                cazone:createWeekendyDto.caTotal,
                mois:createWeekendyDto.mois,
                annee: createWeekendyDto.annee,
                primesz: createWeekendyDto.caTotal*tauxzone.taux_zone/100,
              }; 
              await this.zoneservice.createprimesz(createDataprime);

            }

          }else{
            const createDatazoneca ={
              zoneId: bureau.zoneId,
              cazone:createWeekendyDto.caTotal,
              annee: createWeekendyDto.annee
            }; 
            await this.zoneservice.createzoneca(createDatazoneca);

            const createDatazonecamois ={
              zoneId: bureau.zoneId,
              cazone:createWeekendyDto.caTotal,
              mois: createWeekendyDto.mois,
              annee: createWeekendyDto.annee
            }; 
            await this.zoneservice.createzonecamois(createDatazonecamois);
            
            const createDataprime ={
              zoneId: bureau.zoneId,
              cazone:createWeekendyDto.caTotal,
              mois:createWeekendyDto.mois,
              annee: createWeekendyDto.annee,
              primesz: createWeekendyDto.caTotal*tauxzone.taux_zone/100,
            }; 

            await this.zoneservice.createprimesz(createDataprime);


          }
              
          // produits vendus
          for(let i=0; i < createWeekendyDto.items.length; i++){
            const product = await this.stockagenceService.findagenceproduit(createWeekendyDto.bureauId, createWeekendyDto.items[i].productId);
            const productPrice = await this.produitService.findOne(createWeekendyDto.items[i].productId);
            const produitvendupays = await this.produitvendupaysModel.findOne({paysId: bureau.countryId, productId: createWeekendyDto.items[i].productId,  annee: createWeekendyDto.annee}).exec();

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
          // reccupere les managers du bureau

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

          // const paysinfobyagence = await this.agenceservice.findbureau(createWeekendyDto.bureauId);

          // const getPaysCaMois = await this.payscaservice.findOnePaysCamoisExist(paysinfobyagence.countryId, createWeekendyDto.mois,createWeekendyDto.annee);
          // const getPaysCaAnnee = await this.payscaservice.findOnePaysCaYearExist(paysinfobyagence.countryId, createWeekendyDto.annee)
          if(getPaysCaMois !=null){
            const upadateinfopaysCaMois = {
              countryId: paysinfobyagence.countryId,
              mois: createWeekendyDto.mois,
              annee: createWeekendyDto.annee,
              caTotal: createWeekendyDto.caTotal + getPaysCaMois.caTotal
            };
            await this.payscaservice.updateCaPaysMois(getPaysCaMois._id.toString('hex'), upadateinfopaysCaMois);
          }else{

            const infoCapays = {
              countryId: paysinfobyagence.countryId,
              mois: createWeekendyDto.mois,
              annee: createWeekendyDto.annee,
              caTotal: createWeekendyDto.caTotal
            };

            await this.payscaservice.create(infoCapays)
          }

          if(getPaysCaAnnee !=null){
            const upadateinfopaysCaYear = {
              countryId: paysinfobyagence.countryId,
              year: createWeekendyDto.annee,
              caTotal: createWeekendyDto.caTotal + getPaysCaAnnee.caTotal
            };
            await this.payscaservice.updateyear(getPaysCaAnnee._id.toString('hex'), upadateinfopaysCaYear);
          }else{

            const infoCapaysYear = {
              countryId: paysinfobyagence.countryId,
              year: createWeekendyDto.annee,
              caTotal: createWeekendyDto.caTotal
            };

            await this.payscaservice.createCaPaysYear(infoCapaysYear)
          }

        }
        return weekendy;
      }
    }
  }
// modification directe
  async weekendiestockagence(){
    const weekendies = await this.weekendyModel.find().exec();
    for(let i=0; i<weekendies.length; i++){
      for(let j=0; j<weekendies[i].items.length; j++){
        const product = await this.stockagenceService.findagenceproduit(weekendies[i]['bureauId'], weekendies[i]['items'][j].productId);
        const updatestockagence: UpdateStockagenceDto = {
          agenceId:weekendies[i]['bureauId'],
          productId: weekendies[i]['items'][j].productId.toString(),
          quantity: product.quantity - (Number(weekendies[i]['items'][j].quantity)),
          quantitytotalenmagasin: product.quantitytotalenmagasin
       };
       console.log('updatestockagence',updatestockagence);
       await this.stockagenceService.updateagenceStock(product._id.toString('hex'),  updatestockagence);
      }

    }
  }
  // finde modification directe

  async findweekendies(){
    const weekendies = await this.weekendyModel.find().exec();
    console.log(weekendies);
    for(let i=0; i<weekendies.length; i++){
      const paysinfobyagence = await this.agenceservice.findbureau(weekendies[i].bureauId);
      const getPaysCaMois = await this.payscaservice.findOnePaysCamoisExist(paysinfobyagence.countryId, weekendies[i].mois,weekendies[i].annee);
      const getPaysCaAnnee = await this.payscaservice.findOnePaysCaYearExist(paysinfobyagence.countryId, weekendies[i].annee)
      if(getPaysCaMois !=null){
        const upadateinfopaysCaMois = {
          countryId: paysinfobyagence.countryId,
          mois: weekendies[i].mois,
          annee: weekendies[i].annee,
          caTotal: weekendies[i].caTotal + getPaysCaMois.caTotal
        };
        await this.payscaservice.updateCaPaysMois(getPaysCaMois._id.toString('hex'), upadateinfopaysCaMois);
      }else{

        const infoCapays = {
          countryId: paysinfobyagence.countryId,
          mois: weekendies[i].mois,
          annee: weekendies[i].annee,
          caTotal: weekendies[i].caTotal
        };

        await this.payscaservice.create(infoCapays)
      }

      if(getPaysCaAnnee !=null){
        const upadateinfopaysCaYear = {
          countryId: paysinfobyagence.countryId,
          year: weekendies[i].annee,
          caTotal: weekendies[i].caTotal + getPaysCaAnnee.caTotal
        };
        await this.payscaservice.updateyear(getPaysCaAnnee._id.toString('hex'), upadateinfopaysCaYear);
      }else{

        const infoCapaysYear = {
          countryId: paysinfobyagence.countryId,
          year: weekendies[i].annee,
          caTotal: weekendies[i].caTotal
        };

        await this.payscaservice.createCaPaysYear(infoCapaysYear)
      }
    }
  }

  async createVenteDocteur(createDocteurWeekendyDto: CreateDocteurWeekendyDto){
    console.log(createDocteurWeekendyDto);
    const weekendproduct = [];

    for(let i=0; i<createDocteurWeekendyDto.items.length; i++){
      const product = await this.stockagenceService.findagenceproduit(createDocteurWeekendyDto.bureauId, createDocteurWeekendyDto.items[i].productId);
      const value = Number(product.quantity) - Number(createDocteurWeekendyDto.items[i].quantity);

      if(value >=0){
        weekendproduct.push(createDocteurWeekendyDto.items[i]);
      }else{
        const produitindispo = await this.produitService.findOne(createDocteurWeekendyDto.items[i].productId);
        // console.log('produit rupture', produitindispo.name);
        throw new BadRequestException('Echèc d\'enregistrement du weekendy ' + ` ${produitindispo.name} ` + ' n\'est pas en stock suffisant dans ce bureau. ');
      }
    }
    const createdDataDto = {
      bureauId: createDocteurWeekendyDto.bureauId,
      doctorId: createDocteurWeekendyDto.doctorId,
      mois: createDocteurWeekendyDto.mois,
      annee: createDocteurWeekendyDto.annee,
      items: weekendproduct,
      caTotal:createDocteurWeekendyDto.caTotal,
      createdAt: createDocteurWeekendyDto.createdAt
    };


    const alreadyExists = await this.weekendyDocteurModel.findOne({ bureauId: createdDataDto.bureauId, doctorId: createdDataDto.doctorId,
      mois: createdDataDto.mois, annee:createdDataDto.annee}).exec();

    if(alreadyExists == null){
      const weekendy = await this.weekendyDocteurModel.create(createdDataDto);

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
            const updatestockagence: UpdateStockagenceDto = {
              agenceId:createDocteurWeekendyDto.bureauId,
              productId: createDocteurWeekendyDto.items[i].productId,
              quantity: product.quantity - createDocteurWeekendyDto.items[i].quantity,
              quantitytotalenmagasin: product.quantitytotalenmagasin
            };
          await this.stockagenceService.updateagenceStock(product._id.toString('hex'),  updatestockagence);
          }
        }
        
        const paysinfobyagence = await this.agenceservice.findbureau(createDocteurWeekendyDto.bureauId);

        const infoCapays = {
          countryId: paysinfobyagence.countryId,
          mois: createDocteurWeekendyDto.mois,
          annee: createDocteurWeekendyDto.annee,
          caTotal: createDocteurWeekendyDto.caTotal
        };

        const getPaysCaMois = await this.payscaservice.findOnePaysCamoisExist(infoCapays.countryId, createDocteurWeekendyDto.mois, createDocteurWeekendyDto.annee);
        const getPaysCaYear = await this.payscaservice.findOnePaysCaYearExist(infoCapays.countryId, createDocteurWeekendyDto.annee);


        if(getPaysCaMois !=null){
          const upadateinfopaysCaMois = {
            countryId: paysinfobyagence.countryId,
            mois: createDocteurWeekendyDto.mois,
            annee: createDocteurWeekendyDto.annee,
            caTotal: createDocteurWeekendyDto.caTotal + getPaysCaMois.caTotal
          };
          await this.payscaservice.updateCaPaysMois(getPaysCaMois._id.toString('hex'), upadateinfopaysCaMois);
        }else{

          await this.payscaservice.create(infoCapays)
        }

        if(getPaysCaYear !=null){
          const upadateinfopaysCaYear = {
            countryId: paysinfobyagence.countryId,
            year: createDocteurWeekendyDto.annee,
            caTotal: createDocteurWeekendyDto.caTotal + getPaysCaYear.caTotal
          };
          await this.payscaservice.updateyear(getPaysCaYear._id.toString('hex'), upadateinfopaysCaYear);
        }else{

          await this.payscaservice.createCaPaysYear(infoCapays)
        }



      }
      return weekendy;


    }else{

      throw new ConflictException(`Pour ce docteur il existe déjà un Monthending pour ce mois et pour cette année dans la base de données`);
    }
    // console.log(weekendy);
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

  async findAllVenteByDocteur(doctorId: string) {
    const weekendy = await this.weekendyDocteurModel
                                .find({doctorId: doctorId})
                                .populate('bureauId')
                                .populate('mois')
                                .populate('annee').exec();
    return weekendy;
  }

  async findSingleByDocteur(id: string) {
    const weekendy = await this.weekendyDocteurModel
                                .findById(id)
                                .populate('bureauId')
                                .populate('doctorId')
                                .populate('mois')
                                .populate('annee').exec();
    return weekendy;
  }

  async allGetAllProduitVendyPays(query: QueryDto){
    const result=[];
    // console.log('query', query);
    const ventes = await this.produitvendupaysModel.find({paysId: query.paysId, annee: query.anneeId}).populate('paysId').populate('productId').populate('annee').exec();
    // console.log('ventes',ventes);
    return ventes;                                               
  }

  async createSalaireDoctor(query: SalairekineDTO){
    const salaireExist = await this.salaireDoctorModel.findOne({employerId: query.employerId, mois: query.mois, annee: query.annee}).exec();
    if(salaireExist !=null){
      return {
        message: 'Le salaire pour cet employé a déjà été payé pour ce mois',
        status: 403,
        data: salaireExist
      }
    }else{
      const createdSalaire = await this.salaireDoctorModel.create(query);
      return {
        message: 'Succès je création',
        status: 200,
        data: createdSalaire
      }
    }
  }

  async allGetAllSalaireByDoctor(id: string){
      const salairesDoctor = await this.salaireDoctorModel.find({employerId: id});
      return salairesDoctor;  
  }

  async findSigleDoctorSalary(id: string){
    return await this.salaireDoctorModel.findById(id).exec();
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

  async remove(weekedyId: string) {
    const weekendy = await this.weekendyModel.findById(weekedyId).exec();
    if(weekendy !=null){
      const bureau = await this.agenceservice.findbureau(weekendy.bureauId);
      const zoneca = await this.zoneservice.findzonecabyZone(bureau.zoneId, weekendy.annee);

      const tauxzone = await this.tauxzoneservice.findByzone(bureau.zoneId);

      // zone prime and ca
      if(zoneca !=null){
        const updateDatazoneca ={
          zoneId: bureau.zoneId,
          cazone: zoneca['cazone'] - weekendy.caTotal,
          annee: weekendy.annee
        }; 
        await this.zoneservice.updatezoneca(zoneca._id.toString('hex'),updateDatazoneca);

        const primesz = await this.zoneservice.findprimesz(bureau.zoneId, weekendy.mois, weekendy.annee);

        
          const updateDataprimesz ={
            zoneId: bureau.zoneId,
            cazone:(weekendy.caTotal + primesz.cazone),
            annee: weekendy.annee,
            primesz: primesz.primesz - (weekendy.caTotal*tauxzone.taux_zone/100),
          }; 
  
          await this.zoneservice.updateprimesz(primesz._id.toString('hex'),updateDataprimesz);

       

      
      for(let i=0; i < weekendy.items.length; i++){
        const product = await this.stockagenceService.findagenceproduit(weekendy.bureauId, weekendy.items[i].productId);
        const productPrice = await this.produitService.findOne(weekendy.items[i].productId);
        const produitvendupays = await this.produitvendupaysModel.findOne({paysId: bureau.countryId, productId: weekendy.items[i].productId,  annee: weekendy.annee}).exec();
        
        const updatedproduitvenduDto = {
          paysId: bureau.countryId,
          productId: weekendy.items[i].productId,
          quantity: produitvendupays.quantity - weekendy.items[i].quantity,
          annee: weekendy.annee,
          chiffreaffaire: produitvendupays.chiffreaffaire - weekendy.items[i].quantity*productPrice.price 
        };
        await this.produitvendupaysModel.findByIdAndUpdate({_id: produitvendupays._id}, updatedproduitvenduDto, {new: true}).lean();

        if(product !=null){
          const updatedStockagence = {
           quantity: product.quantitytotalenmagasin - (weekendy.items[i].quantity)
          };
          const updatestockagence: UpdateStockagenceDto = {
            agenceId:weekendy.bureauId,
            productId: weekendy.items[i].productId,
            quantity: product.quantity + weekendy.items[i].quantity,
            quantitytotalenmagasin: product.quantitytotalenmagasin
         };
         await this.stockagenceService.updateagenceStock(product._id.toString('hex'),  updatestockagence);
      }
      }
      const managersbureau = await this.affectationservice.findManager_bureau(weekendy.bureauId);

      const salaireBureau = await this.salaireService.findsailairebureaumoisannee(weekendy.bureauId, weekendy.mois, weekendy.annee)
      if(salaireBureau){
        this.salaireService.remove(salaireBureau._id.toString('hex'));
        const salairemanager = await this.salairemanagerService.findsailairemanager(salaireBureau._id.toString('hex'));
        if(salairemanager){
          this.salairemanagerService.remove(salairemanager._id.toString('hex'));
        }
      }
      const taux = await this.tauxservice.findAll();
     
      const paysinfobyagence = await this.agenceservice.findbureau(weekendy.bureauId);

      const getPaysCaMois = await this.payscaservice.findOnePaysCamoisExist(paysinfobyagence.countryId, weekendy.mois,weekendy.annee);
      const getPaysCaAnnee = await this.payscaservice.findOnePaysCaYearExist(paysinfobyagence.countryId, weekendy.annee)
      
        const upadateinfopaysCaMois = {
          countryId: paysinfobyagence.countryId,
          mois: weekendy.mois,
          annee: weekendy.annee,
          caTotal: getPaysCaMois.caTotal - weekendy.caTotal
        };
        await this.payscaservice.updateCaPaysMois(getPaysCaMois._id.toString('hex'), upadateinfopaysCaMois);
      
        const upadateinfopaysCaYear = {
          countryId: paysinfobyagence.countryId,
          year: weekendy.annee,
          caTotal: getPaysCaAnnee.caTotal - weekendy.caTotal
        };
        await this.payscaservice.updateyear(getPaysCaAnnee._id.toString('hex'), upadateinfopaysCaYear);
      
      }
    }
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

  async weekendybackup(){
    return this.weekendyModel.find().exec();
  }

  async getCombinedData() {
    const weekendDoctors = await this.weekendyDocteurModel
        .find()
        .populate('bureauId')
        .populate('doctorId')
        .populate('mois')
        .populate('annee')
        .exec();

    const weekends = await this.weekendyModel
        .find()
        .populate('bureauId')
        .populate('mois')
        .populate('annee')
        .exec();

    // Combiner les données selon votre logique
    const combinedData = weekendDoctors.map((doctor) => {
        const weekend = weekends.find((w) => w.bureauId === doctor.bureauId && w.mois === doctor.mois && w.annee === doctor.annee);

        return {
            doctorId: doctor.doctorId,
            bureauId: doctor.bureauId,
            mois: doctor.mois,
            annee: doctor.annee,
            doctorItems: doctor.items,
            weekendItems: weekend ? weekend.items : [],
            caTotal: doctor.caTotal,
            TotaltoBank: weekend ? weekend.TotaltoBank : 0,
            chargebureauTotal: weekend ? weekend.chargebureauTotal : 0,
            primetrsportTotal: weekend ? weekend.primetrsportTotal : 0,
            createdAt: doctor.createdAt,
        };
    });

    return combinedData;

  }

  async suppressiondirecte(id: string) {

    const weekedy = await this.weekendyModel.findOne({bureauId: id}).exec();           
    if (weekedy !=null) {
      await this.weekendyModel.findByIdAndRemove({_id: weekedy._id});
    }
    return 'supprimé weekedy';
  }

  async getGroupedQuantitiesByYear(yearId: string) {
    return await this.weekendyModel.find({annee: yearId}).populate('bureauId').populate('annee').populate('mois').exec();
}


  
}
