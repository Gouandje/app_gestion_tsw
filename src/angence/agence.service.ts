import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAgenceDto } from './dto/create-agence.dto';
import { UpdateAgenceDto } from './dto/update-agence.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AgenceDocument, Agence } from './schemas/agence.schema';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { SectionService } from 'src/section/section.service';
import { PaysService } from 'src/pays/pays.service';
import { ZoneService } from 'src/zone/zone.service';
import { CreateAgenceLocationDto } from './dto/agence-location.dto';
import { LocationAgence, LocationAgenceDocument } from './schemas/locationagence.schema';
import { UpdateAgenceLocationDto } from './dto/update-agence-location.dto';


@Injectable()
export class AgenceService {
  
  constructor(
    @InjectModel(Agence.name) private readonly agenceModel: Model<AgenceDocument>,
    @InjectModel(LocationAgence.name) private readonly agencelocationModel: Model<LocationAgenceDocument>,
    private readonly countryService: PaysService,
    private readonly zoneService: ZoneService,
    private readonly sectionService: SectionService,
  ) {}

  async create(createAgenceDto: CreateAgenceDto): Promise<Agence> {
    const alreadyExists = await this.agenceModel.exists({ name: createAgenceDto.bureau_name }).lean();
    if(alreadyExists){
      throw new ConflictException(`cet produit existe déjà dans la base de données`);
    }
  
    const createdAgence = await this.agenceModel.create(createAgenceDto);

    if (!createdAgence) {
      throw new InternalServerErrorException(
        'Impossible de créer le produit, veuillez réessayer',
      );
    }
    return createdAgence;
  }

  async findAll(){
    const agences = await this.agenceModel.find()
                              .populate('countryId')
                              // .populate('zoneId')
                              .exec();

    const sections = await this.sectionService.findAll();
    const zones = await this.zoneService.findAll();
    return {agences, sections, zones};
  }

  async findAllForMvt(){
    const agences = await this.agenceModel.find()
                              .populate('countryId')
                              // .populate('zoneId')
                              .exec();

    // const sections = await this.sectionService.findAll()
    return agences;
  }

  async findAllagenceByCountry(id: string){
    const agences = await this.agenceModel.find({countryId: id})
                              .populate('countryId')
                              // .populate('zoneId')
                              // .populate('sectionId')
                              .exec();
    return agences;
  }

  async findAllagenceCountry(id: string){
    const agences = await this.agenceModel.find({countryId: id}).exec();
    return agences;
  }

  async findAllagenceByZone(id: string): Promise<Agence[]> {
    const agences = await this.agenceModel.find({zoneId: id})
                              .populate('countryId')
                              // .populate('zoneId')
                              // .populate('sectionId')
                              .exec();
    return agences;
  }

  async findAllagenceZone(id: string) {
    const agences = await this.agenceModel.find({zoneId: id}).exec();
    return agences;
  }

  async findAllagenceSection(id: string) {
    const agences = await this.agenceModel.find({sectionId: id}).exec();
    return agences;
  }

  async findOne(bureauId: string) {
    const findagence = await this.agenceModel.findOne({_id: bureauId}).populate('countryId').exec();
    // console.log(findagence);
    if (!findagence) {
      throw new NotFoundException('agence non trouvée');
    }else{
      if(findagence.zoneId=='' && findagence.sectionId==''){
        return {findagence, zone: '', section:''};
  
      }else if(findagence.zoneId=='' && findagence.sectionId!=''){
        const section = await this.sectionService.findOne(findagence.sectionId);
        return {findagence, section, zone: ''};

      }else if(findagence.zoneId!='' && findagence.sectionId==''){
        const zone = await this.zoneService.findOneZonebyId(findagence.zoneId);
        return {
          findagence, zone, section:''
        };

      }else{
        const zone = await this.zoneService.findOneZonebyId(findagence.zoneId);
        const section = await this.sectionService.findOne(findagence.sectionId);
        return {
          findagence,
          zone,
          section
        };

      }
    }

    
  }

