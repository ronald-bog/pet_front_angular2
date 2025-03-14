import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { TypesComponent } from './components/types/types.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { GaleriaComponent } from './components/galeria/galeria.component';

const routes: Routes = [

  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'types', component: TypesComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'catalog', component: CatalogComponent  },
  { path: 'spinner', component: SpinnerComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
