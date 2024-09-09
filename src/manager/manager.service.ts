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
  async createDirect() {
  //   const data = [
  //     {
  //         "nom" : "Bi",
  //         "prenom" : "Deamin Denise",
  //         "fullnamemanager": "Bi Deamin Denise",
  //         "telephone" : "0759645751",
  //         "genre" : "Féminin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "Gouro",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  
      
  
  //     {
  //         "nom" : "Kéïta",
  //         "prenom" : "Abdoul Aziz",
  //         "fullnamemanager": "Kéïta Abdoul Aziz",
  //         "telephone" : "0172440750",
  //         "genre" : "Masculin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  
  //     {
  //         "nom" : "Messougni",
  //         "prenom" : "Wilfrid",
  //         "fullnamemanager": "Messougni Wilfrid",
  //         "telephone" : "0708976084",
  //         "genre" : "Masculin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  
  //     {
  //         "nom" : "Touré",
  //         "prenom" : "Penin",
  //         "fullnamemanager": "Touré Penin",
  //         "telephone" : "0709531971",
  //         "genre" : "Féminin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "Gouro",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Gnaze",
  //         "prenom" : "Zokou",
  //         "fullnamemanager": "Gnaze Zokou",
  //         "telephone" : "0749679421",
  //         "genre" : "Masculin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "Bété",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Diomandé",
  //         "prenom" : "Brouahima",
  //         "fullnamemanager": "Diomandé Brouahima",
  //         "telephone" : "0173475347",
  //         "genre" : "Masculin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Kouao",
  //         "prenom" : "Messou Marc",
  //         "fullnamemanager": "Kouao Messou Marc",
  //         "telephone" : "0747347671",
  //         "genre" : "Masculin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Kouadio",
  //         "prenom" : "N'Zué Arsene",
  //         "fullnamemanager": "Kouadio N'Zué Arsene",
  //         "telephone" : "0707275255",
  //         "genre" : "Masculin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Demi",
  //         "prenom" : "Mabea Hermann",
  //         "fullnamemanager": "Demib Mabea Hermann",
  //         "telephone" : "0749282820",
  //         "genre" : "Masculin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Beugré",
  //         "prenom" : "Juliette",
  //         "fullnamemanager": "Beugré Juliette",
  //         "telephone" : "0143833398",
  //         "genre" : "Féminin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "N'Guessan",
  //         "prenom" : "Emmanuella",
  //         "fullnamemanager": "N'Guessan Emmanuella",
  //         "telephone" : "0749650490",
  //         "genre" : "Féminin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Koffi",
  //         "prenom" : "Fulgence",
  //         "fullnamemanager": "Koffi Fulgence",
  //         "telephone" : "0759645751",
  //         "genre" : "Masculin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Tina",
  //         "prenom" : "Marie France",
  //         "fullnamemanager": "Tina Marie France",
  //         "telephone" : "0757945299",
  //         "genre" : "Féminin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Atsé",
  //         "prenom" : "Affesi Martial",
  //         "fullnamemanager": "Atsé Affesi Martial",
  //         "telephone" : "0778207930",
  //         "genre" : "Masculin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Ouatele",
  //         "prenom" : "Hien",
  //         "fullnamemanager": "Ouatele Hien",
  //         "telephone" : "0544967214",
  //         "genre" : "Masculin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Affessi",
  //         "prenom" : "Chia Florentine",
  //         "fullnamemanager": "Affessi Chia Florentine",
  //         "telephone" : "0555322238",
  //         "genre" : "Féminin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Ouattara",
  //         "prenom" : "Alima",
  //         "fullnamemanager": "Ouattara Alima",
  //         "telephone" : "0777740845",
  //         "genre" : "Féminin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Ya",
  //         "prenom" : "Korotoum",
  //         "fullnamemanager": "Ya Korotoum",
  //         "telephone" : "0757040835",
  //         "genre" : "Féminin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Konan",
  //         "prenom" : "Julienne",
  //         "fullnamemanager": "Konan Julienne",
  //         "telephone" : "0777903630",
  //         "genre" : "Féminin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Kambiré",
  //         "prenom" : "Sia Julien",
  //         "fullnamemanager": "Kambiré Sia Julien",
  //         "telephone" : "0778809715",
  //         "genre" : "Masculin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Assah",
  //         "prenom" : "Claude",
  //         "fullnamemanager": "Assah Claude",
  //         "telephone" : "0708656235",
  //         "genre" : "Masculin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Folly",
  //         "prenom" : "Adjon Amandine",
  //         "fullnamemanager": "Folly Adjon Amandine",
  //         "telephone" : "0709777340",
  //         "genre" : "Féminin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Amoussou",
  //         "prenom" : "Fabrice",
  //         "fullnamemanager": "Amoussou Fabrice",
  //         "telephone" : "0153764060",
  //         "genre" : "Masculin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  
  //     {
  //         "nom" : "Yéo",
  //         "prenom" : "Tiéplé Sabine",
  //         "fullnamemanager": "Yéo Tiéplé Sabine",
  //         "telephone" : "0707138699",
  //         "genre" : "Féminin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "N'Doly",
  //         "prenom" : "Betche Lionel",
  //         "fullnamemanager": "N'Doly Betche Lionel",
  //         "telephone" : "0747489575",
  //         "genre" : "Masculin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Kiébré",
  //         "prenom" : "Mariam",
  //         "fullnamemanager": "Kiébré Mariam",
  //         "telephone" : "0757666621",
  //         "genre" : "Féminin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Oulaï",
  //         "prenom" : "Richmond",
  //         "fullnamemanager": "Oulaï Richmond",
  //         "telephone" : "0505710767",
  //         "genre" : "Masculin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Yetcho",
  //         "prenom" : "Accafou",
  //         "fullnamemanager": "Yetcho Accafou",
  //         "telephone" : "0140620201",
  //         "genre" : "Masculin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Adjopo",
  //         "prenom" : "Koffi",
  //         "fullnamemanager": "Adjopo Koffi",
  //         "telephone" : "0545037785",
  //         "genre" : "Masculin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Djokre",
  //         "prenom" : "Moya",
  //         "fullnamemanager": "Djokre Moya",
  //         "telephone" : "0709771445",
  //         "genre" : "Féminin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Mané",
  //         "prenom" : "Djibril",
  //         "fullnamemanager": "Mané Djibril",
  //         "telephone" : "0171574272",
  //         "genre" : "Masculin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Korgo",
  //         "prenom" : "Vanessa",
  //         "fullnamemanager": "Korgo Vanessa",
  //         "telephone" : "0788691123",
  //         "genre" : "Féminin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Koffi",
  //         "prenom" : "A. Badou Mireille",
  //         "fullnamemanager": "Koffi A. Badou Mireille",
  //         "telephone" : "0749282820",
  //         "genre" : "Féminin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Sere",
  //         "prenom" : "Ramatou",
  //         "fullnamemanager": "Sere Ramatou",
  //         "telephone" : "0707603962",
  //         "genre" : "Féminin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Yapo",
  //         "prenom" : "Boni",
  //         "fullnamemanager": "Yapo Boni",
  //         "telephone" : "0545076294",
  //         "genre" : "Masculin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     },
  //     {
  //         "nom" : "Yao",
  //         "prenom" : "Kouamé Germain",
  //         "fullnamemanager": "Yao Kouamé Germain",
  //         "telephone" : "0758366680",
  //         "genre" : "Masculin",
  //         "date_naiss" : "NEANT",
  //         "lieu_naiss" : "NEANT",
  //         "piece" : "NEANT",
  //         "num_piece" :"NEANT",
  //         "situation_matrimonial" : "Célibataire",
  //         "grade" : "Manager",
  //         "ethnie" : "NEANT",
  //         "religion": "Néant",
  //         "maladie_exist": "Neant",  
  //         "nbr_enfant": 0
  //     }
  // ];
  //   for(let i=0; i<data.length; i++){

  //       await this.managerModel.create(data[i]);
  //       // throw new ConflictException(`cet manager existe déjà dans la base de données`);
      
      
  //   }
    
    
  }