  async updateDirect(){

    const data = [
      {
          "_id": "65eaa175382bb54abbf6ce63",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65e9eff7382bb54abbf6cdaf",
          "sectionId": "",
          "bureau_name": "Aboisso"
      },
      {
          "_id": "65eaa18b382bb54abbf6ce6d",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId": "65e9eff7382bb54abbf6cdaf",
          "sectionId": "",
          "bureau_name": "Gonzague"
      },
      {
          "_id": "65eaa19b382bb54abbf6ce77",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId": "65e9eff7382bb54abbf6cdaf",
          "sectionId": "",
          "bureau_name": "Koumassi 1"
      },
      {
          "_id": "65eaa1a5382bb54abbf6ce81",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId": "65e9eff7382bb54abbf6cdaf",
          "sectionId": "",
          "bureau_name": "Koumassi 2"
      },
      {
          "_id": "65eaa1b4382bb54abbf6ce8b",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65e9eff7382bb54abbf6cdaf",
          "sectionId": "",
          "bureau_name": "Canada 1"
      },
      {
          "_id": "65eaa1bb382bb54abbf6ce95",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65e9eff7382bb54abbf6cdaf",
          
          "sectionId": "",
          "bureau_name": "Canada 2"
      },
      {
          "_id": "65eaa1dd382bb54abbf6cea0",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65e9efff382bb54abbf6cdb5",
          "sectionId": "",
          "bureau_name": "Grand-Bassam"
      },
      {
          "_id": "65eaa1f2382bb54abbf6ceaa",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65e9efff382bb54abbf6cdb5",
          "sectionId": "",
          "bureau_name": "Vridi-Cité"
      },
      {
          "_id": "65eaa201382bb54abbf6ceb4",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId": "65e9efff382bb54abbf6cdb5",
          "sectionId": "",
          "bureau_name": "Américain 1"
      },
      {
          "_id": "65eaa209382bb54abbf6cebe",
          "countryId":  "65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65e9efff382bb54abbf6cdb5",
          "sectionId": "",
          "bureau_name": "Américain 2"
      },
      {
          "_id": "65eaa22a382bb54abbf6cec8",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId": "65e9efff382bb54abbf6cdb5",
          "sectionId": "",
          "bureau_name": "Port-Bouët centre"
      },
      {
          "_id": "65eaa233382bb54abbf6ced2",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId": "65e9efff382bb54abbf6cdb5",
          "sectionId": "",
          "bureau_name": "Bonoua"
      },
      {
          "_id": "65eaa253382bb54abbf6cedd",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId": "65e9f029382bb54abbf6cdc7",
          "sectionId": "",
          "bureau_name": "Azito"
      },
      {
          "_id": "65eaa25e382bb54abbf6cee7",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId": "65e9f029382bb54abbf6cdc7",
          "sectionId": "",
          "bureau_name": "Abobodoumé"
      },
      {
          "_id": "65eaa26d382bb54abbf6cef1",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65e9f029382bb54abbf6cdc7",
          "sectionId": "",
          "bureau_name": "Yopougon 1"
      },
      {
          "_id": "65eaa278382bb54abbf6cefb",
          "countryId": "65e9ef34382bb54abbf6cd9a",    
          "zoneId": "65e9f029382bb54abbf6cdc7",
          "sectionId": "",
          "bureau_name": "Yopougon Lem"
      },
      {
          "_id": "65eaa287382bb54abbf6cf05",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId": "65e9f029382bb54abbf6cdc7",
          "sectionId": "",
          "bureau_name": "Yopougon Siporex"
      },
      {
          "_id": "65eaa29a382bb54abbf6cf10",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId": "65e9f032382bb54abbf6cdcd",
          "sectionId": "",
          "bureau_name": "Dabou"
      },
      {
          "_id": "65eaa2ac382bb54abbf6cf1a",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId": "65e9f032382bb54abbf6cdcd",
          "sectionId": "",
          "bureau_name": "Grand-Lahou"
      },
      {
          "_id": "65eaa2ba382bb54abbf6cf24",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65e9f032382bb54abbf6cdcd",
          "sectionId": "",
          "bureau_name": "Yopougon 2"
      },
      {
          "_id": "65eaa2c3382bb54abbf6cf2e",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65e9f032382bb54abbf6cdcd",
          "sectionId": "",
          "bureau_name": "Yopougon 5"
      },
      {
          "_id": "65eaa2cc382bb54abbf6cf38",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65e9f032382bb54abbf6cdcd",
          "sectionId": "",
          "bureau_name": "Yopougon 3"
      },
      {
          "_id": "65eaa2de382bb54abbf6cf42",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65e9f032382bb54abbf6cdcd",
          "sectionId": "",
          "bureau_name": "Sikensi"
      },
      {
          "_id": "65eaa2fc382bb54abbf6cf4f",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65ea9ebc382bb54abbf6cdd6",
          "sectionId": "65eaa0d1382bb54abbf6ce40",
          "bureau_name": "Odiéné"
      },
      {
          "_id": "65eaa31d382bb54abbf6cf59",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9ebc382bb54abbf6cdd6",
          "sectionId": "65eaa0d1382bb54abbf6ce40",
          "bureau_name": "Boundiali"
      },
      {
          "_id": "65eaa32f382bb54abbf6cf63",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9ebc382bb54abbf6cdd6",
          "sectionId": "65eaa0d1382bb54abbf6ce40",
          "bureau_name": "Korhogo"
      },
      {
          "_id": "65eaa341382bb54abbf6cf6d",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9ebc382bb54abbf6cdd6",
          "sectionId": "65eaa0d1382bb54abbf6ce40",
          "bureau_name": "Ferké"
      },
      {
          "_id": "65eaa427382bb54abbf6cf9a",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9ec4382bb54abbf6cddc",
          "sectionId": "65eaa397382bb54abbf6cf83",
          "bureau_name": "Dabakala"
      },
      {
          "_id": "65eaa431382bb54abbf6cfa4",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9ec4382bb54abbf6cddc",
          "sectionId": "65eaa397382bb54abbf6cf83",
          "bureau_name": "Bouaké"
      },
      {
          "_id": "65eaa43d382bb54abbf6cfae",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65ea9ec4382bb54abbf6cddc",
          "sectionId": "65eaa397382bb54abbf6cf83",
          "bureau_name": "Katiola"
      },
      {
          "_id": "65eaa44b382bb54abbf6cfb8",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9ec4382bb54abbf6cddc",
          "sectionId": "65eaa397382bb54abbf6cf83",
          "bureau_name": "Beoumi"
      },
      {
          "_id": "65eaa470382bb54abbf6cfc5",
          "countryId":  "65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9f2d382bb54abbf6cdf4",
          "sectionId": "65ea9fed382bb54abbf6ce1d",
          "bureau_name": "Adzopé"
      },
      {
          "_id": "65eaa47f382bb54abbf6cfcf",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9f2d382bb54abbf6cdf4",
          "sectionId": "65ea9fed382bb54abbf6ce1d",
          "bureau_name": "Abengourou"
      },
      {
          "_id": "65eaa491382bb54abbf6cfd9",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId":"65ea9f2d382bb54abbf6cdf4",
          "sectionId": "65ea9fed382bb54abbf6ce1d",
          "bureau_name": "Agnibilékrou"
      },
      {
          "_id": "65eaa49f382bb54abbf6cfe3",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65ea9f2d382bb54abbf6cdf4",
          "sectionId": "65ea9fed382bb54abbf6ce1d",
          "bureau_name": "Daoukro"
      },
      {
          "_id": "65eaa4af382bb54abbf6cfed",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9f2d382bb54abbf6cdf4",
          "sectionId": "65ea9fed382bb54abbf6ce1d",
          "bureau_name": "Bondoukou"
      },
      {
          "_id": "65eaa4bc382bb54abbf6cff7",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9f2d382bb54abbf6cdf4",
          "sectionId": "65ea9fed382bb54abbf6ce1d",
          "bureau_name": "Agboville"
      },
      {
          "_id": "65eaa4d7382bb54abbf6d004",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9f26382bb54abbf6cdee",
          "sectionId": "65eaa12f382bb54abbf6ce54",
          "bureau_name": "Bouaflé"
      },
      {
          "_id": "65eaa4e8382bb54abbf6d00e",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9f26382bb54abbf6cdee",
          "sectionId": "65eaa12f382bb54abbf6ce54",
          "bureau_name": "Yamoussoukro"
      },
      {
          "_id": "65eaa4f3382bb54abbf6d018",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9f26382bb54abbf6cdee",
          "sectionId": "65eaa12f382bb54abbf6ce54",
          "bureau_name": "Toumodi"
      },
      {
          "_id": "65eaa503382bb54abbf6d022",
          "countryId": "65e9ef34382bb54abbf6cd9a", 
          "zoneId": "65ea9f26382bb54abbf6cdee",
          "sectionId": "65eaa12f382bb54abbf6ce54",
          "bureau_name": "Dimbokro"
      },
      {
          "_id": "65eaa50f382bb54abbf6d02c",
          "countryId":"65e9ef34382bb54abbf6cd9a", 
          "zoneId":  "65ea9f26382bb54abbf6cdee",
          "sectionId": "65eaa12f382bb54abbf6ce54",
          "bureau_name": "Bocanda"
      },
      {
          "_id": "65eaa52f382bb54abbf6d036",
          "countryId":"65e9ef34382bb54abbf6cd9a",   
          "zoneId":  "65ea9f26382bb54abbf6cdee",
          "sectionId": "65eaa12f382bb54abbf6ce54",
          "bureau_name": "Bongouanou"
      },
      {
          "_id": "65eaa553382bb54abbf6d041",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId": "65e9f00b382bb54abbf6cdbb",
          "sectionId": "",
          "bureau_name": "Angré"
      },
      {
          "_id": "65eaa564382bb54abbf6d04b",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId": "65e9f00b382bb54abbf6cdbb",
          "sectionId": "",
          "bureau_name": "N'Dotré"
      },
      {
          "_id": "65eaa573382bb54abbf6d055",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId": "65e9f00b382bb54abbf6cdbb",
          "sectionId": "",
          "bureau_name": "Bingerville Feh-Késsé"
      },
      {
          "_id": "65eaa58b382bb54abbf6d05f",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId": "65e9f00b382bb54abbf6cdbb",
          "sectionId": "",
          "bureau_name": "Abobo PK18"
      },
      {
          "_id": "65eaa5b4382bb54abbf6d073",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId":"65e9f00b382bb54abbf6cdbb",
          "sectionId": "",
          "bureau_name": "Williamsville"
      },
      {
          "_id": "65eaa5e3382bb54abbf6d07e",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65e9f014382bb54abbf6cdc1",
          "sectionId": "",
          "bureau_name": "Akéïkoi"
      },
      {
          "_id": "65eaa5f3382bb54abbf6d088",
          "countryId":  "65e9ef34382bb54abbf6cd9a",
          "zoneId": "65e9f014382bb54abbf6cdc1",
          "sectionId": "",
          "bureau_name": "Dokui"
      },
      {
          "_id": "65eaa610382bb54abbf6d092",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId":"65e9f014382bb54abbf6cdc1",
          "sectionId": "",
          "bureau_name": "Abobo Kénnédy"
      },
      {
          "_id": "65eaa61b382bb54abbf6d09c",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId":"65e9f014382bb54abbf6cdc1",
          "sectionId": "",
          "bureau_name": "Bingerville Centre"
      },
      {
          "_id": "65eaa67c382bb54abbf6d0c2",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9eea382bb54abbf6cde2",
          "sectionId": "65eaa090382bb54abbf6ce32",
          "bureau_name": "Daloa"
      },
      {
          "_id": "65eaa685382bb54abbf6d0cc",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9eea382bb54abbf6cde2",
          "sectionId": "65eaa090382bb54abbf6ce32",
          "bureau_name": "Man"
      },
      {
          "_id": "65eaa690382bb54abbf6d0d6",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65ea9eea382bb54abbf6cde2",
          "sectionId": "65eaa090382bb54abbf6ce32",
          "bureau_name": "Guiglo"
      },
      {
          "_id": "65eaa69d382bb54abbf6d0e0",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65ea9eea382bb54abbf6cde2",
          "sectionId": "65eaa090382bb54abbf6ce32",
          "bureau_name": "San-Pédro"
      },
      {
          "_id": "65eaa6ae382bb54abbf6d0ea",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65ea9eea382bb54abbf6cde2",
          "sectionId": "65eaa090382bb54abbf6ce32",
          "bureau_name": "Séguéla"
      },
      {
          "_id": "65eaa6b8382bb54abbf6d0f4",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9eea382bb54abbf6cde2",
          "sectionId": "65eaa090382bb54abbf6ce32",
          "bureau_name": "Issia"
      },
      {
          "_id": "65eaa6c6382bb54abbf6d0fe",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9eea382bb54abbf6cde2",
          "sectionId": "65eaa090382bb54abbf6ce32",
          "bureau_name": "Duekoué"
      },
      {
          "_id": "65eaa756382bb54abbf6d122",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65ea9ef4382bb54abbf6cde8",
          "sectionId": "65eaa71c382bb54abbf6d10f",
          "bureau_name": "Gagnoa 1"
      },
      {
          "_id": "65eaa762382bb54abbf6d12c",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65ea9ef4382bb54abbf6cde8",
          "sectionId": "65eaa71c382bb54abbf6d10f",
          "bureau_name": "Gagnoa 2"
      },
      {
          "_id": "65eaa76e382bb54abbf6d136",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65ea9ef4382bb54abbf6cde8",
          "sectionId": "65eaa71c382bb54abbf6d10f",
          "bureau_name": "Divo"
      },
      {
          "_id": "65eaa77b382bb54abbf6d140",
          "countryId":  "65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9ef4382bb54abbf6cde8",
          "sectionId": "65eaa71c382bb54abbf6d10f",
          "bureau_name": "Oumé"
      },
      {
          "_id": "65eaa787382bb54abbf6d14a",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9ef4382bb54abbf6cde8",
          "sectionId": "65eaa71c382bb54abbf6d10f",
          "bureau_name": "Sinfra"
      },
      {
          "_id": "65eaa797382bb54abbf6d154",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9ef4382bb54abbf6cde8",
          "sectionId": "65eaa71c382bb54abbf6d10f",
          "bureau_name": "Tiassalé"
      },
      {
          "_id": "65eaa7a1382bb54abbf6d15e",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9ef4382bb54abbf6cde8",
          "sectionId": "65eaa71c382bb54abbf6d10f",
          "bureau_name": "Sassandra"
      },
      {
          "_id": "65eacf5d3c2e993895900d18",
          "countryId":"65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ea9ef4382bb54abbf6cde8",
          "sectionId": "65eaa71c382bb54abbf6d10f",
          "bureau_name": "Soubré"
      },
      {
          "_id": "65ead0e23c2e993895900d38",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId": "65ead0c13c2e993895900d25",
          "sectionId": "",
          "bureau_name": "Bagnon"
      },
      {
          "_id": "65ead0ef3c2e993895900d42",
          "countryId": "65e9ef34382bb54abbf6cd9a",
          "zoneId":  "65ead0c13c2e993895900d25",
          "sectionId": "",
          "bureau_name": "Yopougon 4"
      }
    ];
   

    for(let i=0; data.length; i++){
      // console.log(data[i].countryId.$oid);
      const updateData ={
        countryId: data[i].countryId,
        zoneId: data[i].zoneId,
        sectionId: data[i].sectionId,
        bureau_name: data[i].bureau_name,
      }
      const agency = await this.agenceModel.findByIdAndUpdate({_id: data[i]._id}, {$set: updateData }, { new: true }).exec();
    }

  }

