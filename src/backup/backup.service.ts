import { Injectable } from '@nestjs/common';
import { CreateBackupDto } from './dto/create-backup.dto';
import { UpdateBackupDto } from './dto/update-backup.dto';
import * as fs from 'fs';
import * as util from 'util';
import * as childProcess from 'child_process';
import * as archiver from 'archiver';
import * as nodemailer from 'nodemailer';
import * as jsonexport from 'jsonexport';
import * as ExcelJS from 'exceljs';


import { Affectation, AffectationDocument } from 'src/affectation/schemas/affectation.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Manager, ManagerDocument } from 'src/manager/schemas/manager.schema';
import { Agence, AgenceDocument } from 'src/angence/schemas/agence.schema';
import { Weekendy, WeekendyDocument } from 'src/weekendy/schemas/weekendy.schema';
import { Produitvendupays, ProduitvendupaysDocument } from 'src/weekendy/schemas/produitsvendupays.schema';
import { WeekendyDocteur, WeekendyDocteurDocument } from 'src/weekendy/schemas/weekendydocteur.schema';
import { Produitvendubureau, ProduitvendubureauDocument } from 'src/weekendy/schemas/produitvendubureau.schema';
import { Products, ProductsDocument } from 'src/produit/schemas/products.shema';
import { Zone, ZoneDocument } from 'src/zone/schemas/zone.schema';
import { Zoneca, ZonecaDocument } from 'src/zone/schemas/zoneca.schema';
import { Zonecamois, ZonecamoisDocument } from 'src/zone/schemas/zonecamois.schema';
import { Primesz, PrimeszDocument } from 'src/zone/schemas/primesz.schema';
import { Section, SectionDocument } from 'src/section/schemas/section.schema';
import { Chefsectionprime, ChefsectionprimeDocument } from 'src/section/schemas/chefsectionprime.schema';
import { Sectionca, SectioncaDocument } from 'src/section/schemas/sectionca.schema';
import { Sectioncamois, SectioncamoisDocument } from 'src/section/schemas/sectioncamois.schema';
import { Tauxzone, TauxzoneDocument } from 'src/tauxzone/schemas/tauxzone.schema';
import { Tauxsection, TauxsectionDocument } from 'src/tauxzone/schemas/tauxsection.schema';
import { Taux, TauxDocument } from 'src/taux/schemas/taux.schema';
import { Payscayear, PayscayearDocument } from 'src/paysca/schemas/payscayear.schema';
import { Paysca, PayscaDocument } from 'src/paysca/schemas/paysca.schema';
import { Stockagence, StockagenceDocument } from 'src/stockagence/schemas/stockagence.schema';
import { MvtStockagencePays, MvtStockagencePaysDocument } from 'src/stockagence/schemas/mvtbackpays.schema';
import { Salaire, SalaireDocument } from 'src/salaire/schemas/salaire.schema';
import { SalaireManager, SalaireManagerDocument } from 'src/salaire_manager/schemas/salaire_manager.schema';
import { CotisationPaye, CotisationPayeDocument } from 'src/salaire_manager/schemas/cotisation_paye.schema';
import { CotisationDocument } from 'src/salaire_manager/schemas/cotisation.schema';
import { DetteBureau, DetteBureauDocument } from 'src/salaire_manager/schemas/dette_bureau.schema';
import { Remboursement, RemboursementDocument } from 'src/salaire_manager/schemas/remboursement.schema';
import { Chefsection, ChefsectionDocument } from 'src/chefsection/schemas/chefsection.schema';
import { Mission, MissionDocument } from 'src/assignment/schemas/assignment.schema';
import { Caisse, CaisseDocument } from 'src/caisse/schemas/caisse.schema';
import { Conge, CongeDocument } from 'src/conge/schemas/conge.schema';
import { Employer, EmployerDocument } from 'src/employer/schemas/employer.schema';
import { Entrepot, EntrepotDocument } from 'src/entrepot/schemas/entrepot.schema';
import { StockAlerteEntrepot, StockAlerteEntrepotDocument } from 'src/entrepot/schemas/stockalertentrepot.schema';
import { EntrepotOperation, EntrepotOperationDocument } from 'src/entrepot/schemas/entrepotoperation.schema';
import { SortieProduitEntrepot, SortieProduitEntrepotDocument } from 'src/entrepot/schemas/sortieproduitentrepot.schema';
import { EntrepotProduitStock, EntrepotProduitStockDocument } from 'src/entrepot/schemas/entrepotproduitstock.schema';
import { Expense, ExpenseDocument } from 'src/expenses/schemas/expense.schema';
import { Category, CategoryDocument } from 'src/expenses/schemas/category.schema';
import { Annee, AnneeDocument } from 'src/moisannee/schemas/annee.schema';
import { Mois, MoisDocument } from 'src/moisannee/schemas/mois.schema';
import { Consignation, ConsignationDocument } from 'src/mouvementstock/schemas/consignation.schema';
import { Mouvementstock, MouvementstockDocument } from 'src/mouvementstock/schemas/mouvementstock.schema';
import { MvtStockPaysEntrepot, MvtStockPaysEntrepotDocument } from 'src/mvt-stock/schemas/mvt-stock.schema';
import { Caissecarnet, CaissecarnetDocument } from 'src/patient/schemas/caissecarnet.schema';
import { Caissecarnetsolde, CaissecarnetsoldeDocument } from 'src/patient/schemas/caissecarnetsolde.schema';
import { Caissekine, CaissekineDocument } from 'src/patient/schemas/caissekine.schema';
import { Caissekinesolde } from 'src/patient/schemas/caissekinesolde.schema';
import { Caissemachine, CaissemachineDocument } from 'src/patient/schemas/caissemachine.schema';
import { CaissemachinesoldeDocument, Caissemachinesolde } from 'src/patient/schemas/caissemachinesolde.schema';
import { Demande, DemandeDocument } from 'src/patient/schemas/demande.schema';
import { Patient, PatientDocument } from 'src/patient/schemas/patient.schema';
import { Patientdoctor, PatientdoctorDocument } from 'src/patient/schemas/patientdoctor.schema';
import { Patientkine, PatientkineDocument } from 'src/patient/schemas/patientkine.schema';
import { Seance, SeanceDocument } from 'src/patient/schemas/seancepatientkine.schema';
import { Pays, PaysDocument } from 'src/pays/schemas/pays.schema';
import { Produitendommage, ProduitendommageDocument } from 'src/produitendommage/schemas/produitendommage.schema';
import { Produitendommagestock, ProduitendommagestockDocument } from 'src/produitendommage/schemas/produitendommagestock.schema';
import { VenteProduitendommage, VenteProduitendommageDocument } from 'src/produitendommage/schemas/venteproduitendommage.schema';
import { Role, RoleDocument } from 'src/role/schemas/role.schema';
import { StockPays } from 'src/stock-pays/schemas/stockpays.schema';
import { Stock, StockDocument } from 'src/stock/schemas/stock.schema';
import { Superviseurzone, SuperviseurzoneDocument } from 'src/superviseurzone/schemas/superviseurzone.schema';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { AffectationService } from 'src/affectation/affectation.service';
import { AgenceService } from 'src/angence/agence.service';
import { AssignmentService } from 'src/assignment/assignment.service';
import { CaisseService } from 'src/caisse/caisse.service';
import { ChefsectionService } from 'src/chefsection/chefsection.service';
import { CongeService } from 'src/conge/conge.service';
import { EmployerService } from 'src/employer/employer.service';
import { EntrepotService } from 'src/entrepot/entrepot.service';
import { ExpensesService } from 'src/expenses/expenses.service';
import { ManagerService } from 'src/manager/manager.service';
import { MoisanneeService } from 'src/moisannee/moisannee.service';
import { MouvementstockService } from 'src/mouvementstock/mouvementstock.service';
import { MvtStockService } from 'src/mvt-stock/mvt-stock.service';
import { PatientService } from 'src/patient/patient.service';
import { PaysService } from 'src/pays/pays.service';
import { PayscaService } from 'src/paysca/paysca.service';
import { ProduitService } from 'src/produit/produit.service';
import { ProduitendommageService } from 'src/produitendommage/produitendommage.service';
import { RoleService } from 'src/role/role.service';
import { SalaireService } from 'src/salaire/salaire.service';
import { SalaireManagerService } from 'src/salaire_manager/salaire_manager.service';
import { SectionService } from 'src/section/section.service';
import { StockPaysService } from 'src/stock-pays/stock-pays.service';
import { StockService } from 'src/stock/stock.service';
import { StockagenceService } from 'src/stockagence/stockagence.service';
import { SuperviseurzoneService } from 'src/superviseurzone/superviseurzone.service';
import { TauxService } from 'src/taux/taux.service';
import { TauxzoneService } from 'src/tauxzone/tauxzone.service';
import { UserService } from 'src/user/user.service';
import { WeekendyService } from 'src/weekendy/weekendy.service';
import { ZoneService } from 'src/zone/zone.service';
import { MailService } from './mail.service';


