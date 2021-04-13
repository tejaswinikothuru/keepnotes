import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor{

  constructor() { }

  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    //gettoken
    let token=localStorage.getItem("token")

    //if token is not existed
    if(token==undefined){
      return next.handle(req)
    }
    else{
      //add token to header of req obj
      let modifiedreqobj=req.clone({headers:req.headers.set("Authorization", "Bearer "+token)})
      //forward req obj to next
        return next.handle(modifiedreqobj)
    }
  }
}
