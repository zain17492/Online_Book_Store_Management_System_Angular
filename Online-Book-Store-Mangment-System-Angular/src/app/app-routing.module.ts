import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { AllusersComponent } from './allusers/allusers.component';
import { AddbookComponent } from './addbook/addbook.component';
import { AddauthorComponent } from './addauthor/addauthor.component';

const routes: Routes = [
  { path: 'list-book', component: ListbookComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: AppComponent },
  
  { path: 'register/:uid', component: RegisterComponent },
  { path: 'reg/:id', component: RegisterComponent },
  { path: 'showuser', component: AllusersComponent },
  { path: 'addbook', component: AddbookComponent },
  { path: 'addauthor', component: AddauthorComponent },
  { path: 'addauthor/:id', component: AddauthorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
