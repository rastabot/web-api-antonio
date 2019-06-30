import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactForm } from '../contact-form';
import { ContactFormService } from '../contact-form.service';
import { Validators,FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  allForms:Observable<ContactForm[]>;
  

  complainForm: any;

  constructor(
    private contactformService: ContactFormService,
    private formBuilder : FormBuilder,
    ) { }

    get diagnostic() { return JSON.stringify(this.allForms); }

    
  ngOnInit() {
    this.complainForm = this.formBuilder.group({
      FirstName:['',[Validators.required]],
      LastName:['',[Validators.required]],
      Email:['',[Validators.required]],
      Complain:['',[Validators.required]],
    });
    this.loadAllForms();
  }


  //============================
  loadAllForms(){
    this.allForms = this.contactformService.getComplains();
  }

  //===== table config
  columnsToDisplay =['name','lastName','complain','delete']

  //====== Post a Form
  onSubmit(){
    const complain = this.complainForm.value;    
    this.createComplain(complain);
    
    //this.complainForm.reset();
  }

  createComplain(complain:ContactForm){
    this.contactformService.postComplain(complain)
    .subscribe(()=> {
      this.loadAllForms();
            
    })
  }
  // delete a complain
  deleteComplain(id:number){
    this.contactformService.deleteComplain(id)
    .subscribe(()=> this.loadAllForms() )
  }

}
