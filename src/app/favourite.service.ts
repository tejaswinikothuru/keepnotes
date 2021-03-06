import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private hc:HttpClient) { }
  createfavourite(favouriteobj):Observable<any>{
    return this.hc.post("/favourite/createfavourite",favouriteobj)
   }

   getfavourites(email):Observable<any>{
    return this.hc.get(`/favourite/getfavourites/${email}`)
   }

   deleteFavourite(delobj):Observable<any>{
    return this.hc.delete(`/favourite/removefavourite/${delobj.email}/${delobj.title}`)
   }

   removeCheckList(checobj):Observable<any>{
    return this.hc.put(`/favourite/removecheck/${localStorage.getItem("email")}`,checobj)
  }

  removeCheckedList(checobj):Observable<any>{
    return this.hc.put(`/favourite/removechecked/${localStorage.getItem("email")}`,checobj)
  }
}
