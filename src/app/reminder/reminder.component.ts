import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReminderService } from '../reminder.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  constructor(private rs:ReminderService,private Ts:ToastrService) { }

  reminderData=[];

  ngOnInit(): void {
     //subscribing
     this.rs.getReminder().subscribe(res => {
      this.reminderData = res["message"]
    if(res["message"]=="failed"){
      alert(res["reason"])
    }
    else{
      if(this.reminderData.length==0)
      {
        this.Ts.info("reminder is empty")
      }
    }
    }, err => { console.log(err) })
  }

   //method to remove reminder notes
   unremNote(reminderObj,ind){
    //subscribing
    this.rs.deleteReminder(reminderObj).subscribe(res => {
      if(res["message"]=="failed"){
        alert(res["reason"])
      }
      else{
        if (res["message"] == "removed from reminders") {
          this.reminderData.splice(ind, 1)
          this.Ts.warning("Removed from reminder")
        }
      }
    }, err => { console.log(err) })
  }

}