const exec = util.promisify(childProcess.exec);


@Injectable()
export class BackupService {
  
  constructor(
    // @InjectModel(Affectation.name) private readonly affectationModel: Model<AffectationDocument>,
    // @InjectModel(Agence.name) private readonly agenceModel: Model<AgenceDocument>,
    // @InjectModel(Weekendy.name) private readonly weekendyModel: Model<WeekendyDocument>,
    // @InjectModel(Produitvendupays.name) private readonly produitvendupaysModel: Model<ProduitvendupaysDocument>,
    // @InjectModel(Produitvendubureau.name) private readonly produitvendubureauModel: Model<ProduitvendubureauDocument>,
    // @InjectModel(WeekendyDocteur.name) private readonly weekendyDocteurModel: Model<WeekendyDocteurDocument>,
    // @InjectModel(Manager.name) private readonly managerModel: Model<ManagerDocument>,
    // @InjectModel(Products.name) private readonly productModel: Model<ProductsDocument>,
    // @InjectModel(Zone.name) private readonly zoneModel: Model<ZoneDocument>,
    // @InjectModel(Zoneca.name) private readonly zonecaModel: Model<ZonecaDocument>,
    // @InjectModel(Zonecamois.name) private readonly zonecamoisModel: Model<ZonecamoisDocument>,
    // @InjectModel(Primesz.name) private readonly primeszModel: Model<PrimeszDocument>,
    // @InjectModel(Section.name) private readonly sectionModel: Model<SectionDocument>,
    // @InjectModel(Chefsectionprime.name) private readonly chefsectionprimeModel: Model<ChefsectionprimeDocument>,
    // @InjectModel(Sectionca.name) private readonly sectioncaModel: Model<SectioncaDocument>,
    // @InjectModel(Sectioncamois.name) private readonly sectioncamoisModel: Model<SectioncamoisDocument>,
    // @InjectModel(Tauxzone.name) private readonly tauxzoneModel: Model<TauxzoneDocument>,
    // @InjectModel(Tauxsection.name) private readonly tauxsectionModel: Model<TauxsectionDocument>,
    // @InjectModel(Taux.name) private readonly tauxModel: Model<TauxDocument>,
    // @InjectModel(Paysca.name) private readonly payscaModel: Model<PayscaDocument>,
    // @InjectModel(Payscayear.name) private readonly payscayearModel: Model<PayscayearDocument>,
    // @InjectModel(Stockagence.name) private readonly stockagenceModel: Model<StockagenceDocument>,
    // @InjectModel(MvtStockagencePays.name) private readonly mvtstockagencepaysModel: Model<MvtStockagencePaysDocument>,
    // @InjectModel(Salaire.name) private readonly salaireModel: Model<SalaireDocument>,
    // @InjectModel(SalaireManager.name) private readonly salairemanagerModel: Model<SalaireManagerDocument>,
    // @InjectModel(CotisationPaye.name) private readonly cotisationpayModel: Model<CotisationPayeDocument>,
    // @InjectModel(DetteBureau.name) private readonly dettebureauModel: Model<DetteBureauDocument>,
    // @InjectModel(Remboursement.name) private readonly remboursementModel: Model<RemboursementDocument>,
    // @InjectModel(Chefsection.name) private readonly chefsectionModel: Model<ChefsectionDocument>,
    // @InjectModel(Mission.name) private readonly missionModel: Model<MissionDocument>,
    // @InjectModel(Caisse.name) private readonly caisseModel: Model<CaisseDocument>,
    // @InjectModel(Conge.name) private readonly congeModel: Model<CongeDocument>,
    // @InjectModel(Employer.name) private readonly employerModel: Model<EmployerDocument>,
    // @InjectModel(Entrepot.name) private readonly entrepotModel: Model<EntrepotDocument>,
    // @InjectModel(StockAlerteEntrepot.name) private readonly stockalertentrepotModel: Model<StockAlerteEntrepotDocument>,
    // @InjectModel(EntrepotOperation.name) private readonly entrepotoperationModel: Model<EntrepotOperationDocument>,
    // @InjectModel(SortieProduitEntrepot.name) private readonly sortieproduitentrepotModel: Model<SortieProduitEntrepotDocument>,
    // @InjectModel(EntrepotProduitStock.name) private readonly entrepotproduitstockModel: Model<EntrepotProduitStockDocument>,
    // @InjectModel(Expense.name) private readonly expenseModel: Model<ExpenseDocument>,
    // @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
    // @InjectModel(Annee.name) private readonly anneeModel: Model<AnneeDocument>, 
    // @InjectModel(Mois.name) private readonly moisModel: Model<MoisDocument>,
    // @InjectModel(Mouvementstock.name) private readonly mvtstockModel: Model<MouvementstockDocument>,
    // @InjectModel(Consignation.name) private readonly consignationModel: Model<ConsignationDocument>,
    // @InjectModel(MvtStockPaysEntrepot.name) private readonly mvtstockpaysentrepotModel: Model<MvtStockPaysEntrepotDocument>,
    // @InjectModel(Patient.name) private readonly patientModel: Model<PatientDocument>, 
    // @InjectModel(Patientdoctor.name) private readonly patientdoctorModel: Model<PatientdoctorDocument>,
    // @InjectModel(Patientkine.name) private readonly patienkineModel: Model<PatientkineDocument>,
    // @InjectModel(Caissekine.name) private readonly caissekineModel: Model<CaissekineDocument>,
    // @InjectModel(Caissekinesolde.name) private readonly caissekinesoldeModel: Model<CaissemachinesoldeDocument>,
    // @InjectModel(Caissemachine.name) private readonly caissemachineModel: Model<CaissemachineDocument>,
    // @InjectModel(Caissemachinesolde.name) private readonly caissemachinesoldeModel: Model<CaissemachinesoldeDocument>,
    // @InjectModel(Caissecarnet.name) private readonly caissecarnetModel: Model<CaissecarnetDocument>,
    // @InjectModel(Caissecarnetsolde.name) private readonly caissecarnetsoldeModel: Model<CaissecarnetsoldeDocument>,
    // @InjectModel(Demande.name) private readonly demandeModel: Model<DemandeDocument>,
    // @InjectModel(Seance.name) private readonly seanceModel: Model<SeanceDocument>,
    // @InjectModel(Pays.name) private readonly paysModel: Model<PaysDocument>,
    // @InjectModel(Produitendommage.name) private readonly productendoModel: Model<ProduitendommageDocument>,
    // @InjectModel(VenteProduitendommage.name) private readonly venteproductendoModel: Model<VenteProduitendommageDocument>,
    // @InjectModel(Produitendommagestock.name) private readonly productendostockModel: Model<ProduitendommagestockDocument>,
    // @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
    // @InjectModel(Stock.name) private readonly stockModel: Model<StockDocument>,
    // @InjectModel(StockPays.name) private readonly stockpaysModel: Model<StockDocument>,
    // @InjectModel(Superviseurzone.name) private readonly superviseurzoneModel: Model<SuperviseurzoneDocument>,
    // @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly mailerService: MailerService,
    private readonly mailService: MailService,
    private weekendyservice: WeekendyService,
    private managerservice: ManagerService,
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
    private salairemanagerService: SalaireManagerService,
    private chefsectionService: ChefsectionService,
    private assignmentService: AssignmentService,
    private caisseService: CaisseService,
    private congesservice: CongeService,
    private employerservice: EmployerService,
    private entrepotservice: EntrepotService,
    private expenseservice: ExpensesService,
    private moisannesservice: MoisanneeService,
    private mouvementstockservice: MouvementstockService,
    private mvtStockService: MvtStockService,
    private patientService: PatientService,
    private paysService: PaysService,
    private produitendommageService: ProduitendommageService,
    private roleService: RoleService,
    private stockService: StockService,
    private stockPaysService: StockPaysService,
    private superviseurzoneService: SuperviseurzoneService,
    private userService: UserService,

    ) {}

