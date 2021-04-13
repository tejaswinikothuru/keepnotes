import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private hc:HttpClient) { }

  createReminder(reminderObj):Observable<any>{
    return this.hc.post("/reminder/createreminder",reminderObj)
   }

   getReminder(email):Observable<any>{
    return this.hc.get(`/reminder/getreminders/${email}`)
   }

   deleteReminder(delObj):Observable<any>{
    return this.hc.delete(`/reminder/deletereminder/${delObj.email}/${delObj.title}`)
   }

   removecheck(checobj):Observable<any>{
    console.log(localStorage.getItem("email"),checobj)
    return this.hc.put(`/reminder/removecheck/${localStorage.getItem("email")}`,checobj)
  }

  uncheck(checobj):Observable<any>{
    console.log(localStorage.getItem("email"),checobj)
    return this.hc.put(`/favourite/removecheck/${localStorage.getItem("email")}`,checobj)
  }
}
