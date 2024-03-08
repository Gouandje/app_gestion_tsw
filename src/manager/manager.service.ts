import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Manager, ManagerDocument } from './schemas/manager.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateStatusDto } from './dto/update-status.dto';

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
    const data = [
      {
        
      "nom": "Blah",
      "prenom": "Larissa", 
      "telephone": "0759236592",
      "date_naiss": "1985-07-23",
      "lieu_naiss": "Abidjan",
      "piece": "carte nationale d'identité",
      "num_piece": "CI000022783",
      "genre": "Feminin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Guéré",
      "religion": "Chretienne",
      "maladie_exist": "Ulcere",
      "fullnamemanager": "Blah Larissa",
      "nbr_enfant": 2
     
    },
    {
     
      "nom": "Anouhoure",
      "prenom": "Yao François",
      "telephone": "0757662302",
      "date_naiss": "1992-11-23",
      "lieu_naiss": "Rousse S/P Beoumi",
      "piece": "carte nationale d'identité",
      "num_piece": "CI0106487473",
      "genre": "Masculin",
      "grade": "HCEF",
      "situation_matrimonial": "celibataire",
      "ethnie": "Baoulé",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 0,
      "status_mgr": "non affecté",
      "fullnamemanager": "Anouhoure Yao François"
    },
    {
     
      "nom": "Kobenan",
      "prenom": "Kouamé Amani Désiré",
      "telephone": "0708127361",
      "date_naiss": "1986-10-11",
      "lieu_naiss": "Bondoukou",
      "piece": "carte nationale d'identité",
      "num_piece": "CI002586614",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Koulango",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 3,
      "status_mgr": "non affecté",
      "fullnamemanager": "Kobenan Kouamé Amani Désiré"
    },
    {
      "nom": "N'Da",
      "prenom": "Ahou Emma Elysée",
      "telephone": "0767888898",
      "date_naiss": "1992-01-08",
      "lieu_naiss": "M'Bahiakro",
      "piece": "carte nationale d'identité",
      "num_piece": "CI0121794491",
      "genre": "Feminin",
      "grade": "HCEF",
      "situation_matrimonial": "celibataire",
      "ethnie": "Baoulé",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 2,
      "fullnamemanager": "N'Da Ahou Emma Elysée"
    },
    {
    
      "nom": "Abissa",
      "prenom": "Yao Michel",
      "telephone": "0708684184",
      "date_naiss": "1986-11-27",
      "lieu_naiss": "Epononkro",
      "piece": "carte nationale d'identité",
      "num_piece": "CI003149136",
      "genre": "Masculin",
      "grade": "HCEF",
      "situation_matrimonial": "celibataire",
      "ethnie": "Abrou",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 2,
      "fullnamemanager": "Abissa    Yao Michel"
    },
    {
    
      "nom": "Miezan",
      "prenom": "Aban Elisabeth",
      "telephone": "0747900436",
      "date_naiss": "1989-03-29",
      "lieu_naiss": "Abidjan",
      "piece": "carte nationale d'identité",
      "num_piece": "CI004711507",
      "genre": "Feminin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Appolo",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 1,
      "fullnamemanager": "Miezan    Aban Elisabeth"
    },
    {
      
      "nom": "Kognan",
      "prenom": "Apo Estelle  C.",
      "telephone": "0759400928",
      "date_naiss": "1987-10-28",
      "lieu_naiss": "Adzopé",
      "piece": "carte nationale d'identité",
      "num_piece": "CI004441304",
      "genre": "Feminin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Attié",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 4,
      "fullnamemanager": "Kognan    Apo Estelle  C."
    },
    {
      
      "nom": "Zouzoua",
      "prenom": "Gnazegbo Cynthia Marie-Flore",
      "telephone": "0170269321",
      "date_naiss": "1985-11-19",
      "lieu_naiss": "Daloa",
      "piece": "carte nationale d'identité",
      "num_piece": "CI000445877",
      "genre": "Feminin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Bété",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 2,
      "fullnamemanager": "Zouzoua  Gnazegbo Cynthia Marie-Flore"
    },
    {
      
      "nom": "Koffi",
      "prenom": "Brou Laurent Junior",
      "telephone": "0798598891",
      "date_naiss": "2000-09-02",
      "lieu_naiss": "Baleko S/P Dabouyo",
      "piece": "attestation d'identité",
      "num_piece": "N°0000162005299",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "N'Zima",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 0,
      "fullnamemanager": "Koffi    Brou Laurent Junior"
    },
    {
     
      "nom": "Konan ",
      "prenom": "Kouadio Bertin",
      "telephone": "0777951448",
      "date_naiss": "1989-12-20",
      "lieu_naiss": "Yaokro S/P Sinfra",
      "piece": "carte nationale d'identité",
      "num_piece": "CI002322331",
      "genre": "Masculin",
      "grade": "Manager Chef de section",
      "situation_matrimonial": "celibataire",
      "ethnie": "Baoulé",
      "religion": "BOUDDHISME",
      "maladie_exist": "Neant",
      "nbr_enfant": 1,
      "fullnamemanager": "Konan Kouadio Bertin"
    },
    {
     
      "nom": "Zahui",
      "prenom": "Assohou Mathieu",
      "telephone": "0707630830",
      "date_naiss": "1978-01-01",
      "lieu_naiss": "Zigbohouri",
      "piece": "carte nationale d'identité",
      "num_piece": "CI000258979",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Bété",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 4,
      "fullnamemanager": "Zahui Assohou Mathieu"
    
      
    },
    {
     
      "nom": "Kouao",
      "prenom": "Kouassi Bla",
      "telephone": "0767066559",
      "date_naiss": "1997-06-11",
      "lieu_naiss": "Ebilassoukro",
      "piece": "carte nationale d'identité",
      "num_piece": "CI0119524510",
      "genre": "Feminin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Agni",
      "religion": "Musulmanne",
      "maladie_exist": "Neant",
      "nbr_enfant": 0,
      "fullnamemanager": "Kouao Kouassi Bla"
    },
    {
      "nom": "Fofana",
      "prenom": "Bangaly",
      "telephone": "0759328613",
      "date_naiss": "1992-12-25",
      "lieu_naiss": "Odienné",
      "piece": "carte nationale d'identité",
      "num_piece": "CI005954322",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Malinké",
      "religion": "Musulmanne",
      "maladie_exist": "Neant",
      "nbr_enfant": 1,
      "fullnamemanager": "Fofana Bangaly"
    },
    {
     
      "nom": "Yao Yao ",
      "prenom": "Benson",
      "fullnamemanager": "Yao Yao  Benson",
      "telephone": "0708817498",
      "date_naiss": "1986-10-31",
      "lieu_naiss": "San-Pedro",
      "piece": "carte nationale d'identité",
      "num_piece": "CI002254912",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "marié",
      "ethnie": "Baoulé",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 7
    },
    {
     
      "nom": "Touré Gnimbien",
      "prenom": "Charles",
      "fullnamemanager": "Touré Gnimbien    Charles",
      "telephone": "0758012085",
      "date_naiss": "1983-12-25",
      "lieu_naiss": "N'Drikro",
      "piece": "carte nationale d'identité",
      "num_piece": "CI001641102",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Tagbana",
      "religion": "Musulmane",
      "maladie_exist": "Neant",
      "nbr_enfant": 4
      
    },
    {
      
      "nom": "Anzan",
      "prenom": "Akissi Rahamatou",
      "fullnamemanager": "Anzan    Akissi Rahamatou",
      "telephone": "0708911910",
      "date_naiss": "1988-09-11",
      "lieu_naiss": "Soubré",
      "piece": "carte nationale d'identité",
      "num_piece": "CI001642372",
      "genre": "Feminin",
      "grade": "Manager Chef de section",
      "situation_matrimonial": "celibataire",
      "ethnie": "Anoh",
      "religion": "Chretienne",
      "maladie_exist": "Cholopathie Fonctionnelle",
      "nbr_enfant": 1
    },
    {
      
      "nom": "Alla",
      "prenom": "Koffi Alfred",
      "fullnamemanager": "Alla    Koffi Alfred",
      "telephone": "0709632489",
      "date_naiss": "1988-02-13",
      "lieu_naiss": "Gagnoa",
      "piece": "carte nationale d'identité",
      "num_piece": "CI001234400",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Baoulé",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 3
    },
    {
      
      "nom": "Amadou",
      "prenom": "Kouadio Mathias",
      "fullnamemanager": "Amadou    Kouadio Mathias",
      "telephone": "0101983098",
      "date_naiss": "1981-03-09",
      "lieu_naiss": "Daoukro",
      "piece": "carte nationale d'identité",
      "num_piece": "CI001011421",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Baoulé",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 3
    },
    {
     
      "nom": "Keïpo",
      "prenom": "Dearouloue Fréjus",
      "fullnamemanager": "Keïpo    Dearouloue Fréjus",
      "telephone": "0767407020",
      "date_naiss": "1998-08-13",
      "lieu_naiss": "Bohinou s/p Vavoua",
      "piece": "carte nationale d'identité",
      "num_piece": "CI1005201745",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Gnédéboua",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 1
    },
    {
      
      "nom": "Kouadio Amoin",
      "prenom": "Rosalie",
      "fullnamemanager": "Kouadio Amoin    Rosalie",
      "telephone": "0777915261",
      "date_naiss": "1986-07-13",
      "lieu_naiss": "Bouaké",
      "piece": "carte nationale d'identité",
      "num_piece": "CI1002791595",
      "genre": "Feminin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Baoulé",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 1
    },
    {
      
      "nom": "Togola",
      "prenom": "Mamadou Soungalo",
      "fullnamemanager": "Togola    Mamadou Soungalo",
      "telephone": "0707878790",
      "date_naiss": "1992-05-05",
      "lieu_naiss": "Assandré s/p Sakassou",
      "piece": "carte nationale d'identité",
      "num_piece": "CI1002241046",
      "genre": "Masculin",
      "grade": "Manager Chef de section",
      "situation_matrimonial": "celibataire",
      "ethnie": "Sénoufo",
      "religion": "Musulmane",
      "maladie_exist": "Neant",
      "nbr_enfant": 0
    },
    {
      
      "nom": "Djaha",
      "prenom": "Armand Jacquelin",
      "fullnamemanager": "Djaha    Armand Jacquelin",
      "telephone": "0757415465",
      "date_naiss": "1989-11-16",
      "lieu_naiss": "Toumodi",
      "piece": "carte nationale d'identité",
      "num_piece": "CI1000456828",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Baoulé",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 0
    },
    {
     
      "nom": "Amedekey",
      "prenom": "Patience",
      "fullnamemanager": "Amedekey    Patience",
      "telephone": "0779429070",
      "date_naiss": "1990-05-23",
      "lieu_naiss": "Ghana",
      "piece": "carte consulaire",
      "num_piece": "022021CIGH28092",
      "genre": "Feminin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Ewe",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 4
    },
    {
      
      "nom": "N'Guessan Konan",
      "prenom": "Richard Moïse",
      "fullnamemanager": "N'Guessan Konan    Richard Moïse",
      "telephone": "0708102544",
      "date_naiss": "1990-09-15",
      "lieu_naiss": "Agboville",
      "piece": "carte nationale d'identité",
      "num_piece": "CI003817202",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "marié",
      "ethnie": "Baoulé",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 1
    },
    {
     
      "nom": "N'Dri",
      "prenom": "Koffi Emmanuel",
      "fullnamemanager": "N'Dri    Koffi Emmanuel",
      "telephone": "0707924939",
      "date_naiss": "1986-06-16",
      "lieu_naiss": "Bouaké",
      "piece": "carte nationale d'identité",
      "num_piece": "CI005314586",
      "genre": "Masculin",
      "grade": "Manager Chef de section",
      "situation_matrimonial": "celibataire",
      "ethnie": "Baoulé",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 1
    },
    {
      
      "nom": "Konan",
      "prenom": "Kouadio Pacôme",
      "fullnamemanager": "Konan    Kouadio Pacôme",
      "telephone": "0707828881",
      "date_naiss": "1981-03-03",
      "lieu_naiss": " Buyo",
      "piece": "carte nationale d'identité",
      "num_piece": "CI0031078027",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "marié",
      "ethnie": "Baoulé",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 4
    },
    {
      
      "nom": "Horo",
      "prenom": "Awa",
      "fullnamemanager": "Horo    Awa",
      "telephone": "0787978032",
      "date_naiss": "1993-12-23",
      "lieu_naiss": "Sinfra",
      "piece": "carte nationale d'identité",
      "num_piece": "CI005228996",
      "genre": "Feminin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Tagbana",
      "religion": "Musulmane",
      "maladie_exist": "Neant",
      "nbr_enfant": 1
    },
    {
      
      "nom": "Onzo",
      "prenom": "Kouassi Felix",
      "fullnamemanager": "Onzo    Kouassi Felix",
      "telephone": "0749875813",
      "date_naiss": "1995-01-01",
      "lieu_naiss": "Tiébissou",
      "piece": "carte nationale d'identité",
      "num_piece": "CI005456148",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": " Baoulé",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 3
    },
    {
      
      "nom": "Traoré",
      "prenom": "Awa",
      "fullnamemanager": "Traoré    Awa",
      "telephone": "0709538841",
      "date_naiss": "1995-01-01",
      "lieu_naiss": "Abengourou",
      "piece": "carte nationale d'identité",
      "num_piece": "CI0106140600",
      "genre": "Feminin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Odienneka",
      "religion": "Musulmane",
      "maladie_exist": "Neant",
      "nbr_enfant": 0
    },
    {
      
      "nom": "Affroumou",
      "prenom": "Kamenan Guillaume",
      "fullnamemanager": "Affroumou    Kamenan Guillaume",
      "telephone": "0758441815",
      "date_naiss": "1984-08-27",
      "lieu_naiss": "Tiémélékro s/p M'batto",
      "piece": "carte nationale d'identité",
      "num_piece": "CI000430499",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Agni",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 1
    },
    {
     
      "nom": "Cherif",
      "prenom": "Dan Hyppolite",
      "fullnamemanager": "Cherif    Dan Hyppolite",
      "telephone": "0747649966",
      "date_naiss": "1987-12-23",
      "lieu_naiss": "Iba",
      "piece": "carte nationale d'identité",
      "num_piece": "CI0086247418",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "marié",
      "ethnie": "Mahouka",
      "religion": "Musulmane",
      "maladie_exist": "Neant",
      "nbr_enfant": 3
    },
    {
     
      "nom": "Kouadio",
      "prenom": "N'Guessan Anne-Brigitte",
      "fullnamemanager": "Kouadio    N'Guessan Anne-Brigitte",
      "telephone": "0554772724",
      "date_naiss": "1993-12-31",
      "lieu_naiss": "Bouaké",
      "piece": "passeport",
      "num_piece": "15AH61240",
      "genre": "Feminin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Baoulé",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 0
    },
    {
      
      "nom": "Touré",
      "prenom": "Gnimte Raphaël Fleuri",
      "fullnamemanager": "Touré    Gnimte Raphaël Fleuri",
      "telephone": "0787806523",
      "date_naiss": "1990-12-19",
      "lieu_naiss": "Sinfra",
      "piece": "carte nationale d'identité",
      "num_piece": "CI005737039",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Ivoirien",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 2
    },
    {
     
      "nom": "Koua",
      "prenom": "Bouani Georgette Epse Kredy",
      "fullnamemanager": "Koua    Bouani Georgette Epse Kredy",
      "telephone": "0707435450",
      "date_naiss": "1966-04-23",
      "lieu_naiss": "Bonoua",
      "piece": "carte nationale d'identité",
      "num_piece": "CI001974971",
      "genre": "Feminin",
      "grade": "Manager",
      "situation_matrimonial": "marié",
      "ethnie": "Abouré",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 3
    },
    {
      
      "nom": "Gnoboa",
      "prenom": "Zokou Serge Boris",
      "fullnamemanager": "Gnoboa    Zokou Serge Boris",
      "telephone": "0759152109",
      "date_naiss": "1991-09-28",
      "lieu_naiss": "Yopougon",
      "piece": "passeport",
      "num_piece": "14AF14420",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Bété",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 5
    },
    {
      
      "nom": "Dahi",
      "prenom": "Blé Roland",
      "fullnamemanager": "Dahi    Blé Roland",
      "telephone": "0708893186",
      "date_naiss": "1993-12-20",
      "lieu_naiss": "Maguehio(Gagnoa)",
      "piece": "carte nationale d'identité",
      "num_piece": "CI003803898",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Bété",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 2
    },
    {
      
      "nom": "Bolou",
      "prenom": "Destin Wilfried",
      "fullnamemanager": "Bolou    Destin Wilfried",
      "telephone": "0101909900",
      "date_naiss": "1996-06-27",
      "lieu_naiss": "Songon",
      "piece": "carte consulaire",
      "num_piece": "BF384001001007170403",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "marié",
      "ethnie": "Mossi",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 0
    },
    {
     
      "nom": "Boulou",
      "prenom": "Clarisse Emmanuella",
      "fullnamemanager": "Boulou    Clarisse Emmanuella",
      "telephone": "0748527950",
      "date_naiss": "1993-12-20",
      "lieu_naiss": "Gbapleu s/p Duekoué",
      "piece": "carte consulaire",
      "num_piece": "BF384001001007173506",
      "genre": "Feminin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Mossi",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 2
    },
    {
      
      "nom": "Yapi",
      "prenom": "Adon Cyriaque",
      "fullnamemanager": "Yapi    Adon Cyriaque",
      "telephone": "0747548248",
      "date_naiss": "1986-12-17",
      "lieu_naiss": "Nyan/Adzopé",
      "piece": "carte nationale d'identité",
      "num_piece": "CI002487113",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "marié",
      "ethnie": "Attié",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 4
    },
    {
     
      "nom": "Assalé",
      "prenom": "Adjeï Franck",
      "fullnamemanager": "Assalé    Adjeï Franck",
      "telephone": "0759775763",
      "date_naiss": "1990-11-05",
      "lieu_naiss": "Assuefry",
      "piece": "carte nationale d'identité",
      "num_piece": "CI0055065665",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Agni",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 0
    },
    {
      
      "nom": "Diomandé",
      "prenom": "Mohamed",
      "fullnamemanager": "Diomandé    Mohamed",
      "telephone": "0708578047",
      "date_naiss": "1995-08-11",
      "lieu_naiss": "Yopougon",
      "piece": "carte nationale d'identité",
      "num_piece": "CI004607050",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Mahouka",
      "religion": "Musulmanne",
      "maladie_exist": "Neant",
      "nbr_enfant": 2
    },
    {
     
      "nom": "Bosson",
      "prenom": "Victoire Nicole",
      "fullnamemanager": "Bosson    Victoire Nicole",
      "telephone": "0787058567",
      "date_naiss": "1997-06-20",
      "lieu_naiss": "Liliyo",
      "piece": "carte nationale d'identité",
      "num_piece": "CI004944213",
      "genre": "Feminin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Agni",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 0
    },
    {
      
      "nom": "Sanogo",
      "prenom": "Lassine",
      "fullnamemanager": "Sanogo    Lassine",
      "telephone": "0709837391",
      "date_naiss": "1993-12-30",
      "lieu_naiss": "Daloa",
      "piece": "carte nationale d'identité",
      "num_piece": "CI1005395620",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "marié",
      "ethnie": "Senoufo",
      "religion": "Musulmanne",
      "maladie_exist": "Neant",
      "nbr_enfant": 2
    },
    {
      
      "nom": "Gogoua",
      "prenom": "Roland Fabrice",
      "fullnamemanager": "Gogoua    Roland Fabrice",
      "telephone": "0787022341",
      "date_naiss": "1990-12-14",
      "lieu_naiss": "Issia",
      "piece": "carte nationale d'identité",
      "num_piece": "CI001946196",
      "genre": "Masculin",
      "grade": "Manager Superviseur de Zone",
      "situation_matrimonial": "celibataire",
      "ethnie": "Bété",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 0
    },
    {
      
      "nom": "Allou",
      "prenom": "Asso Béatrice",
      "fullnamemanager": "Allou    Asso Béatrice",
      "telephone": "0708754617",
      "date_naiss": "1972-02-20",
      "lieu_naiss": "Grand-Bassam",
      "piece": "carte nationale d'identité",
      "num_piece": "CI002500558",
      "genre": "Feminin",
      "grade": "Manager",
      "situation_matrimonial": "marié",
      "ethnie": "Agni",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 2
    },
    {
      
      "nom": "Senan",
      "prenom": "N'Gnima",
      "fullnamemanager": "Senan    N'Gnima",
      "telephone": "0709180052",
      "date_naiss": "1980-10-16",
      "lieu_naiss": "Krindjabo",
      "piece": "carte nationale d'identité",
      "num_piece": "CI001539830",
      "genre": "Feminin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Agni",
      "religion": "BOUDDHISME",
      "maladie_exist": "Neant",
      "nbr_enfant": 4
    },
    {
      
      "nom": "Lorempo",
      "prenom": "Mangba",
      "fullnamemanager": "Lorempo    Mangba",
      "telephone": "0707297732",
      "date_naiss": "1993-03-27",
      "lieu_naiss": "Togo",
      "piece": "carte consulaire",
      "num_piece": "B60387",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Mohaba",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 0
    },
    {
     
      "nom": "Ve",
      "prenom": "Donatien",
      "fullnamemanager": "Ve    Donatien",
      "telephone": "0708180655",
      "date_naiss": "1989-05-28",
      "lieu_naiss": "Bofessodouma s/p Man",
      "piece": "carte nationale d'identité",
      "num_piece": "CI000603576",
      "genre": "Masculin",
      "grade": "Manager Chef de section",
      "situation_matrimonial": "celibataire",
      "ethnie": "Yacouba",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 1
    },
    {
     
      "nom": "Yapi",
      "prenom": "N'Guessan Akichi Serge Valerie",
      "fullnamemanager": "Yapi    N'Guessan Akichi Serge Valerie",
      "telephone": "0797077599",
      "date_naiss": "1984-07-02",
      "lieu_naiss": "Abobo",
      "piece": "carte nationale d'identité",
      "num_piece": "CI003306208",
      "genre": "Feminin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Akye",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 1
    },
    {
      
      "nom": "Kouakou",
      "prenom": "Ahou Ahoua",
      "fullnamemanager": "Kouakou    Ahou Ahoua",
      "telephone": "0708945302",
      "date_naiss": "1977-09-21",
      "lieu_naiss": "Prikro",
      "piece": "carte nationale d'identité",
      "num_piece": "CI000780147",
      "genre": "Feminin",
      "grade": "Manager Chef de section",
      "situation_matrimonial": "marié",
      "ethnie": "Agni",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 2
    },
    {
      
      "nom": "Koffi",
      "prenom": "Kouassi Bertin",
      "fullnamemanager": "Koffi    Kouassi Bertin",
      "telephone": "0789794134",
      "date_naiss": "1976-01-05",
      "lieu_naiss": "Boli s/p Didievi",
      "piece": "carte nationale d'identité",
      "num_piece": "CI001209507",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Baoulé",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 4
    },
    {
      
      "nom": "Diarra",
      "prenom": "Hadjaratou",
      "fullnamemanager": "Diarra    Hadjaratou",
      "telephone": "0707738665",
      "date_naiss": "1983-08-31",
      "lieu_naiss": "Adjamé",
      "piece": "carte nationale d'identité",
      "num_piece": "CI002184055",
      "genre": "Feminin",
      "grade": "Manager",
      "situation_matrimonial": "marié",
      "ethnie": "Malinké",
      "religion": "Musulmanne",
      "maladie_exist": "Neant",
      "nbr_enfant": 0
    },
    {
      
      "nom": "Konaté",
      "prenom": "Moussa",
      "fullnamemanager": "Konaté    Moussa",
      "telephone": "0779598958",
      "date_naiss": "1996-12-11",
      "lieu_naiss": "Yaou",
      "piece": "carte nationale d'identité",
      "num_piece": "CI0035066818",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Malinké",
      "religion": "Musulmanne",
      "maladie_exist": "Neant",
      "nbr_enfant": 0
    },
    {
      
      "nom": "Kaboré",
      "prenom": "Salimata",
      "fullnamemanager": "Kaboré    Salimata",
      "telephone": "0768843814",
      "date_naiss": "1987-07-09",
      "lieu_naiss": "Bingerville",
      "piece": "carte consulaire",
      "num_piece": "BF384001001007148644",
      "genre": "Feminin",
      "grade": "Manager",
      "situation_matrimonial": "marié",
      "ethnie": "Mossi",
      "religion": "Musulmanne",
      "maladie_exist": "Neant",
      "nbr_enfant": 4
    },
    {
      
      "nom": "Séka",
      "prenom": "Carine Eps Yapi",
      "fullnamemanager": "Séka    Carine Eps Yapi",
      "telephone": "0747517945",
      "date_naiss": "1982-06-01",
      "lieu_naiss": "Assikoi s/p Adzopé",
      "piece": "carte nationale d'identité",
      "num_piece": "CI1004020365",
      "genre": "Feminin",
      "grade": "HCEF",
      "situation_matrimonial": "marié",
      "ethnie": "Attié",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 1
    },
    {
      
      "nom": "Zigbé",
      "prenom": "Zamblé Jacob",
      "fullnamemanager": "Zigbé    Zamblé Jacob",
      "telephone": "0706180891",
      "date_naiss": "1989-10-15",
      "lieu_naiss": "Kouatta s/p Kounahiri",
      "piece": "carte nationale d'identité",
      "num_piece": "CI000000000",
      "genre": "Masculin",
      "grade": "HCEF",
      "situation_matrimonial": "celibataire",
      "ethnie": "Mounan",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 7
    },
    {
      
      "nom": "Dosso",
      "prenom": "Laciné",
      "fullnamemanager": "Dosso    Laciné",
      "telephone": "0769498364",
      "date_naiss": "1995-03-03",
      "lieu_naiss": "Voyasso s/p Waninou",
      "piece": "carte nationale d'identité",
      "num_piece": "CI1005491058",
      "genre": "Masculin",
      "grade": "HCEF",
      "situation_matrimonial": "celibataire",
      "ethnie": "Mahouka",
      "religion": "Musulmane",
      "maladie_exist": "Neant",
      "nbr_enfant": 2
    },
    {
     
      "nom": "Traoré",
      "prenom": "Kadiatou",
      "fullnamemanager": "Traoré    Kadiatou",
      "telephone": "0787329963",
      "date_naiss": "1991-09-21",
      "lieu_naiss": "Marcory",
      "piece": "carte nationale d'identité",
      "num_piece": "CI1005742349",
      "genre": "Feminin",
      "grade": "HCEF",
      "situation_matrimonial": "celibataire",
      "ethnie": "Malinké",
      "religion": "Musulmane",
      "maladie_exist": "Neant",
      "nbr_enfant": 0
    },
    {
     
      "nom": "Kanga",
      "prenom": "Adjoua Edwige Aimée",
      "fullnamemanager": "Kanga    Adjoua Edwige Aimée",
      "telephone": "0747760520",
      "date_naiss": "1987-10-13",
      "lieu_naiss": "Soubré",
      "piece": "carte nationale d'identité",
      "num_piece": "CI002934554",
      "genre": "Feminin",
      "grade": "HCEF",
      "situation_matrimonial": "celibataire",
      "ethnie": "Baoulé",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 2
    },
    {
     
      "nom": "Bamba",
      "prenom": "Damene Anne",
      "fullnamemanager": "Bamba    Damene Anne",
      "telephone": "0767297328",
      "date_naiss": "1987-11-24",
      "lieu_naiss": "Koumassi",
      "piece": "carte nationale d'identité",
      "num_piece": "CI005356619",
      "genre": "Feminin",
      "grade": "Manager Chef de section",
      "situation_matrimonial": "celibataire",
      "ethnie": "Senoufo",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 1
    },
    {
      
      "nom": "Ahoussi",
      "prenom": "N'Guessan Severin",
      "fullnamemanager": "Ahoussi    N'Guessan Severin",
      "telephone": "0748492568",
      "date_naiss": "1987-03-01",
      "lieu_naiss": "Kouassi Kouassikro",
      "piece": "carte nationale d'identité",
      "num_piece": "CI004239702",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Baoulé",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 2
    },
    {
      
      "nom": "Loukou",
      "prenom": "Yao Jean Marc",
      "fullnamemanager": "Loukou    Yao Jean Marc",
      "telephone": "0789080083",
      "date_naiss": "1989-04-13",
      "lieu_naiss": "Djèkanou",
      "piece": "carte nationale d'identité",
      "num_piece": "CI002014382",
      "genre": "Masculin",
      "grade": "Manager Superviseur de Zone",
      "situation_matrimonial": "celibataire",
      "ethnie": "Baoulé",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 4
    },
    {
      
      "nom": "Kouadio",
      "prenom": "Guy Marc",
      "fullnamemanager": "Kouadio    Guy Marc",
      "telephone": "0757486588",
      "date_naiss": "1991-10-12",
      "lieu_naiss": "Issia",
      "piece": "recepisse",
      "num_piece": "83140000131",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Attié",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 1
    },
    {
     
      "nom": "Kanté ",
      "prenom": "Mawa",
      "fullnamemanager": "Kanté     Mawa",
      "telephone": "0140155741",
      "date_naiss": "1981-12-31",
      "lieu_naiss": "Treichville",
      "piece": "carte nationale d'identité",
      "num_piece": "CI000644605",
      "genre": "Feminin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Malinké",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 4
    },
    {
     
      "nom": "Drolé",
      "prenom": "Simplice",
      "fullnamemanager": "Drolé    Simplice",
      "telephone": "0778746534",
      "date_naiss": "1994-12-30",
      "lieu_naiss": "Zaibo",
      "piece": "carte nationale d'identité",
      "num_piece": "CI012351626",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "marié",
      "ethnie": "Gnanboua",
      "religion": "BOUDDHISME",
      "maladie_exist": "Neant",
      "nbr_enfant": 1
    },
    {
      
      "nom": "Mahé",
      "prenom": "Martial",
      "fullnamemanager": "Mahé    Martial",
      "telephone": "0142216791",
      "date_naiss": "1994-12-10",
      "lieu_naiss": "Soumaye",
      "piece": "aucune pièce",
      "num_piece": "0000000",
      "genre": "Masculin",
      "grade": "Manager Chef de section",
      "situation_matrimonial": "celibataire",
      "ethnie": "Wobè",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 0
    },
    {
      
      "nom": "Seka",
      "prenom": "Seka Aimé",
      "fullnamemanager": "Seka    Seka Aimé",
      "telephone": "0707267211",
      "date_naiss": "1978-02-20",
      "lieu_naiss": "Affery",
      "piece": "carte nationale d'identité",
      "num_piece": "CI000623589",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "marié",
      "ethnie": "Attié",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 1
    },
    {
      
      "nom": "Malan ",
      "prenom": "Kouassi Alphonse",
      "fullnamemanager": "Malan     Kouassi Alphonse",
      "telephone": "0757557297",
      "date_naiss": "1981-06-02",
      "lieu_naiss": "Tchebloguhe s/p Daloa",
      "piece": "carte nationale d'identité",
      "num_piece": "CI004496708",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Agni",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 2
    },
    {
      
      "nom": "Aka",
      "prenom": "Kouamé Fernand",
      "fullnamemanager": "Aka    Kouamé Fernand",
      "telephone": "0777654952",
      "date_naiss": "1990-12-02",
      "lieu_naiss": "Ouagadougou",
      "piece": "carte nationale d'identité",
      "num_piece": "CI000711323",
      "genre": "Masculin",
      "grade": "Manager Chef de section",
      "situation_matrimonial": "celibataire",
      "ethnie": "Agni",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 1
    },
    {
      
      "nom": "Amoulaye",
      "prenom": "Yao Youssouf",
      "fullnamemanager": "Amoulaye    Yao Youssouf",
      "telephone": "0748054496",
      "date_naiss": "1988-12-16",
      "lieu_naiss": "Babakro s/p Prikro",
      "piece": "carte nationale d'identité",
      "num_piece": "CI004322383",
      "genre": "Masculin",
      "grade": "Manager",
      "situation_matrimonial": "celibataire",
      "ethnie": "Anô",
      "religion": "Musulmanne",
      "maladie_exist": "Neant",
      "nbr_enfant": 1
    },
    {
      "nom": "Dogbo",
      "prenom": "Seri Armel",
      "fullnamemanager": "Dogbo    Seri Armel",
      "telephone": "0748842817",
      "date_naiss": "1995-05-22",
      "lieu_naiss": "Issia",
      "piece": "attestation d'identité",
      "num_piece": "AB00857398",
      "genre": "Masculin",
      "grade": "Manager Superviseur de Zone",
      "situation_matrimonial": "celibataire",
      "ethnie": "Bété",
      "religion": "Chretienne",
      "maladie_exist": "Neant",
      "nbr_enfant": 5
    }
    
    ];
    for(let i=0; i<data.length; i++){
      await this.managerModel.create(data[i]);
    }
    
    
  }
/*fin insertion directe*/ 
  async findAll() {
    const manager = await this.managerModel.find().exec();
    return manager;
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
