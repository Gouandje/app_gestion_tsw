import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Manager, ManagerDocument } from './schemas/manager.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InfoManagerDto } from './dto/info_manager.dto';

import * as nodemailer from 'nodemailer';
import * as util from 'util';
import * as childProcess from 'child_process';

const exec = util.promisify(childProcess.exec);


@Injectable()
export class ManagerService {

  constructor(
    @InjectModel(Manager.name) private readonly managerModel: Model<ManagerDocument>,
  ) {}
  async create(createManagerDto: CreateManagerDto) {
    const alreadyExists = await this.managerModel.exists({ telephone: createManagerDto.telephone}).lean();
    if(alreadyExists){
      throw new ConflictException(`cet manager existe déjà dans la base de données`);
    }
    const createdManager = await this.managerModel.create(createManagerDto);

    if (!createdManager) {
      throw new InternalServerErrorException(
        'Impossible de créer le manager, veuillez réessayer',
      );
    }
    return createdManager;
  }
/* à supprimer après*/ 
  // async createDirect() {
  //   const data = [
  //     {
  //       "nom" : "LAWSON TOKPALO",
  //       "prenom" : "Akueteh Wodeh",
  //       "fullnamemanager": "LAWSON TOKPALO Akueteh Wodeh",
  //       "telephone" : "01.53.15.28.40/05.75.33.49.48",
  //       "genre" : "Masculin",
  //       "date_naiss" : "le 05-01-1965",
  //       "lieu_naiss" : "Atakpamé ( P/OGOU) - TOGO",
  //       "piece" : "CNI ( En cours)",
  //       "num_piece" :"(En cours)",
  //       "situation_matrimonial" : "MARIÉ",
  //       "grade" : "Manager",
  //       "ethnie" : "Mina ( togolais)",
  //       "religion": "Chrétienne Catholique",
  //       "maladie_exist": "Neant",  
  //       "nbr_enfant": 3
  //     },
  //     { 
  //       "nom": "KORÉ",
  //       "prenom": "SYLVESTRE CLAUDINE",
  //       "fullnamemanager": "KORÉ SYLVESTRE CLAUDINE",
  //       "telephone": "0778076095/ 0505909060",
  //       "date_naiss": "21-03-1979",
  //       "lieu_naiss": "Arrah",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "C 0035456302",
  //       "genre": "Féminin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "CÉLIBATAIRE",
  //       "ethnie": "BETE",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Neant",
  //       "nbr_enfant": 1
  //     },
  //     { 
  //       "nom": "DIARRA",
  //       "prenom": "KOUESSO",
  //       "fullnamemanager": "DIARRA KOUESSO",
  //       "telephone": "0767504196",
  //       "date_naiss": "06-04-1994",
  //       "lieu_naiss": "Agboville",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "C 0107799685",
  //       "genre": "Féminin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "CÉLIBATAIRE",
  //       "ethnie": "MALIENNE",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Neant",
  //       "nbr_enfant": 0
  //     },
  //     { 
  //       "nom": "Abissa",
  //       "prenom": "Yao Michel",
  //       "fullnamemanager": "Abissa Yao Michel",
  //       "telephone": "0708684184",
  //       "date_naiss": "27-11-1986",
  //       "lieu_naiss": "epononkro",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "C 003149136",
  //       "genre": "Masculin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "CÉLIBATAIRE",
  //       "ethnie": "ABron",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Neant",
  //       "nbr_enfant": 0
  //     },
  //     { 
  //       "nom": "N'da",
  //       "prenom": "Ahou Emma Elysées",
  //       "fullnamemanager": "N'da Ahou Emma Elysées",
  //       "telephone": "0767888898",
  //       "date_naiss": "08-01-1992",
  //       "lieu_naiss": "M'bahiakro",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "C 0121794491",
  //       "genre": "Féminin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "CÉLIBATAIRE",
  //       "ethnie": "Baoulé",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Neant",
  //       "nbr_enfant": 2
  //     },
  //     { 
  //       "nom": "Gnankou",
  //       "prenom": "kanga Henri Serge",
  //       "fullnamemanager": "Gnankou kanga Henri Serge",
  //       "telephone": "0798763099",
  //       "date_naiss": "08-11-1993",
  //       "lieu_naiss": "Bocanda",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "CI003580331",
  //       "genre": "Masculin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "CÉLIBATAIRE",
  //       "ethnie": "Baoulé",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Neant",
  //       "nbr_enfant": 3
  //     },
  //     { 
  //       "nom": "Dambounou",
  //       "prenom": "Delaley Rebecca",
  //       "fullnamemanager": "Dambounou Delaley Rebecca",
  //       "telephone": "07789745902",
  //       "date_naiss": "07-05-1994",
  //       "lieu_naiss": "Grand Bereby",
  //       "piece": "Néant",
  //       "num_piece": "Néant",
  //       "genre": "Féminin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "CÉLIBATAIRE",
  //       "ethnie": "Wobé",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Neant",
  //       "nbr_enfant": 1
  //     },
  //     { 
  //       "nom": "ATIOUKPE",
  //       "prenom": "Abayaye Christine",
  //       "fullnamemanager": "ATIOUKPE Abayaye Christine",
  //       "telephone": "0103209908",
  //       "date_naiss": "12-12-1998",
  //       "lieu_naiss": "Yakassé Feyassé",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "CI006420820",
  //       "genre": "Féminin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "CÉLIBATAIRE",
  //       "ethnie": "Agni",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Neant",
  //       "nbr_enfant": 1
  //     },
  //     { 
  //       "nom": "Konan",
  //       "prenom": "Eddie Michel Souralè kouassi",
  //       "fullnamemanager": "Konan Eddie Michel Souralè kouassi",
  //       "telephone": "0707374690",
  //       "date_naiss": "17-09-1981",
  //       "lieu_naiss": "Seouletié s/p Beoumi",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "CI006055950",
  //       "genre": "Masculin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Marié",
  //       "ethnie": "Agni/Baoulé",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Neant",
  //       "nbr_enfant": 7
  //     },
  //     { 
  //       "nom": "Zigbé",
  //       "prenom": "zamblé Jacob",
  //       "fullnamemanager": "Zigbé zamblé Jacob",
  //       "telephone": "0706180891",
  //       "date_naiss": "15-10-1989",
  //       "lieu_naiss": "kouatta s/p Kounahiri",
  //       "piece": "Attestation d'identité",
  //       "num_piece": "CI006055950",
  //       "genre": "Masculin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "Mounan",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Neant",
  //       "nbr_enfant": 7
  //     },
  //     { 
  //       "nom": "N'DOUBA",
  //       "prenom": "FRANÇOIS",
  //       "fullnamemanager": "N'DOUBA FRANÇOIS",
  //       "telephone": "0151303167",
  //       "date_naiss": "10-10-1982",
  //       "lieu_naiss": "MARCORY",
  //       "piece": "PASSEPORT",
  //       "num_piece": "20AC25284",
  //       "genre": "Masculin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "AGNI",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Neant",
  //       "nbr_enfant": 3
  //     },
  //     { 
  //       "nom": "Aga",
  //       "prenom": " Manké Rosalie",
  //       "fullnamemanager": "Aga  Manké Rosalie",
  //       "telephone": "0142024854",
  //       "date_naiss": "27-06-1967",
  //       "lieu_naiss": "Adjamé",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "CI0032931411",
  //       "genre": "Féminin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "Ebrié",
  //       "religion": "Chrétienne Catholique",
  //       "maladie_exist": "Problème d' yeux et Tension atérielle",
  //       "nbr_enfant": 2
  //     },
  //     { 
  //       "nom": "EHI",
  //       "prenom": "AYA NICOLE Epse ASSÉ",
  //       "fullnamemanager": "EHI AYA NICOLE Epse ASSÉ",
  //       "telephone": "0585428673",
  //       "date_naiss": "25-07-1988",
  //       "lieu_naiss": "AGOUA S/P BONGOUANOU",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "CI005756823",
  //       "genre": "Féminin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Mariée",
  //       "ethnie": "AGNI",
  //       "religion": "CHRISTIANISME",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 1
  //     },
  //     { 
  //       "nom": "KRAGBE",
  //       "prenom": "GOLY",
  //       "fullnamemanager": "KRAGBE GOLY",
  //       "telephone": "0102126846",
  //       "date_naiss": "01-01-1960",
  //       "lieu_naiss": "GD LAHOU",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "CI002360248",
  //       "genre": "Masculin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Marié",
  //       "ethnie": "DIDA",
  //       "religion": "Chrétienne Catholique",
  //       "maladie_exist": "HÉMORROÏDES",
  //       "nbr_enfant": 2
  //     },
  //     { 
  //       "nom": "Sié",
  //       "prenom": "Essime edwige delagrave",
  //       "fullnamemanager": "Sié Essime edwige delagrave",
  //       "telephone": "0758104914",
  //       "date_naiss": ":26-12-1992",
  //       "lieu_naiss": "Dabou",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "Ci004523225",
  //       "genre": "Féminin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire ",
  //       "ethnie": "Adjoukrou",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 0
  //     },
  //     { 
  //       "nom": "Kouamé ",
  //       "prenom": "Kadjo Antonin",
  //       "fullnamemanager": "Kouamé Kadjo Antonin",
  //       "telephone": "0707476090",
  //       "date_naiss": "19-05-1972",
  //       "lieu_naiss": "Cocody",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "Ci000457320",
  //       "genre": "Masculin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "Agni",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Neant",
  //       "nbr_enfant": 2
  //     },
  //     { 
  //       "nom": "Boussou",
  //       "prenom": "Akissi Juliette ",
  //       "fullnamemanager": "Boussou Akissi Juliette ",
  //       "telephone": "0709192511",
  //       "date_naiss": "17-03-1992",
  //       "lieu_naiss": "ouelle",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "CI002360248",
  //       "genre": "Féminin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "Baoulé",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Neant",
  //       "nbr_enfant": 1
  //     },
  //     { 
  //       "nom": "Diby",
  //       "prenom": "Dominique",
  //       "fullnamemanager": "Diby Dominique",
  //       "telephone": "0758367289",
  //       "date_naiss": "27-12-1986",
  //       "lieu_naiss": "Pli Akakro",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "CI005082762",
  //       "genre": "Masculin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "DIDA",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 1
  //     },
  //     { 
  //       "nom": "SEKA",
  //       "prenom": "KOUSSO CARINE FISTELLE EPSE YAPI ",
  //       "fullnamemanager": "SEKA KOUSSO CARINE FISTELLE EPSE YAPI ",
  //       "telephone": "0747517945",
  //       "date_naiss": "01-06-1982",
  //       "lieu_naiss": "ASSIKOI",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "CI004020365",
  //       "genre": "Féminin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Mariée",
  //       "ethnie": "ATTIE",
  //       "religion": "CHRISTIANISME ",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 1
  //     },
  //     { 
  //       "nom": "DOSSO",
  //       "prenom": "LACINA",
  //       "fullnamemanager": "DOSSO LACINA",
  //       "telephone": "0769498364",
  //       "date_naiss": "03-03-1995",
  //       "lieu_naiss": "VAYASSO",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "CI005491058",
  //       "genre": "Masculin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "MAHAUKA",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 2
  //     },
  //     { 
  //       "nom": "Foufoué",
  //       "prenom": "Kouamé Elysé",
  //       "fullnamemanager": "Foufoué Kouamé Elysé",
  //       "telephone": "0748082548",
  //       "date_naiss": "08-03-1996",
  //       "lieu_naiss": "Beoumi",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "CI006255951",
  //       "genre": "Masculin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "Agni/Baoulé",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 2
  //     },
  //     { 
  //       "nom": "Gnamien",
  //       "prenom": "Kouadio",
  //       "fullnamemanager": "Gnamien Kouadio",
  //       "telephone": "0556148448",
  //       "date_naiss": "12-12-1991",
  //       "lieu_naiss": "Bouaké",
  //       "piece": "Néant",
  //       "num_piece": "Néant",
  //       "genre": "Masculin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "Baoulé",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 1
  //     },
  //     { 
  //       "nom": "N'Guessan",
  //       "prenom": "Yao George",
  //       "fullnamemanager": "N'Guessan Yao George",
  //       "telephone": "0506020348",
  //       "date_naiss": "05-05-1979",
  //       "lieu_naiss": "Tiébissou",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "CI000815708",
  //       "genre": "Masculin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "Baoulé",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 5
  //     },
      
