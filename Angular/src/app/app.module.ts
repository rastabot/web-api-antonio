import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavComponent } from './nav/nav.component';

import { HttpClientModule, HttpClient} from '@angular/common/http';
import { ProductsService } from './products.service';
import {
          MatButtonModule, MatMenuModule, MatDatepickerModule,
          MatCardModule, MatNativeDateModule,
          MatFormFieldModule, MatTooltipModule, MatToolbarModule, MatInputModule,
          MatSidenavModule, MatRadioModule,MatTableModule
        } from '@angular/material';

import { MatDialogModule} from '@angular/material/dialog';
import { MatGridListModule} from '@angular/material/grid-list'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsListComponent } from './products-list/products-list.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { DialogDataExampleDialog} from './detail-view/detail-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductsListComponent,
    DetailViewComponent,
    ContactFormComponent,
    DialogDataExampleDialog,        
  ],
  imports: [  
    BrowserModule,    
    AppRoutingModule,
    HttpClientModule,
    MatGridListModule,
    MatTableModule ,
    MatButtonModule, MatMenuModule, MatDatepickerModule,
    MatIconModule, MatCardModule, MatNativeDateModule,
    MatFormFieldModule, MatTooltipModule, MatToolbarModule, MatInputModule,
    MatSidenavModule, MatRadioModule,BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    NgxPaginationModule,
       
  ],
  exports:[MatFormFieldModule,MatInputModule],
  entryComponents: [ DialogDataExampleDialog],
  providers: [HttpClientModule,ProductsService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
