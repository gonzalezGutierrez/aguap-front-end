import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{RegisterComponent}from './register/register.component'
import{LoginComponent }from './login/login.component'
import{ForgotPasswordComponent}from  './forgot-password/forgot-password.component'
import{RecoverAccountComponent}from './recover-account/recover-account.component'
import {NotFoundComponent}from './not-found/not-found.component';
import {UsersComponent} from'./users/users.component';
import {ProfileComponent} from'./profile/profile.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import {MyUbicationsComponent} from './my-ubications/my-ubications.component';
import {RequestOrdesComponent} from './request-ordes/request-ordes.component';
import {OrderListComponent} from './order-list/order-list.component';
import {PostRegisterComponent} from './post-register/post-register.component';
import {SupplierListComponent} from './suppliers/supplier-list/supplier-list.component';
import {CreateSupplierComponent} from './suppliers/create-supplier/create-supplier.component';
import {UpdateSupplierComponent} from './suppliers/update-supplier/update-supplier.component';
import {SupplierDetailsComponent} from './suppliers/supplier-details/supplier-details.component';

import {SupplieListComponent} from './supplies/supplie-list/supplie-list.component';
import {CreateSupplieComponent} from './supplies/create-supplie/create-supplie.component';
import {UpdateSupplieComponent} from './supplies/update-supplie/update-supplie.component';
import {SupplieDetailsComponent} from './supplies/supplie-details/supplie-details.component';
import { from } from 'rxjs';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'registerUser',component:RegisterComponent},
  {path:'forgotPassword',component:ForgotPasswordComponent},
  {path:'recoverAccount',component:RecoverAccountComponent},
  {path:'',component:LoginComponent,pathMatch: 'full'}, 
  {path:'user',component:UsersComponent},
  {path:'profile',component:ProfileComponent},
  {path:'ubications',component:MyUbicationsComponent},
  {path:'requestOrders',component:RequestOrdesComponent},
  {path:'orderList',component:OrderListComponent},
  {path:'menubar',component:MenuBarComponent},
  {path: 'postRegister',component:PostRegisterComponent},
  {path: 'suppliersList',component:SupplierListComponent},
  {path: 'addSupplier', component:CreateSupplierComponent},
  {path: 'updateSupplier/:id', component:UpdateSupplierComponent},
  {path: 'detailSupplier/:id', component:SupplierDetailsComponent},

  {path: 'suppliesList_',component:SupplieListComponent},
  {path: 'addSupplie_', component:CreateSupplieComponent},
  {path: 'updateSupplie_/:id', component:UpdateSupplieComponent},
  {path: 'detailSupplie_/:id', component:SupplieDetailsComponent},
  {path: '**',component:NotFoundComponent}, 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
