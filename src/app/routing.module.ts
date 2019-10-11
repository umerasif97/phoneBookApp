import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ContactListComponent } from './contact-list/contact-list.component';

const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'contactList', component: ContactListComponent}
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
      RouterModule
   ] 
})
export class RoutingModule { };