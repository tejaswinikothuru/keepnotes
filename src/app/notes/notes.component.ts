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
notesheading=false;
emptynotes=false
notesdata=[];
checkArray=[]



  ngOnInit(): void {

    let email=localStorage.getItem("email")
    this.ns.getnotes(email).subscribe(res=>{
      
      //if token not exists or session expired
      if(res["message"]=="failed")
      {
        alert(res["reason"])
        this.router.navigateByUrl("/signin")
      }
      //if token exists
      else{
        this.notesdata=res["message"]
         console.log(this.notesdata)
        if(this.notesdata.length==0){
          this.emptynotes=true;
         }
         else{
           this.notesheading=true;
         
         }
         
      }
    },err=>{console.log(err)})
  }

 //method to add note to remainder
 remindNote(remObj){
  this.rs.createReminder(remObj).subscribe(res=>{
   if(res["message"]=="failed"){
     alert(res["reason"])
     this.router.navigateByUrl("/signin")
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
       this.router.navigateByUrl("/signin")
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
      this.router.navigateByUrl("/signin")
    }
    else{
      if(res["message"]=="Note Archived"){
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


//method to add note to trash
  trashNote(trashObj,ind){
    this.ns.createTrashNotes(trashObj).subscribe(res=>{
      if(res["message"]=="failed"){
        alert(res["reason"])
        this.router.navigateByUrl("/signin")
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
       this.router.navigateByUrl("/signin")
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
       this.router.navigateByUrl("/signin")
     }
     else{
      if(res["message"]=="removed from favourites"){
        
      }
     }
    },err=>{
      console.log(err)
    })
  }
  
  checked(checkobj,title){
    
    let checkbox={title:title,checkobj:checkobj}
    this.ns.removecheck(checkbox).subscribe(res=>{
       this.notesdata=res["message"]
    },err=>{})

    this.fs.removecheck(checkbox).subscribe(res=>{})
    this.rs.removecheck(checkbox).subscribe(res=>{})
  
  }

  uncheck(checkedobj,title){
    console.log(checkedobj,title)
    let checkedbox={title:title,checkedobj:checkedobj}
    this.ns.uncheck(checkedbox).subscribe(res=>{
      this.notesdata=res["message"]
    },err=>{})

    this.fs.uncheck(checkedbox).subscribe(res=>{})
    this.rs.uncheck(checkedbox).subscribe(res=>{})
  
  }
  
 
}
