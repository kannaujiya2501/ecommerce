import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  url=" http://localhost:3000/posts";

  constructor(private _http:HttpClient) { }
  postProduct(data:any){
    
    return this._http.post<any>(this.url,data).pipe(map((res:any)=>{
      return res;
    }))
  }
  getProduct(){
    return this._http.get<any>(this.url).pipe(map((res:any)=>{
      return res;
      console.log(res);
    }))
  }
  updateProduct(data:any,id:number){
    return this._http.put<any>(this.url+"/"+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteProduct(id:number){
    return this._http.delete<any>(this.url+"/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }

}


 