/*fin insertion directe*/ 
  async findAll() {
    const manager = await this.managerModel.find().exec();
    return manager;
  }

  async findAllManagerA10() {
    const grade: string = "Assistant Manager A10";
    const manager = await this.managerModel.find({grade: grade}).exec();
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

  async findAllChefsection() {
    const grade: string = "Manager Chef de section";
    const manager = await this.managerModel.find({grade: grade}).exec();
    return manager;
  }

  async findAllManager() {
    const grade: string = "Manager";
    const manager = await this.managerModel.find({grade: grade}).exec();
    return manager;
  }

  async findOne(managerId: string) {
    console.log('managerId', managerId);
    const manager = await this.managerModel.findById({_id: managerId});
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
      throw new NotFoundException(`The manager nom trouvé.`);
    }
    return mgr;
  }

  async remove(id: string) {
    // console.log(paysId);
    const deleted = await this.managerModel.findByIdAndRemove(id).exec();
    if(deleted){
      return 'supprimé avec succès'
    }else{
      throw new NotFoundException(`Soif manager n'est pas trouvé soit échec de suppression.`);

    }
  }

  async updateStatut(managerId: string, updateStatusDto: UpdateStatusDto) {
    return this.managerModel
      .findByIdAndUpdate( managerId , updateStatusDto)
      .lean();
  }

  async managersbackup() {
    const manager = await this.managerModel.find().exec();
    return manager;
  }
}
