import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from '../../@core/interceptor/interceptor.service';

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [],
}];

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule
  ]

})
export class AuthModule { }
