import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
trashData=[];
trashHeading=false;
emptyTrash=false;
email
  constructor(private ns:NotesService,private TS:ToastrService,private router:Router) { }

  ngOnInit(): void {
     this.email=localStorage.getItem("email")
    this.ns.getTrashNotes(this.email).subscribe(res=>{
      this.trashData=res["message"]
       //if token not exists or session expired
       if(res["message"]=="failed")
       {
         alert(res["reason"])
         this.router.navigateByUrl("/signin")
       }
       //if token exists
       else{
         if(this.trashData.length==0){
           this.emptyTrash=true;
          }
          else{
            this.trashHeading=true;
          }
       }
   },err=>{console.log(err)})
  }
  

  restoreNote(restoreObj,ind){
    this.ns.restoreNotes(restoreObj).subscribe(res=>{
     if(res["message"]=="failed"){
       alert(res["reason"])
       this.router.navigateByUrl("/signin")
     }
     else{
      if(res["message"]=="note restored"){
        this.trashData.splice(ind,1)
        this.TS.success("Restored")
      }
     }
    },err=>{
      alert("something wrong")
      console.log(err)
    })
  }

  permanentDelete(delObj,ind){
    console.log(delObj)
    this.ns.permanentDelete(delObj).subscribe(res=>{
     if(res["message"]=="failed"){
       alert(res["reason"])
       this.router.navigateByUrl("/signin")
     }
     else{
      if(res["message"]=="deleted permanetly"){
        this.trashData.splice(ind,1)
        this.TS.warning("Deleted permanently")
      }
     }
    },err=>{
      alert("something wrong")
      console.log(err)
    })
  }
}
