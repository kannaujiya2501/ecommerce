import { Component } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Productmodel } from '../model/productmodel';
import { ProductserviceService } from '../shared/productservice.service';
@Component({
  selector: 'app-productdashboard',
  templateUrl: './productdashboard.component.html',
  styleUrls: ['./productdashboard.component.css']
})
export class ProductdashboardComponent {
  productModelObj:Productmodel=new Productmodel;
  formValue!: FormGroup;
  allProductData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formBuilder: FormBuilder, private api: ProductserviceService) { }
  productModel:Productmodel[]=[];

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      productName: ['',Validators.required],
      productDescription: ['',Validators.required],
      imageUrl: ['',Validators.required],
      unitPrice: ['',Validators.required],
     
    })
    this.getAllData();
  }


  
  clickAddProduct() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  addProduct() {
    this.productModelObj.productName = this.formValue.value.productName;
    this.productModelObj.productDescription = this.formValue.value.productDescription;
    this.productModelObj.imageUrl = this.formValue.value.imageUrl;
    this.productModelObj.unitPrice = this.formValue.value.unitPrice;
   
    this.api.postProduct(this.productModelObj).subscribe(res => {
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
    this.api.getProduct().subscribe(res => {
      this.allProductData = res;

     
     
    })

  }
  deleteProduct(data: any) {
    this.api.deleteProduct(data.id).subscribe(res => {
      alert("Product Record Deleted");
      this.getAllData();
    })
  }
  onEditProduct(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.productModelObj.productId = data.id;
    this.formValue.controls['productName'].setValue(data.productName);
    this.formValue.controls['productDescription'].setValue(data.productDescription);
    this.formValue.controls['imageUrl'].setValue(data.imageUrl);
    this.formValue.controls['unitPrice'].setValue(data.unitPrice);
    

  }
  updateProduct() {
    this.productModelObj.productName = this.formValue.value.productName;
    this.productModelObj.productDescription = this.formValue.value.productDescription;
    this.productModelObj.imageUrl = this.formValue.value.imageUrl;
    this.productModelObj.unitPrice = this.formValue.value.unitPrice;
    
    this.api.updateProduct(this.productModelObj, this.productModelObj.productId).subscribe(res => {
      alert("Product Record Updated!");
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData();

    })
  }
}

