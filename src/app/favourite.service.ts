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

   getfavourites():Observable<any>{
    return this.hc.get("/favourite/getfavourites")
   }

   deleteFavourite(delobj):Observable<any>{
     console.log(delobj.title)
    return this.hc.delete(`/favourite/removefavourite/${delobj.title}`)
   }
}
