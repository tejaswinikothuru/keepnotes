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

   removeCheckList(checobj):Observable<any>{
    return this.hc.put(`/reminder/removecheck/${localStorage.getItem("email")}`,checobj)
  }

  removeCheckedList(checobj):Observable<any>{
    return this.hc.put(`/reminder/removechecked/${localStorage.getItem("email")}`,checobj)
  }
}
