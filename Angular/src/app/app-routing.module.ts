import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { DetailViewComponent } from  './detail-view/detail-view.component';
import { ContactFormComponent } from './contact-form/contact-form.component';


const routes: Routes = [
  {path:'', component: ProductsListComponent },
  {path:'contact', component: ContactFormComponent },
  {path:':id', component: DetailViewComponent },
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