  async findbureau(bureauId: string) {
    const agence = await this.agenceModel.findById(bureauId).exec();
    // console.log(agence);
    return agence;
  }

  async findSiegeBureau(name: string) {
    const agence = await this.agenceModel.findOne({bureau_name: name});
    if(agence.sectionId !=''){
      const agences = await this.agenceModel.findOne({bureau_name: name})
                                         .populate('countryId')
                                        //  .populate('zoneId')
                                        //  .populate('sectionId')
                                         .exec();
      const section = await this.sectionService.findOne(agence.sectionId);


      return {agences, section};
    }else{
      const agences = await this.agenceModel.findOne({bureau_name: name})
                                            .populate('countryId')
                                            // .populate('zoneId')
                                            .exec();
      return agences
    }
    
  }

  async findSingleAgengence(bureauId: string){
    const agence = await this.agenceModel.findById(bureauId).exec();
   return agence;
  }

  // async update(bureauId: string, updateAgenceDto: UpdateAgenceDto) {
  //   console.log(updateAgenceDto);
  //   if(updateAgenceDto.sectionId ==''){
  //     const updateagenceDto = {
  //       countryId:updateAgenceDto.countryId,
  //       zoneId:updateAgenceDto.zoneId,
  //       sectionId: updateAgenceDto.sectionId,
  //       bureau_name:updateAgenceDto.bureau_name,
  //     };
  //     const agency: Agence = await this.agenceModel.findByIdAndUpdate(bureauId, {$set: updateagenceDto }, { new: true }).exec();
  //     if (!agency) {
  //       throw new NotFoundException(`The agency with id #${bureauId} was not found.`);
  //     }
  //     return agency;
  //   }else{
  //     const agency: Agence = await this.agenceModel
  //     .findByIdAndUpdate(bureauId, { updateAgenceDto }, { new: true })
  //     .exec();
  //   if (!agency) {
  //     throw new NotFoundException(`The agency with id #${bureauId} was not found.`);
  //   }
  //   return agency;
  //   }
    
