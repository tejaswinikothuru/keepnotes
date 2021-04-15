import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FavouriteService } from '../favourite.service';
import { NotesService } from '../notes.service';
import { ReminderService } from '../reminder.service';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit {

  constructor(private ns:NotesService,private fs:FavouriteService,private rs:ReminderService,private TS:ToastrService,private router:Router) { }
archivedata=[];
archiveHeading=false;
emptyArchives=false;
username;
email
  ngOnInit(): void {
    this.username=localStorage.getItem("firstName")
this.email=localStorage.getItem("email")

    this.ns. getArchiveNotes(this.email).subscribe(res=>{
    
      //if token not exists or session expired
      if(res["message"]=="failed")
      {
        alert(res["reason"])
        this.router.navigateByUrl("/signin")
      }
      //if token exists
      else{
        this.archivedata=res["message"]
        if(this.archivedata.length==0){
          this.emptyArchives=true;
         }
         else{
           this.archiveHeading=true;
         }
      }
   },err=>{console.log(err)})
  }
//method to undo archive notes
  undo(restoreObj,ind){
    this.ns.undoArchivedNotes(restoreObj).subscribe(res=>{
     if(res["message"]=="failed"){
       alert(res["reason"])
       this.router.navigateByUrl("/signin")
     }
     else{
      if(res["message"]=="unarchived"){
        this.archivedata.splice(ind,1)
        this.TS.success("Removed from Archives")
      }
     }
    },err=>{
      alert("something wrong")
      console.log(err)
    })
  }

  //method to remove checklist
  removeCheckList(checkobj,title){
    let checkbox={title:title,checkobj:checkobj}
    this.ns.removecheckListinArchive(checkbox).subscribe(res=>{
       this.archivedata=res["message"]
    },err=>{})

    this.fs.removeCheckList(checkbox).subscribe(res=>{})
    this.rs.removeCheckList(checkbox).subscribe(res=>{})
  
  }

  //method to remove checkedlist
  removeCheckedList(checkedobj,title){
    let checkedbox={title:title,checkedobj:checkedobj}
    this.ns.removecheckedListinArchive(checkedbox).subscribe(res=>{
      this.archivedata=res["message"]
    },err=>{})

    this.fs.removeCheckedList(checkedbox).subscribe(res=>{})
    this.rs.removeCheckedList(checkedbox).subscribe(res=>{})
  
  }
  
}
