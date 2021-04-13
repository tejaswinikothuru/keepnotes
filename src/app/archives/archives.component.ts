import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit {

  constructor(private ns:NotesService,private TS:ToastrService,private router:Router) { }
archivedata=[];
archiveHeading=false;
emptyArchives=false;
email
  ngOnInit(): void {
this.email=localStorage.getItem("email")

    this.ns. getArchiveNotes(this.email).subscribe(res=>{
      this.archivedata=res["message"]
      //if token not exists or session expired
      if(res["message"]=="failed")
      {
        alert(res["reason"])
        this.router.navigateByUrl("/signin")
      }
      //if token exists
      else{
        if(this.archivedata.length==0){
          this.emptyArchives=true;
         }
         else{
           this.archiveHeading=true;
         }
      }
   },err=>{console.log(err)})
  }

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
}
