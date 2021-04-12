import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FavouriteService } from '../favourite.service';
import { NotesService } from '../notes.service';
import { ReminderService } from '../reminder.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(private ns:NotesService,private fs:FavouriteService,private rs:ReminderService,private router:Router,private Ts:ToastrService) { }

notesdata=[];


  ngOnInit(): void {
    this.ns.getnotes().subscribe(res=>{
       this.notesdata=res["message"]
      //if token not exists or session expired
      if(res["message"]=="failed")
      {
        alert(res["reason"])
      }
      //if token exists
      else{
        if(this.notesdata.length==0){
          this.Ts.info("Your notes are empty")
         }
      }
    },err=>{console.log(err)})
  }

 //method to add note to remainder
 remindNote(favObj){
  this.rs.createReminder(favObj).subscribe(res=>{
   if(res["message"]=="failed"){
     alert(res["reason"])
   }
   else{
    if(res["message"]=="added to reminders"){
      this.Ts.info("Added to reminders")
    }
    else{
      alert(res["message"])
    }
   }
  },err=>{
    console.log(err)
  })
 
}

//method to add note to favourites
  favouriteNote(favObj){
    this.fs.createfavourite(favObj).subscribe(res=>{
     if(res["message"]=="failed"){
       alert(res["reason"])
     }
     else{
      if(res["message"]=="added to favourites"){
        this.Ts.info("Added to Favourites")
      }
      else{
        alert(res["message"])
      }
     }
    },err=>{
      console.log(err)
    })
   
  }

  archiveNote(arcObj,ind){
    this.ns.createArchiveNotes(arcObj).subscribe(res=>{
    if(res["message"]=="failed"){
      alert(res["reason"])
    }
    else{
      if(res["message"]=="Archived notes"){
        this.notesdata.splice(ind,1)
        this.Ts.info("Note is archived")
      }else {
        alert(res["message"])
      }
    }
    },err=>{
      console.log(err)
    })
  }
/*edit(editObj)
{
  this.note=editObj;
  this.ns.editNotesObj(this.note);
  this.router.navigateByUrl("/editnote");
  console.log(this.note)
}*/
//method to add note to trash
  trashNote(trashObj,ind){
    this.ns.createDeleteNotes(trashObj).subscribe(res=>{
      if(res["message"]=="failed"){
        alert(res["reason"])
      }
      else{
        if(res["message"]=="soft deleted"){
          this.notesdata.splice(ind,1)
            this.Ts.warning("Moved to trash")
        }
      }
    },err=>{console.log(err)})

    this.fs.deleteFavourite(trashObj).subscribe(res=>{
     if(res["message"]=="failed"){
       alert(res["reason"])
     }
     else{
      if(res["message"]=="removed from favourites"){
       
      }
     }
    },err=>{
      console.log(err)
    })

    this.rs.deleteReminder(trashObj).subscribe(res=>{
     if(res["message"]=="failed"){
       alert(res["reason"])
     }
     else{
      if(res["message"]=="removed from favourites"){
       
      }
     }
    },err=>{
      console.log(err)
    })
  }
 

}