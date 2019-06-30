import { Component, OnInit , ViewChild} from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { ProductsService } from '../products.service'
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort} from '@angular/material/sort';



@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent implements OnInit {
  
  total:number = 0;  
  singleProductQuantity: number;
  substractNum :number;
  quantityArr:number[];
  
  // array from d.b
  allProducts:Observable<Product[]>;

  //array to local storage
  productsLocalStorage:any;

  productsArray:Product[];

  arrLen : any;

  numberOfItems:number ;

  // columns in table
  columnsToDisplay =['image','name','price','details','quantity','other']

  //pagination
  dataSource = new MatTableDataSource<Product>();
  
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;



  //dependency injection- calling the service
  constructor(private productService: ProductsService) { }

  

  loadAllProductsFromDB(){ 
    this.allProducts = this.productService.GetProducts();
  }
//======= update and delay function
  updateQuantiytoDb(){
    let productsArr = localStorage.getItem("item");    
    this.productsLocalStorage = JSON.parse(productsArr);
    this.arrLen = this.productsLocalStorage.length;
    console.log("update Quantity RUNING"+"|| arrlen=",this.arrLen);
    
    for (let i =0 ; i<this.arrLen; i++ ){
      let id =this.productsLocalStorage[i]['ProductId'];
      let q = this.productsLocalStorage[i].Quantity;
      localStorage.setItem(id,JSON.stringify(q));
      
      console.log("id = ",id,"q = ",q);       
    }
    
    
  }

  
//=======================================

// logs prodcuts in console log
  LogPrducts(){
    this.productService.GetProducts()
    .subscribe({ next: x => console.log("object is: ",x),                      
                 complete:() => console.log('got a complete notification'),
  })
  }

  loadProductsToTablePaginatorSource():void{
    this.productService.GetProducts()
    .subscribe( {next :data => this.dataSource.data = data ,
                 complete:() => console.log('got dataSource')
                } );
  }

  loadProductsToLocalStorage(){
    this.productService.GetProducts()
    .subscribe({ next: x => localStorage.setItem("item",JSON.stringify(x))})
  }

  getDataFromLocalStorage(){
    this.loadProductsToLocalStorage();
    let productsArr = localStorage.getItem("item");    
    this.productsLocalStorage = JSON.parse(productsArr);
    this.arrLen = this.productsLocalStorage.length;
    
  }

  //======== total number of items ==============
  totalQuantityOfItems():void{
    this.numberOfItems=0;
   
    for(let  i=0;i< this.productsLocalStorage.length ;i++)
      {
        this.numberOfItems += this.productsLocalStorage[i].Quantity;
      }
      localStorage.setItem("totalQuantityofItems",JSON.stringify(this.numberOfItems))
    }

  //================ ADD button ==========================
  addToQantity(id:number){
    for( let i=0; i<this.productsLocalStorage.length; i++){
      if ( this.productsLocalStorage[i].ProductId === id)
      {
        this.productsLocalStorage[i].Quantity +=1;
        localStorage.setItem("Quantity", JSON.stringify(this.productsLocalStorage[i].Quantity));
      }
    }
    this.totalQuantityOfItems();
    this.totalPrice();
    
    
  }

//================= SUBSTRACT  button=======================
  removeFromQuantity(id:number){
    for( let i=0; i<this.productsLocalStorage.length; i++){
      if ( this.productsLocalStorage[i].ProductId === id && this.productsLocalStorage[i].Quantity>0)
      {
        this.productsLocalStorage[i].Quantity -=1;
        localStorage.setItem("Quantity", JSON.stringify(this.productsLocalStorage[i].Quantity));
      }
    }
    this.totalQuantityOfItems();
    this.totalPrice();
    
  }
  //============================================

  // total price 
  totalPrice(){
    this.total = 0;
    for(var i=0;i<this.productsLocalStorage.length;i++){
      this.total += (this.productsLocalStorage[i].Price * 
        this.productsLocalStorage[i].Quantity);
    }
  }
  //=== post to DB Functions
  id:number;
  id2:number;

  addOneInDb(id:number):void{
    this.productService.addSingleProductQuantity(id)
    .subscribe( x => this.id = x);
    console.log("added one of prod id:",id);    
    
  }

  SubstractOneInDb(id2:number):void{
    this.productService.substracSingleProductQuantity(id2)
    .subscribe( x => this.id2 = x) ; 
    console.log("substracted one of prod id:",id2) ;
  }
  //=============================================
  refresh(): void {
    window.location.reload();
  }
//------------------------

  ngOnInit() {    
    
    this.getDataFromLocalStorage();
    this.totalQuantityOfItems();
    this.totalPrice();
    this.LogPrducts();
    this.loadProductsToTablePaginatorSource();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}


