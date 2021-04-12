import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private hc:HttpClient) { }
   
 note:any;
  createnotes(notesobj):Observable<any>{
    return this.hc.post("/notes/createnotes",notesobj)
   }

   getnotes():Observable<any>{
    return this.hc.get("/notes/getnotes")
   }

   createDeleteNotes(delobj):Observable<any>{
    return this.hc.post("/notes/deletenote",delobj)
   }
   getDeletedNotes():Observable<any>{
    return this.hc.get("/notes/getdeletednotes")
   }

   restoreNotes(restoreObj):Observable<any>{
     return this.hc.post("/notes/restorenote",restoreObj)
   }

   createArchiveNotes(archObj):Observable<any>{
    return this.hc.post("/notes/archivenote",archObj)
  }
  getArchiveNotes():Observable<any>{
    return this.hc.get("/notes/getarchivednotes")
  }
  undoArchivedNotes(undoObj):Observable<any>{
    return this.hc.post("/notes/undo",undoObj)
  }
  permanentDelete(delObj):Observable<any>{
    console.log("in service",delObj)
    return this.hc.delete(`/notes/permanentdelete/${delObj.title}`)
  }
  
  editNotesObj(notesdata){
    console.log(this.note)
    return this.note=notesdata;
  }
  sendNote(){
    console.log(this.note)
    return this.note;
  }

  UpdateNote(note:any):Observable<any>{
    console.log("Updated notes in service",note)
    return this.hc.put("/notes/updatednote",note)
  }
}

