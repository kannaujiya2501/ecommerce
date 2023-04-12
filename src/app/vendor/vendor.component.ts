import { Component } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Mvendor } from '../model/mvendor';
import { svendorService } from '../shared/svendor.service';
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class vendorComponent {
  vendorModelObj:Mvendor=new Mvendor;
  formValue!: FormGroup;
  allvendorData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formBuilder: FormBuilder, private api: svendorService) { }
  vendorModel:Mvendor[]=[];

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      vendorName: ['',Validators.required],
      companyName: ['',Validators.required],
      Email: ['',Validators.required],
      phone: ['',Validators.required],
     
    })
    this.getAllData();
  }


  
  clickAddvendor() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  addvendor() {
    this.vendorModelObj.vendorName = this.formValue.value.vendorName;
    this.vendorModelObj.companyName = this.formValue.value.companyName;
    this.vendorModelObj.Email = this.formValue.value.Email;
    this.vendorModelObj.phone = this.formValue.value.phone;
   
    this.api.postvendor(this.vendorModelObj).subscribe(res => {
      console.log(res);
      console.log("DataSaved Succesfully")
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData();

    },
      err => {
        alert("something went wrong")
      })

  }
  getAllData() {
    this.api.getvendor().subscribe(res => {
      this.allvendorData = res;

     
     
    })

  }
  deletevendor(data: any) {
    this.api.deletevendor(data.id).subscribe(res => {
      alert("vendor Record Deleted");
      this.getAllData();
    })
  }
  onEditvendor(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.vendorModelObj.vendorId = data.id;
    this.formValue.controls['vendorName'].setValue(data.vendorName);
    this.formValue.controls['companyName'].setValue(data.companyName);
    this.formValue.controls['Email'].setValue(data.Email);
    this.formValue.controls['phone'].setValue(data.phone);
    

  }
  updatevendor() {
    this.vendorModelObj.vendorName = this.formValue.value.vendorName;
    this.vendorModelObj.companyName = this.formValue.value.companyName;
    this.vendorModelObj.Email = this.formValue.value.Email;
    this.vendorModelObj.phone = this.formValue.value.phone;
    
    this.api.updatevendor(this.vendorModelObj, this.vendorModelObj.vendorId).subscribe(res => {
      alert("vendor Record Updated!");
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData();

    })
  }
}