  // }

  async update(bureauId: string, updateAgenceDto: UpdateAgenceDto) {
    const agency = await this.agenceModel.findByIdAndUpdate({_id: bureauId}, {$set: updateAgenceDto }, { new: true }).exec();
    if (!agency) {
      throw new NotFoundException(`The agency with id #${bureauId} was not found.`);
    }
    return agency;
    // if(updateAgenceDto.sectionId ==''){
    //   const updateagenceDto = {
    //     countryId:updateAgenceDto.countryId,
    //     zoneId:updateAgenceDto.zoneId,
    //     sectionId: updateAgenceDto.sectionId,
    //     bureau_name:updateAgenceDto.bureau_name,
    //   };
    //   const agency = await this.agenceModel.findByIdAndUpdate(bureauId, {$set: updateagenceDto }, { new: true }).exec();
    //   if (!agency) {
    //     throw new NotFoundException(`The agency with id #${bureauId} was not found.`);
    //   }
    //   return agency;
    // }else{
    //   const agency: Agence = await this.agenceModel
    //   .findByIdAndUpdate(bureauId, { updateAgenceDto }, { new: true })
    //   .exec();
    // if (!agency) {
    //   throw new NotFoundException(`The agency with id #${bureauId} was not found.`);
    // }
    // return agency;
    // }
    
  }
  async remove(bureauId: string) {
    // console.log('bureauId', bureauId);
    await this.agenceModel.findByIdAndRemove(bureauId).catch((err) => {
      throw new BadRequestException(`une erreur c'est produite lors de la suppression`);
    });

    return {message: 'bureau supprimé avec succès'};

  }