  async processDataAndSendEmail(){
    // Récupérer les données de la base de données
    try{
        // const collectionsData = await Promise.all([
        //   this.affectationModel.find().exec(),
        //   this.agenceModel.find().exec(),
        //   this.weekendyModel.find().exec(),
        //   this.produitvendupaysModel.find().exec(),
        //   this.produitvendubureauModel.find().exec(),
        //   this.weekendyDocteurModel.find().exec(),
        //   this.managerModel.find().exec(),
        //   this.productModel.find().exec(),
        //   this.zoneModel.find().exec(),
        //   this.zonecaModel.find().exec(),
        //   this.zonecamoisModel.find().exec(),
        //   this.primeszModel.find().exec(),
        //   this.sectionModel.find().exec(),
        //   this.chefsectionprimeModel.find().exec(),
        //   this.sectioncaModel.find().exec(),
        //   this.sectioncamoisModel.find().exec(),
        //   this.tauxzoneModel.find().exec(),
        //   this.tauxsectionModel.find().exec(),
        //   this.tauxModel.find().exec(),
        //   this.payscaModel.find().exec(),
        //   this.payscayearModel.find().exec(),
        //   this.stockagenceModel.find().exec(),
        //   this.mvtstockagencepaysModel.find().exec(),
        //   this.salaireModel.find().exec(),
        //   this.salairemanagerModel.find().exec(),
        //   this.cotisationpayModel.find().exec(),
        //   this.dettebureauModel.find().exec(),
        //   this.remboursementModel.find().exec(),
        //   this.chefsectionModel.find().exec(),
        //   this.missionModel.find().exec(),
        //   this.caisseModel.find().exec(),
        //   this.congeModel.find().exec(),
        //   this.employerModel.find().exec(),
        //   this.entrepotModel.find().exec(),
        //   this.stockalertentrepotModel.find().exec(),
        //   this.entrepotoperationModel.find().exec(),
        //   this.sortieproduitentrepotModel.find().exec(),
        //   this.entrepotproduitstockModel.find().exec(),
        //   this.expenseModel.find().exec(),
        //   this.categoryModel.find().exec(),
        //   this.anneeModel.find().exec(),
        //   this.moisModel.find().exec(),
        //   this.mvtstockModel.find().exec(),
        //   this.consignationModel.find().exec(),
        //   this.mvtstockpaysentrepotModel.find().exec(),
        //   this.patientModel.find().exec(),
        //   this.patientdoctorModel.find().exec(),
        //   this.patienkineModel.find().exec(),
        //   this.caissekineModel.find().exec(),
        //   this.caissekinesoldeModel.find().exec(),
        //   this.caissemachineModel.find().exec(),
        //   this.caissemachinesoldeModel.find().exec(),
        //   this.caissecarnetModel.find().exec(),
        //   this.caissecarnetsoldeModel.find().exec(),
        //   this.demandeModel.find().exec(),
        //   this.seanceModel.find().exec(),
        //   this.paysModel.find().exec(),
        //   this.productendoModel.find().exec(),
        //   this.venteproductendoModel.find().exec(),
        //   this.productendostockModel.find().exec(),
        //   this.roleModel.find().exec(),
        //   this.stockModel.find().exec(),
        //   this.stockpaysModel.find().exec(),
        //   this.superviseurzoneModel.find().exec(),
        //   this.userModel.find().exec(),
        // ]);

        // const donnees = 'collectionsData.json'
        // const donnees2 = 'collectionsData.xlsx'
        // await this.writeJSONToFile(collectionsData, donnees);
        // const fichierzipname = 'data1.zip';
       
        // const jsonFiles: string[] = [];
        // const collectionNames = ['affectation','agence', 'weekendy', 'produitvendupays', 'produitvendubureau','weekendyDocteur','manager', 'products','zone','zoneca','zonecamois','primesz','section','chefsectionprime','sectionca','sectioncamois','tauxzone','tauxsection','taux','paysca','payscayear','stockagence','mvtStockagencePays','salaire','salaireManager','cotisationPaye','detteBureau','remboursement','chefsection','mission','caisse','conge','employer','entrepot','stockAlerteEntrepot','entrepotOperation','sortieProduitEntrepot','entrepotProduitStock','expense','category','annee','mois','mouvementstock','consignation','mvtStockPaysEntrepot','patient','patientdoctor','patientkine','caissekine','caissekinesolde','caissemachine','caissemachinesolde','caissecarnet','caissecarnetsolde','demande','seance','pays','produitendommage','venteProduitendommage','produitendommagestock','role','stock','stockPays','superviseurzone', 'users'];
        // const contisation = await this.salairemanagerService.cotisationbackup();
        // const contisationpaye = await this.salairemanagerService.cotisationpayebackup();
        // // const salairemanager = await this.salairemanagerService.salairemanagerbackup();
        // // const dettebureau = await this.salairemanagerService.dettebureaubackup();
        // // const remboursement = await this.salairemanagerService.remboursementbackup();
        // // const section = await this.sectionservice.sectionbackup();
        // // const chefsectionprime = await this.sectionservice.chefsectionprimebackup();
        // // const sectionca = await this.sectionservice.sectioncabackup();
        // // const sectioncamois = await this.sectionservice.sectioncamoisbackup();
        // // const stock = await this.stockService.stockbackup();
        // // const stockpay = await this.stockPaysService.stockpaybackup();
        // // const stockagence = await this.stockagenceService.stockagencebackup();
        // // const superviseurzone = await this.superviseurzoneService.superviserzonebackup();
        // // const taux = await this.tauxservice.tauxbackup();
        // // const tauxzone = await this.tauxzoneservice.tauzonebackup();
        // // const tauxsection = await this.tauxzoneservice.tausectionbackup();
        // // const users = await this.userService.userbackup();
        // // const weekendies= await this.weekendyservice.weekendybackup();
        // // const zones = await this.zoneservice.zonebackup();
        // // const salaire = await this.salaireService.salairebackup();
        // // const roles= await this.roleService.rolebackup();
        // // const produits = await this.produitService.productsbackup();
        // // const produitendommages = await this.produitendommageService.produitendommagesbackup();
        // // const produitendommagesvendus = await this.produitendommageService.produitendovendubackup();
        // // const produitendommagesstock = await this.produitendommageService.stockproduitendo();
        // // const patients = await this.patientService.patientbackup();
        // // const patientsdocteur = await this.patientService.patientdocteurbackup();
        // // const patientskine = await this.patientService.patientkinebackup();
        // // const caissekine = await this.patientService.caissekinebackup();
        // // const soldecaissekine = await this.patientService.caissekinesoldebackup();
        // // const caissemachine = await this.patientService.caissemachinebackup();
        // // const caissemachinesolde = await this.patientService.caissemachinesoldebackup();
        // // const caissecarnet = await this.patientService.caissecarnetbackup();
        // // const caissecarnetsolde = await this.patientService.caissecarnetsoldebackup();
        // // const demande = await this.patientService.demandebackup();
        // // const seance = await this.patientService.seancebackup();
        // // const pays = await this.paysService.paysbackup();
        // // const paysca = await this.payscaservice.findAllCabackup();
        // // const missions = await this.assignmentService.missionbackup();

        // // const mvtstockpaysentrepot = await this.mvtStockService.mvtstockbackup();

        // // const mouvementstockpaysbureau = await this.mouvementstockservice.mouvementstockbackup();
        // // const consignation = await this.mouvementstockservice.consignationbackup();
        // // const annee = await this.moisannesservice.anneebackup();
        // // const mois = await this.moisannesservice.moisbackup();
        // // const managers = await this.managerservice.managersbackup();
        // // const caisse = await this.caisseService.caissebackup();
        // // const expenses = await this.expenseservice.expensesbackup();
        // // const categories = await this.expenseservice.categoriesbackup();
        // // const entrepot = await this.entrepotservice.entrepotbackup();
        // // const chefsections = await this.chefsectionService.chefsectionbackup();
        // // const operationentrepot = await this.entrepotservice.operationentrepotbackup();
        // // const stockentrepot = await this.entrepotservice.entrepotstockbackup();
        // // const sortieentrepot = await this.entrepotservice.sortieentrepotbackup();
        // // const stockalertentrepot = await this.entrepotservice.stockalertbackup();
        // // const employer = await this.employerservice.employerbackup();
        // // const conges = await this.congesservice.congebackup();
        // // const agences = await this.agenceservice.bureaubackup();
        // // const affectations  = await this.affectationservice.affectationbackup();
        // console.log(collectionNames.length)
        // await this.writeExcelToFile(collectionsData, donnees2);
        // await this.creerZipArchive(donnees2, fichierzipname);
        // console.log('collectionsData',collectionsData);

        // for (let i = 0; i < collectionNames.length; i++) {
        //   const collectionName = collectionNames[i];
        //   const fileName = `${collectionName}.xlsx`;
        //   console.log(fileName);
        //   await this.writeExcelToFile(collectionsData[i], fileName);
        //   jsonFiles.push(fileName);
        // }
        // const zipFileName = 'data.zip';
        // await this.createZipArchive(jsonFiles, zipFileName);

        // // Envoyer l'e-mail avec la pièce jointe ZIP
        // await this.sendEmail(zipFileName);
        // await this.sendEmail(fichierzipname);

        // return collectionsData;
    } catch (error) {
      console.error('Une erreur s\'est produite:', error);
    }
  }