  //     { 
  //       "nom": "Kouamé",
  //       "prenom": "Adjoua Rebecca",
  //       "fullnamemanager": "Kouamé Adjoua Rebecca",
  //       "telephone": "0777189719",
  //       "date_naiss": "04-09-1995",
  //       "lieu_naiss": "Bouaké",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "C0119811968",
  //       "genre": "Féminin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "Baoulé",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 0
  //     },
  //     { 
  //       "nom": "Drissa",
  //       "prenom": "Koné",
  //       "fullnamemanager": "Drissa Koné",
  //       "telephone": "0576573247",
  //       "date_naiss": "29-11-1988",
  //       "lieu_naiss": "Bouaké",
  //       "piece": "Néant",
  //       "num_piece": "Néant",
  //       "genre": "Masculin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "Senoufo",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 0
  //     },
      
  //     { 
  //       "nom": "DEDJE",
  //       "prenom": "JOSEPH DE LONDRES",
  //       "fullnamemanager": "DEDJE JOSEPH DE LONDRES",
  //       "telephone": "0545996064",
  //       "date_naiss": "20-12-1995",
  //       "lieu_naiss": "DIVO",
  //       "piece": "PERMIS DE CONDUIRE",
  //       "num_piece": "DEDJ01-17-00200982J",
  //       "genre": "Masculin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "DIDA",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 2
  //     },
  //     { 
  //       "nom": "Cissé",
  //       "prenom": "DJOUMAN",
  //       "fullnamemanager": "Cissé DJOUMAN",
  //       "telephone": "0748356384",
  //       "date_naiss": "12-05-1987",
  //       "lieu_naiss": "KORHOGO",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "CI001679490",
  //       "genre": "Féminin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "MALINKE",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 2
  //     },
  //     { 
  //       "nom": "ZADI",
  //       "prenom": "ALEXISE FANNY VANESSA",
  //       "fullnamemanager": "ZADI ALEXISE FANNY VANESSA",
  //       "telephone": "0153781513",
  //       "date_naiss": "13-06-1992",
  //       "lieu_naiss": "OUME",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "CI005326504",
  //       "genre": "Feminin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "BETE",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 1
  //     },
  //     { 
  //       "nom": "CONIN",
  //       "prenom": "BENSON KOUAO ANGE ÉRIC DELON",
  //       "fullnamemanager": "CONIN BENSON KOUAO ANGE ÉRIC DELON",
  //       "telephone": "0707323224",
  //       "date_naiss": "19-02-1985",
  //       "lieu_naiss": "DALOA",
  //       "piece": "Néant",
  //       "num_piece": "Néant",
  //       "genre": "Masculin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "AGNI",
  //       "religion": "CHRISTIANISME",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 2
  //     },
      
