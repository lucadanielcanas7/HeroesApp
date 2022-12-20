import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//#region MY MODULES
import { AuthRoutingModule } from './auth-routing.module';
//#endregion

//#region MY COMPONENTS
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
//#endregion

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
