import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FavouriteService } from '../favourite.service';
import { NotesService } from '../notes.service';
import { ReminderService } from '../reminder.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {

  constructor(private rs:ReminderService,private ns:NotesService,private fs:FavouriteService,private Ts:ToastrService,private router:Router) { }
  reminderHeading=false;
  emptyRemainders=false
  reminderData=[];
  email;

  ngOnInit(): void {

    this.email=localStorage.getItem("email")
     //subscribing
     this.rs.getReminder(this.email).subscribe(res => {
       
      this.reminderData = res["message"]
      console.log(this.reminderData)
    if(res["message"]=="failed"){
      alert(res["reason"])
      this.router.navigateByUrl("/signin")
    }
    else{
      if(this.reminderData.length==0)
      {
        this.emptyRemainders=true;
      }
      else{
        this.reminderHeading=true;
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
        this.router.navigateByUrl("/signin")
      }
      else{
        if (res["message"] == "removed from reminders") {
          this.reminderData.splice(ind, 1)
          this.Ts.warning("Removed from reminder")
        }
      }
    }, err => { console.log(err) })
  }
   

  checked(checkobj,title){
    console.log(checkobj,title)
    let checkbox={title:title,checkobj:checkobj}
    this.rs.removecheck(checkbox).subscribe(res=>{
      this.reminderData=res["message"]
      console.log(this.reminderData)
    },err=>{})

    this.ns.removecheck(checkbox).subscribe(res=>{})
    this.fs.removecheck(checkbox).subscribe(res=>{})
  }

  uncheck(checkedobj,title){
    console.log(checkedobj,title)
    let checkedbox={title:title,checkedobj:checkedobj}
    this.rs.uncheck(checkedbox).subscribe(res=>{
      this.reminderData=res["message"]
    },err=>{})

    this.fs.uncheck(checkedbox).subscribe(res=>{})
    this.ns.uncheck(checkedbox).subscribe(res=>{})
  
  }
}