  //     { 
  //       "nom": "kouassi",
  //       "prenom": "Tressi carole",
  //       "fullnamemanager": "kouassi Tressi Carole",
  //       "telephone": "0787128523",
  //       "date_naiss": "22-08-1998",
  //       "lieu_naiss": "issia",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "C0124064650",
  //       "genre": "Féminin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "baoulé",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 1
  //     },
  //     { 
  //       "nom": "Ouedraogo",
  //       "prenom": "Paul",
  //       "fullnamemanager": "Ouedraogo Paul",
  //       "telephone": "0152114185",
  //       "date_naiss": "27-01-1976",
  //       "lieu_naiss": "Ono(s/p de Bonoua)",
  //       "piece": "Néant",
  //       "num_piece": "Néant",
  //       "genre": "Féminin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "mossi",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 4
  //     },
  //     { 
  //       "nom": "SEKA",
  //       "prenom": "NGBESSO ALAIN KOUAMELAN",
  //       "fullnamemanager": "SEKA NGBESSO ALAIN KOUAMELAN",
  //       "telephone": "0709602040",
  //       "date_naiss": "04-09-1986",
  //       "lieu_naiss": "AZAGUIÉ",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "CI000623021",
  //       "genre": "Féminin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "ABBEY",
  //       "religion": "CHRÉTIENNE Catholique",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 0
  //     },
  //     { 
  //       "nom": "BAMBA",
  //       "prenom": "TIKIE",
  //       "fullnamemanager": "BAMBA TIKIE",
  //       "telephone": "0576204637",
  //       "date_naiss": "21-05-1995",
  //       "lieu_naiss": "ABENGOUROU",
  //       "piece": "Attestation d'identité",
  //       "num_piece": "Néant",
  //       "genre": "Masculin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "SÉNOUFO",
  //       "religion": "MUSULMANE",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 1
  //     },
  //     { 
  //       "nom": "TADE",
  //       "prenom": "GBOLAKE EMERIC",
  //       "fullnamemanager": "TADE GBOLAKE EMERIC",
  //       "telephone": "0709979511",
  //       "date_naiss": "28-06-1987",
  //       "lieu_naiss": "ISSIA",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "CI002165888",
  //       "genre": "Masculin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "BETE",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 3
  //     },
      
