import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit {

  constructor(private ns:NotesService,private TS:ToastrService) { }
archivedata=[]
  ngOnInit(): void {
    this.ns. getArchiveNotes().subscribe(res=>{
      this.archivedata=res["message"]
      //if token not exists or session expired
      if(res["message"]=="failed")
      {
        alert(res["reason"])
      }
      //if token exists
      else{
        if(this.archivedata.length==0){
          this.TS.info("Empty archive")
         }
      }
   },err=>{console.log(err)})
  }

  undo(restoreObj,ind){
    this.ns.undoArchivedNotes(restoreObj).subscribe(res=>{
     if(res["message"]=="failed"){
       alert(res["reason"])
     }
     else{
      if(res["message"]=="undo"){
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