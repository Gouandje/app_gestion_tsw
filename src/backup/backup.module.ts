import { Module } from '@nestjs/common';
import { BackupService } from './backup.service';
import { BackupController } from './backup.controller';
import { MailService } from './mail.service';
import { BackupSchedulerService } from './backup-scheduler.service';
import { ProduitendommageModule } from 'src/produitendommage/produitendommage.module';
import { PaysModule } from 'src/pays/pays.module';
import { AgenceModule } from 'src/angence/agence.module';
import { AffectationModule } from 'src/affectation/affectation.module';
import { AssignmentModule } from 'src/assignment/assignment.module';
import { AuthModule } from 'src/auth/auth.module';
import { CaisseModule } from 'src/caisse/caisse.module';
import { ChefsectionModule } from 'src/chefsection/chefsection.module';
import { CongeModule } from 'src/conge/conge.module';
import { CotisationModule } from 'src/cotisation/cotisation.module';
import { DelecountryModule } from 'src/delecountry/delecountry.module';
import { EmployerModule } from 'src/employer/employer.module';
import { EntrepotModule } from 'src/entrepot/entrepot.module';
import { ExpensesModule } from 'src/expenses/expenses.module';
import { ManagerModule } from 'src/manager/manager.module';
import { MoisanneeModule } from 'src/moisannee/moisannee.module';
import { MouvementstockModule } from 'src/mouvementstock/mouvementstock.module';
import { MvtStockModule } from 'src/mvt-stock/mvt-stock.module';
import { PatientModule } from 'src/patient/patient.module';
import { PayscaModule } from 'src/paysca/paysca.module';
import { ProduitModule } from 'src/produit/produit.module';
import { RoleModule } from 'src/role/role.module';
import { SalaireModule } from 'src/salaire/salaire.module';
import { SalaireManagerModule } from 'src/salaire_manager/salaire_manager.module';
import { SectionModule } from 'src/section/section.module';
import { StockPaysModule } from 'src/stock-pays/stock-pays.module';
import { StockModule } from 'src/stock/stock.module';
import { StockagenceModule } from 'src/stockagence/stockagence.module';
import { SuperviseurzoneModule } from 'src/superviseurzone/superviseurzone.module';
import { TauxModule } from 'src/taux/taux.module';
import { TauxzoneModule } from 'src/tauxzone/tauxzone.module';
import { UserModule } from 'src/user/user.module';
import { WeekendyModule } from 'src/weekendy/weekendy.module';
import { ZoneModule } from 'src/zone/zone.module';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { VenteProduitendommage, VenteProduitendommageSchema } from 'src/produitendommage/schemas/venteproduitendommage.schema';
import { Affectation, AffectationSchema } from 'src/affectation/schemas/affectation.schema';
import { Agence, AgenceSchema } from 'src/angence/schemas/agence.schema';
import { Mission, MissionSchema } from 'src/assignment/schemas/assignment.schema';
import { Caisse, CaisseSchema } from 'src/caisse/schemas/caisse.schema';
import { Chefsection, ChefsectionSchema } from 'src/chefsection/schemas/chefsection.schema';
import { Conge, CongeSchema } from 'src/conge/schemas/conge.schema';
import { Employer, EmployerSchema } from 'src/employer/schemas/employer.schema';
import { Entrepot, EntrepotSchema } from 'src/entrepot/schemas/entrepot.schema';
import { EntrepotOperation, EntrepotOperationSchema } from 'src/entrepot/schemas/entrepotoperation.schema';
import { EntrepotProduitStock, EntrepotProduitStockSchema } from 'src/entrepot/schemas/entrepotproduitstock.schema';
import { SortieProduitEntrepot, SortieProduitEntrepotSchema } from 'src/entrepot/schemas/sortieproduitentrepot.schema';
import { StockAlerteEntrepot, StockAlerteEntrepotSchema } from 'src/entrepot/schemas/stockalertentrepot.schema';
import { Category, CategorySchema } from 'src/expenses/schemas/category.schema';
import { Expense, ExpenseSchema } from 'src/expenses/schemas/expense.schema';
import { Manager, ManagerSchema } from 'src/manager/schemas/manager.schema';
import { Annee, AnneeSchema } from 'src/moisannee/schemas/annee.schema';
import { Mois, MoisSchema } from 'src/moisannee/schemas/mois.schema';
import { Consignation, ConsignationSchema } from 'src/mouvementstock/schemas/consignation.schema';
import { Mouvementstock, MouvementstockSchema } from 'src/mouvementstock/schemas/mouvementstock.schema';
import { MvtStockPaysEntrepot, MvtStockPaysEntrepotSchema } from 'src/mvt-stock/schemas/mvt-stock.schema';
import { Caissecarnet, CaissecarnetSchema } from 'src/patient/schemas/caissecarnet.schema';
import { Caissecarnetsolde, CaissecarnetsoldeSchema } from 'src/patient/schemas/caissecarnetsolde.schema';
import { Caissekine, CaissekineSchema } from 'src/patient/schemas/caissekine.schema';
import { Caissekinesolde, CaissekinesoldeSchema } from 'src/patient/schemas/caissekinesolde.schema';
import { Caissemachine, CaissemachineSchema } from 'src/patient/schemas/caissemachine.schema';
import { Caissemachinesolde, CaissemachinesoldeSchema } from 'src/patient/schemas/caissemachinesolde.schema';
import { Demande, DemandeSchema } from 'src/patient/schemas/demande.schema';
import { Patient, PatientSchema } from 'src/patient/schemas/patient.schema';
import { Patientdoctor, PatientdoctorSchema } from 'src/patient/schemas/patientdoctor.schema';
import { Patientkine, PatientkineSchema } from 'src/patient/schemas/patientkine.schema';
import { Seance, SeanceSchema } from 'src/patient/schemas/seancepatientkine.schema';
import { Pays, PaysSchema } from 'src/pays/schemas/pays.schema';
import { Paysca, PayscaSchema } from 'src/paysca/schemas/paysca.schema';
import { Payscayear, PayscayearSchema } from 'src/paysca/schemas/payscayear.schema';
import { Products, ProductsSchema } from 'src/produit/schemas/products.shema';
import { Produitendommage, ProduitendommageSchema } from 'src/produitendommage/schemas/produitendommage.schema';
import { Produitendommagestock, ProduitendommagestockSchema } from 'src/produitendommage/schemas/produitendommagestock.schema';
import { Role, RoleSchema } from 'src/role/schemas/role.schema';
import { Salaire, SalaireSchema } from 'src/salaire/schemas/salaire.schema';
import { CotisationPaye, CotisationPayeSchema } from 'src/salaire_manager/schemas/cotisation_paye.schema';
import { DetteBureau, DetteBureauSchema } from 'src/salaire_manager/schemas/dette_bureau.schema';
import { Remboursement, RemboursementSchema } from 'src/salaire_manager/schemas/remboursement.schema';
import { SalaireManager, SalaireManagerSchema } from 'src/salaire_manager/schemas/salaire_manager.schema';
import { Chefsectionprime, ChefsectionprimeSchema } from 'src/section/schemas/chefsectionprime.schema';
import { Section, SectionSchema } from 'src/section/schemas/section.schema';
import { Sectionca, SectioncaSchema } from 'src/section/schemas/sectionca.schema';
import { Sectioncamois, SectioncamoisSchema } from 'src/section/schemas/sectioncamois.schema';
import { StockPays, StockPaysSchema } from 'src/stock-pays/schemas/stockpays.schema';
import { Stock, StockSchema } from 'src/stock/schemas/stock.schema';
import { MvtStockagencePays, MvtStockagencePaysSchema } from 'src/stockagence/schemas/mvtbackpays.schema';
import { Stockagence, StockagenceSchema } from 'src/stockagence/schemas/stockagence.schema';
import { Superviseurzone, SuperviseurzoneSchema } from 'src/superviseurzone/schemas/superviseurzone.schema';
import { Taux, TauxSchema } from 'src/taux/schemas/taux.schema';
import { Tauxsection, TauxsectionSchema } from 'src/tauxzone/schemas/tauxsection.schema';
import { Tauxzone, TauxzoneSchema } from 'src/tauxzone/schemas/tauxzone.schema';
import { Produitvendupays, ProduitvendupaysSchema } from 'src/weekendy/schemas/produitsvendupays.schema';
import { Produitvendubureau, ProduitvendubureauSchema } from 'src/weekendy/schemas/produitvendubureau.schema';
import { Weekendy, WeekendySchema } from 'src/weekendy/schemas/weekendy.schema';
import { WeekendyDocteur, WeekendyDocteurSchema } from 'src/weekendy/schemas/weekendydocteur.schema';
import { Primesz, PrimeszSchema } from 'src/zone/schemas/primesz.schema';
import { Zone, ZoneSchema } from 'src/zone/schemas/zone.schema';
import { Zoneca, ZonecaSchema } from 'src/zone/schemas/zoneca.schema';
import { Zonecamois, ZonecamoisSchema } from 'src/zone/schemas/zonecamois.schema';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports:[
    MailerModule.forRoot({
      transport: {
        host: 'mail.aidteck.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'gouandje.pdg@aidteck.com', // adresse e-mail Gmail
          pass: 'k$Q2crBkDC0Z', // mot de passe Gmail
        },
      },
    }),
    UserModule,
    ManagerModule, 
    ProduitModule, 
    WeekendyModule, 
    SalaireModule, 
    AgenceModule, 
    PaysModule, 
    AuthModule, ExpensesModule, StockModule, AssignmentModule, TauxModule, AffectationModule, CotisationModule, SalaireManagerModule, StockagenceModule, MouvementstockModule, ZoneModule, SectionModule, EmployerModule, CongeModule, StockPaysModule, MvtStockModule, RoleModule, TauxzoneModule, SuperviseurzoneModule, ChefsectionModule, CaisseModule, EntrepotModule, PayscaModule, MoisanneeModule, PatientModule, DelecountryModule, ProduitendommageModule,
    // MongooseModule.forFeature(
    //   [
        
    //     {
    //       name: Affectation.name,
    //       schema: AffectationSchema
    //     },
    //     {
    //       name: Agence.name,
    //       schema: AgenceSchema
    //     },
    //     {
    //       name: Weekendy.name,
    //       schema: WeekendySchema
    //     },
    //     {
    //       name: Produitvendupays.name,
    //       schema: ProduitvendupaysSchema
    //     },
    //     {
    //       name: Produitvendubureau.name,
    //       schema: ProduitvendubureauSchema
    //     },
    //     {
    //       name: WeekendyDocteur.name,
    //       schema: WeekendyDocteurSchema
    //     },
    //     {
    //       name: Manager.name,
    //       schema: ManagerSchema
    //     },
    //     {
    //       name: Products.name,
    //       schema: ProductsSchema
    //     },

    //     {
    //       name: Zone.name,
    //       schema: ZoneSchema
    //     },
    //     {
    //       name: Zoneca.name,
    //       schema: ZonecaSchema
    //     },
    //     {
    //       name: Zonecamois.name,
    //       schema: ZonecamoisSchema
    //     },
    //     {
    //       name: Primesz.name,
    //       schema: PrimeszSchema
    //     },
    //     {
    //       name: Section.name,
    //       schema: SectionSchema
    //     },
    //     {
    //       name: Chefsectionprime.name,
    //       schema: ChefsectionprimeSchema
    //     },
    //     {
    //       name: Sectionca.name,
    //       schema: SectioncaSchema
    //     },
    //     {
    //       name: Sectioncamois.name,
    //       schema: SectioncamoisSchema
    //     },
    //     {
    //       name: Tauxzone.name,
    //       schema: TauxzoneSchema
    //     },
    //     {
    //       name: Tauxsection.name,
    //       schema: TauxsectionSchema
    //     },
    //     {
    //       name: Taux.name,
    //       schema: TauxSchema
    //     },
    //     {
    //       name: Paysca.name,
    //       schema: PayscaSchema
    //     },
    //     {
    //       name: Payscayear.name,
    //       schema: PayscayearSchema
    //     },
    //     {
    //       name: Stockagence.name,
    //       schema: StockagenceSchema
    //     },
    //     {
    //       name: MvtStockagencePays.name,
    //       schema: MvtStockagencePaysSchema
    //     },
    //     {
    //       name: Salaire.name,
    //       schema: SalaireSchema
    //     },
    //     {
    //       name: SalaireManager.name,
    //       schema: SalaireManagerSchema
    //     },
    //     {
    //       name: CotisationPaye.name,
    //       schema: CotisationPayeSchema
    //     },
    //     {
    //       name: DetteBureau.name,
    //       schema: DetteBureauSchema
    //     },
    //     {
    //       name: Remboursement.name,
    //       schema: RemboursementSchema
    //     },
    //     {
    //       name: Chefsection.name,
    //       schema: ChefsectionSchema
    //     },
    //     {
    //       name: Mission.name,
    //       schema: MissionSchema
    //     },
    //     {
    //       name: Caisse.name,
    //       schema: CaisseSchema
    //     },
    //     {
    //       name: Conge.name,
    //       schema: CongeSchema
    //     },
    //     {
    //       name: Employer.name,
    //       schema: EmployerSchema
    //     },
    //     {
    //       name: Entrepot.name,
    //       schema: EntrepotSchema
    //     },
    //     {
    //       name: StockAlerteEntrepot.name,
    //       schema: StockAlerteEntrepotSchema
    //     },
    //     {
    //       name: EntrepotOperation.name,
    //       schema: EntrepotOperationSchema
    //     },
    //     {
    //       name: SortieProduitEntrepot.name,
    //       schema: SortieProduitEntrepotSchema
    //     },
    //     {
    //       name: EntrepotProduitStock.name,
    //       schema: EntrepotProduitStockSchema
    //     },
    //     {
    //       name: Expense.name,
    //       schema: ExpenseSchema
    //     },
    //     {
    //       name: Category.name,
    //       schema: CategorySchema
    //     },
    //     {
    //       name: Annee.name,
    //       schema: AnneeSchema
    //     },
       
    //     {
    //       name: Mois.name,
    //       schema:MoisSchema
    //     },
    //     {
    //       name: Mouvementstock.name,
    //       schema: MouvementstockSchema
    //     },
    //     {
    //       name: Consignation.name,
    //       schema: ConsignationSchema
    //     },
    //     {
    //       name: MvtStockPaysEntrepot.name,
    //       schema: MvtStockPaysEntrepotSchema
    //     },
    //     {
    //       name: Patient.name,
    //       schema: PatientSchema
    //     },
    //     {
    //       name: Patientdoctor.name,
    //       schema: PatientdoctorSchema
    //     },
    //     {
    //       name: Patientkine.name,
    //       schema: PatientkineSchema
    //     },
    //     {
    //       name: Caissekine.name,
    //       schema: CaissekineSchema
    //     },
    //     {
    //       name: Caissekinesolde.name,
    //       schema: CaissekinesoldeSchema
    //     },
    //     {
    //       name: Caissemachine.name,
    //       schema: CaissemachineSchema
    //     },
    //     {
    //       name: Caissemachinesolde.name,
    //       schema: CaissemachinesoldeSchema
    //     },
    //     {
    //       name: Caissecarnet.name,
    //       schema: CaissecarnetSchema
    //     },
    //     {
    //       name: Caissecarnetsolde.name,
    //       schema: CaissecarnetsoldeSchema
    //     },
    //     {
    //       name: Demande.name,
    //       schema: DemandeSchema
    //     },
    //     {
    //       name: Seance.name,
    //       schema: SeanceSchema
    //     },
    //     {
    //       name: Pays.name,
    //       schema: PaysSchema
    //     },
    //     {
    //       name: Produitendommage.name,
    //       schema: ProduitendommageSchema
    //     },
    //     {
         
    //       name: VenteProduitendommage.name,
    //       schema:VenteProduitendommageSchema
    //     },
    //     {
    //       name: Produitendommagestock.name,
    //       schema: ProduitendommagestockSchema
    //     },
    //     {
    //       name: Role.name,
    //       schema: RoleSchema
    //     },
    //     {
    //       name: Stock.name,
    //       schema: StockSchema
    //     },
    //     {
    //       name: StockPays.name,
    //       schema: StockPaysSchema
    //     },
    //     {
    //       name: Superviseurzone.name,
    //       schema: SuperviseurzoneSchema
    //     },
    //     { 
    //       name: User.name, 
    //       schema: UserSchema 
    //     }

    //   ])
  ],
  controllers: [BackupController],
  providers: [
    BackupService,
    MailService,
    BackupSchedulerService,
  ],
  exports: [BackupService,MailService,BackupSchedulerService]

})
export class BackupModule {}