  //     { 
  //       "nom": "Koné",
  //       "prenom": "Diata",
  //       "fullnamemanager": "Koné Diata",
  //       "telephone": "0142203283",
  //       "date_naiss": "06-11-1997",
  //       "lieu_naiss": "Aboisso",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "CI003465908",
  //       "genre": "Féminin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "Senoufo",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 0
  //     },
      
  //     { 
  //       "nom": "DIGBEU",
  //       "prenom": "LEHIRI FRANCE OLIVIA BAGOU",
  //       "fullnamemanager": "DIGBEU LEHIRI FRANCE OLIVIA BAGOU",
  //       "telephone": "0769193975",
  //       "date_naiss": "13-07-1998",
  //       "lieu_naiss": "néant",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "CI005776021",
  //       "genre": "Féminin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "BETE",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 0
  //     },
      
      
  //     { 
  //       "nom": "Konan",
  //       "prenom": "kouadio Richmond",
  //       "fullnamemanager": "Konan kouadio Richmond",
  //       "telephone": "0586610500",
  //       "date_naiss": "19-12-1997",
  //       "lieu_naiss": "lolobo",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "CI006238882",
  //       "genre": "Masculin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "baoulé",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 1
  //     },
      
      
  //     { 
  //       "nom": "AMAN",
  //       "prenom": "Abizié Niamké Guy Roland",
  //       "fullnamemanager": "AMAN Abizié Niamké Guy Roland",
  //       "telephone": "0749178614",
  //       "date_naiss": "22-09-1989",
  //       "lieu_naiss": "Grand Bassam",
  //       "piece": "carte nationale d'identité",
  //       "num_piece": "C 0038 8764 26",
  //       "genre": "Masculin",
  //       "grade": "Manager",
  //       "situation_matrimonial": "Célibataire",
  //       "ethnie": "N'ZIMA",
  //       "religion": "Chrétienne",
  //       "maladie_exist": "Néant",
  //       "nbr_enfant": 2
  //     } 
  //   ];
  //   for(let i=0; i<data.length; i++){

