import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private hc:HttpClient) { }

  createnotes(notesobj):Observable<any>{
    return this.hc.post("/notes/createnotes",notesobj)
   }

   getnotes(email):Observable<any>{
    return this.hc.get(`/notes/getnotes/${email}`)
   }

   createTrashNotes(delobj):Observable<any>{
    return this.hc.post("/notes/movetotrash",delobj)
   }

   getTrashNotes(email):Observable<any>{
    return this.hc.get(`/notes/gettrashnotes/${email}`)
   }

   restoreNotes(restoreObj):Observable<any>{
     return this.hc.post("/notes/restorenote",restoreObj)
   }

   createArchiveNotes(archObj):Observable<any>{
    return this.hc.post("/notes/archivenote",archObj)
  }
  getArchiveNotes(email):Observable<any>{
    return this.hc.get(`/notes/getarchivednotes/${email}`)
  }
  undoArchivedNotes(undoObj):Observable<any>{
    return this.hc.post("/notes/unarchive",undoObj)
  }

  permanentDelete(delObj):Observable<any>{
    return this.hc.delete(`/notes/permanentdelete/${delObj.email}/${delObj.title}`)
  }

  removecheck(checobj):Observable<any>{
    return this.hc.put(`/notes/removecheck/${localStorage.getItem("email")}`,checobj)
  }

  uncheck(checobj):Observable<any>{
    console.log("in service",checobj)
    return this.hc.put(`/notes/removechecked/${localStorage.getItem("email")}`,checobj)
  }
}