  async bureaubackup(){
    return await this.agenceModel.find().exec();
  }

  async createAngenceLocation(createAgenceDto: CreateAgenceLocationDto){
    const alreadyExists = await this.agencelocationModel.exists({ bureauId: createAgenceDto.bureauId }).lean();
    if(alreadyExists){
      throw new ConflictException(`la localisation de ce bureau existe déjà dans la base de données! Vous pouvez la modifier si possible`);
    }
    const createdAgenceLocation = await this.agencelocationModel.create(createAgenceDto);
    return createdAgenceLocation
  }

  async findAllAgenceLocation(){
    const agences = await this.agencelocationModel.find()
                              .populate('bureauId')
                              .exec();
    return agences;
  }

  async updateagencelocation(id: string, updateAgenceDto: UpdateAgenceLocationDto) {
    const agency = await this.agencelocationModel.findByIdAndUpdate({_id: id}, {$set: updateAgenceDto }, { new: true }).exec();
    if (!agency) {
      throw new NotFoundException(`The agency with id #${id} was not found.`);
    }
    return agency;
    
    
  }

  async findSingleBureauLocation(id: string){
    const agence = await this.agencelocationModel.findById(id).populate('bureauId').exec();
   return agence;
  }

  async removeagencelocation(id: string) {
    // console.log('bureauId', bureauId);
    await this.agencelocationModel.findByIdAndRemove(id).catch((err) => {
      throw new BadRequestException(`une erreur c'est produite lors de la suppression`);
    });

    return {message: 'la location du bureau supprimé avec succès'};

  }
} 