  //       await this.managerModel.create(data[i]);
  //       // throw new ConflictException(`cet manager existe déjà dans la base de données`);
      
      
  //   }
    
    
  // }
/*fin insertion directe*/ 
  async findAll() {
    const manager = await this.managerModel.find().exec();
    return manager;
  }
  async findAllMnager(infomanagerDto: InfoManagerDto){
    const results = await this.managerModel.find({telephone: infomanagerDto.nom}).exec();
    if(results.length>0){
      const respone = {
        data : results,
        status: 200
      };
      return respone;
    }else{
       const respone = {
        message: 'Désolé vos informations ne figurent pas encore dans notre base de données cliquez sur le button suivant pour nous envoyer vos informations!!! ',
        status:404
       };
       return respone;
    }
    
  }

  async findAllManagersNonAffectes() {
    const status_mgr = "non affecté";
    const manager = await this.managerModel.find({status_mgr: status_mgr}).exec();
    return manager;
  }

  async findAllSupervisor() {
    const grade: string = "Manager Superviseur de Zone";
    const manager = await this.managerModel.find({grade: grade}).exec();
    return manager;
  }

  async findAllManager() {
    const grade: string = "Manager";
    const manager = await this.managerModel.find({grade: grade}).exec();
    return manager;
  }

  async findOne(managerId: string) {
    const manager = await this.managerModel.findById(managerId);

    if (!manager) {
      throw new NotFoundException('manager non trouvée');
    }
    return manager;
  }

  async update(managerId: string, updateManagerDto: UpdateManagerDto) {
    const mgr: Manager = await this.managerModel
    .findByIdAndUpdate(managerId, { $set: updateManagerDto }, { new: true })
    .exec();
  if (!mgr) {
    throw new NotFoundException(`The agency with id #${managerId} was not found.`);
  }
  return mgr;
  }

  async remove(id: string) {
    // console.log(paysId);
    await this.managerModel.findByIdAndRemove(id).catch((err) => {
      throw new BadRequestException(err);
    });
    return `manager deleted`;
  }

  async updateStatut(managerId: string, updateStatusDto: UpdateStatusDto) {
    return this.managerModel
      .findByIdAndUpdate( managerId , updateStatusDto)
      .lean();
  }
}
