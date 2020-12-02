import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { RecoverAccountComponent } from './recover-account/recover-account.component'
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MyUbicationsComponent } from './my-ubications/my-ubications.component';
import { RequestOrdesComponent } from './request-ordes/request-ordes.component';
import { OrderListComponent } from './order-list/order-list.component';
import { PostRegisterComponent } from './post-register/post-register.component';

//STEPS TO ORDER ROUTES
import { ChooseUbicationComponent } from './orders-steps/choose-ubication/choose-ubication.component';
import { ChooseRepartidorComponent } from './orders-steps/choose-repartidor/choose-repartidor.component';
import { ChooseDateAndTimeComponent } from './orders-steps/choose-date-and-time/choose-date-and-time.component';
import { ChooseServicesComponent } from './orders-steps/choose-services/choose-services.component';


//ORDERS ROUTES
import { OrderCurrentComponent } from './orders/order-current/order-current.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registerUser', component: RegisterComponent },
    { path: 'forgotPassword', component: ForgotPasswordComponent },
    { path: 'recoverAccount', component: RecoverAccountComponent },
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'user', component: UsersComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'ubications', component: MyUbicationsComponent },
    { path: 'requestOrders', component: RequestOrdesComponent },
    { path: 'orderList', component: OrderListComponent },
    { path: 'menubar', component: MenuBarComponent },
    { path: 'postRegister', component: PostRegisterComponent },
    {
        path:'order-steps/ubicaciones',component:ChooseUbicationComponent
    },
    {
        path:'order-steps/repartidores',component:ChooseRepartidorComponent
    },
    {
        path:'order-steps/fecha-hora',component:ChooseDateAndTimeComponent
    },
    {
        path:'order-steps/servicios',component:ChooseServicesComponent
    },
    {
        path:'orders/order-current',component:OrderCurrentComponent
    },
    { path: '**', component: NotFoundComponent },


];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