  private async writeJSONToFile(data: any[], fileName: string): Promise<void> {
    const jsonContent = await jsonexport(data);
    fs.writeFileSync(fileName, jsonContent);
  }

  private async createZipArchive(files: string[], zipFileName: string): Promise<void> {
    const output = fs.createWriteStream(zipFileName);
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.pipe(output);
    files.forEach(file => {
      archive.file(file, { name: file });
    });

    await archive.finalize();
  }

  private async creerZipArchive(jsonFileName: string, zipFileName: string): Promise<void> {
    const output = fs.createWriteStream(zipFileName);
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.pipe(output);
    archive.file(jsonFileName, { name: 'collectionsData.json' });

    await archive.finalize();
  }

  private async writeExcelToFile(data: any[], fileName: string): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');
    // Ecrire les données dans le fichier Excel
    // Vous devrez adapter cela en fonction du format de vos données
    worksheet.addRows(data);
    await workbook.xlsx.writeFile(fileName);
  }

 
  // private async sendEmail(zipFileName: string): Promise<void> {
  //   const transporter = nodemailer.createTransport({
  //     // Configuration SMTP
  //     host: 'smtp.gmail.com',
  //       port: 465,
  //       secure: true,
  //     auth: {
  //       email: 'gouandje@gmail.com',
  //       pass: 'Gbbs@1990'
  //     }
  //   });

  //   const mailOptions = {
  //     from: 'gouandje@gmail.com',
  //     to: 'aidteckpro@gmail.com',
  //     subject: 'Export de données',
  //     text: 'Veuillez trouver ci-joint les données exportées.',
  //     attachments: [
  //       {
  //         path: zipFileName
  //       }
  //     ]
  //   };

  //   await transporter.sendMail(mailOptions);
  // }

  async sendEmail(destination: string, subject: string, message: string) {
    await this.mailerService.sendMail({
      to: destination,
      subject: subject,
      text: message,
    });
  }


  async backupdata(){
      const contisation = await this.salairemanagerService.cotisationbackup();
      const contisationpaye = await this.salairemanagerService.cotisationpayebackup();
      const salairemanager = await this.salairemanagerService.salairemanagerbackup();
      const dettebureau = await this.salairemanagerService.dettebureaubackup();
      const remboursement = await this.salairemanagerService.remboursementbackup();
      const section = await this.sectionservice.sectionbackup();
      const chefsectionprime = await this.sectionservice.chefsectionprimebackup();
      const sectionca = await this.sectionservice.sectioncabackup();
      const sectioncamois = await this.sectionservice.sectioncamoisbackup();
      const stock = await this.stockService.stockbackup();
      const stockpay = await this.stockPaysService.stockpaybackup();
      const stockagence = await this.stockagenceService.stockagencebackup();
      const superviseurzone = await this.superviseurzoneService.superviserzonebackup();
      const taux = await this.tauxservice.tauxbackup();
      const tauxzone = await this.tauxzoneservice.tauzonebackup();
      const tauxsection = await this.tauxzoneservice.tausectionbackup();
      const users = await this.userService.userbackup();
      const weekendies= await this.weekendyservice.weekendybackup();
      const zones = await this.zoneservice.zonebackup();
      const salaire = await this.salaireService.salairebackup();
      const roles= await this.roleService.rolebackup();
      const produits = await this.produitService.productsbackup();
      const produitendommages = await this.produitendommageService.produitendommagesbackup();
      const produitendommagesvendus = await this.produitendommageService.produitendovendubackup();
      const produitendommagesstock = await this.produitendommageService.stockproduitendo();
      const patients = await this.patientService.patientbackup();
      const patientsdocteur = await this.patientService.patientdocteurbackup();
      const patientskine = await this.patientService.patientkinebackup();
      const caissekine = await this.patientService.caissekinebackup();
      const soldecaissekine = await this.patientService.caissekinesoldebackup();
      const caissemachine = await this.patientService.caissemachinebackup();
      const caissemachinesolde = await this.patientService.caissemachinesoldebackup();
      const caissecarnet = await this.patientService.caissecarnetbackup();
      const caissecarnetsolde = await this.patientService.caissecarnetsoldebackup();
      const demande = await this.patientService.demandebackup();
      const seance = await this.patientService.seancebackup();
      const pays = await this.paysService.paysbackup();
      const paysca = await this.payscaservice.findAllCabackup();
      const missions = await this.assignmentService.missionbackup();

      const mvtstockpaysentrepot = await this.mvtStockService.mvtstockbackup();

      const mouvementstockpaysbureau = await this.mouvementstockservice.mouvementstockbackup();
      const consignation = await this.mouvementstockservice.consignationbackup();
      const annee = await this.moisannesservice.anneebackup();
      const mois = await this.moisannesservice.moisbackup();
      const managers = await this.managerservice.managersbackup();
      const caisse = await this.caisseService.caissebackup();
      const expenses = await this.expenseservice.expensesbackup();
      const categories = await this.expenseservice.categoriesbackup();
      const entrepot = await this.entrepotservice.entrepotbackup();
      const chefsections = await this.chefsectionService.chefsectionbackup();
      const operationentrepot = await this.entrepotservice.operationentrepotbackup();
      const stockentrepot = await this.entrepotservice.entrepotstockbackup();
      const sortieentrepot = await this.entrepotservice.sortieentrepotbackup();
      const stockalertentrepot = await this.entrepotservice.stockalertbackup();
      const employer = await this.employerservice.employerbackup();
      const conges = await this.congesservice.congebackup();
      const agences = await this.agenceservice.bureaubackup();
      const affectations  = await this.affectationservice.affectationbackup();
      // console.log(collectionNames.length)

      return {
        contisation,
        contisationpaye,
        salairemanager,
        dettebureau,
        remboursement,
        section,
        chefsectionprime,
        sectionca,
        sectioncamois,
        stock,
        stockpay,
        stockagence,
        superviseurzone,
        taux,
        tauxzone,
        tauxsection,
        users,
        weekendies,
        zones,
        salaire,
        roles,
        produits,
        produitendommages,
        produitendommagesvendus,
        produitendommagesstock,
        patients,
        patientsdocteur,
        patientskine,
        caissekine,
        soldecaissekine,
        caissemachine,
        caissemachinesolde,
        caissecarnet,
        caissecarnetsolde,
        demande,
        seance,
        pays,
        paysca,
        missions,
        mvtstockpaysentrepot,
        mouvementstockpaysbureau,
        consignation,
        annee,
        mois,
        managers,
        caisse,
        expenses,
        categories,
        entrepot,
        chefsections,
        operationentrepot,
        stockentrepot,
        sortieentrepot,
        stockalertentrepot,
        employer,
        conges,
        agences,
        affectations,
      }
  }
}
