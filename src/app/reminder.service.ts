import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private hc:HttpClient) { }

  createReminder(reminderobj):Observable<any>{
    return this.hc.post("/reminder/createreminder",reminderobj)
   }

   getReminder():Observable<any>{
    return this.hc.get("/reminder/getreminders")
   }

   deleteReminder(delobj):Observable<any>{
     console.log(delobj.title)
    return this.hc.delete(`/reminder/deletereminder/${delobj.title}`)
   }
}
