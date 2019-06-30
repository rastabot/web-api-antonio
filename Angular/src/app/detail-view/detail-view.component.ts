import { Component, OnInit,Input,Inject } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';




@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})

export class DetailViewComponent implements OnInit {

  

  
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog,     
    ) { }

  openDialog() {
    this.dialog.open(DialogDataExampleDialog);
  }

  
  product : Product;
  products: Observable<Product[]>;
  


  goBack(): void {
    this.location.back();
  }

  getProductDetails():void{
    const productId = +this.route.snapshot.paramMap.get('id');
    // console.log("product id =",productId,"|| type of productId =",typeof productId);    
    this.productService.GetProductById(productId)
    .subscribe(product => this.product = product );
  }

   //=== post to DB Functions
   id:number;
   id2:number;
 
   addOneInDb(id:number):void{
     this.productService.addSingleProductQuantity(id)
     .subscribe( x => this.id = x);
     console.log("added one of prod id:",id);
     this.getProductDetails();
     //window.location.reload();
     
   }
 
   SubstractOneInDb(id2:number):void{
     this.productService.substracSingleProductQuantity(id2)
     .subscribe( x => this.id2 = x) ; 
     console.log("substracted one of prod id:",id2) ;
     this.getProductDetails();
     //window.location.reload();
   }
   //=============================================

  ngOnInit() {    
    this.getProductDetails();
  }

}
//==================DIALOG MODAL ========================================================
@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: "") {}
  refresh(): void {
    window.location.reload();
}
}

