import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private hc:HttpClient) { }

  //creating user
  createuser(userobj):Observable<any>{
    return this.hc.post("/user/createuser",userobj)
   }

   //cheecking user login
  userLogincheck(usercredobj):Observable<any>{
    return this.hc.post("/user/login",usercredobj)
  }
  

  
}
