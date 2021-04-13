import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FavouriteService } from '../favourite.service';
import { NotesService } from '../notes.service';
import { ReminderService } from '../reminder.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private ns: NotesService, private fs: FavouriteService,private rs:ReminderService, private TS: ToastrService) { }

  visibleNote = false;
  visibleCheck=false;
  visibleList=false;
 email;
 values=[];
 checkedList=[]
 


  ngOnInit(): void {
    this.email=localStorage.getItem("email")
  }


  createNote() {
    //to display note creating area
    this.visibleNote = true;
    this.visibleCheck=false;
  }

  createCheck() {
    //to display note creating area
    this.visibleCheck = true;
    this.visibleNote=false;
  }
  
  //method to save note 
  saveNote(noteObj) {
    let note=noteObj.value
    console.log(noteObj)
    note={email:this.email,title:note.title,description:note.description}

    console.log(note)
    //subscribing
    this.ns.createnotes(note).subscribe(res => {
     if(res["message"]=="failed"){
       alert(res["reason"])
       this.router.navigateByUrl("/signin")
     }
     else{
        //if note crreated
      if (res["message"] == "notes created") {
        this.TS.info('Notes added successfully')
        this.visibleNote = false;
      }
      else if(res["message"]=="title already exists")
      {
        alert("title already  exists create unique title")
        this.visibleNote=true;
      }
      //if note not created
      else {
        this.visibleNote = true;
        alert(res["message"])
       
      }
     }
    }, err => {
      console.log(err)
    })
  }
   
  //method to remind not
  remindNote(remObj) {

    let rem=remObj.value

    rem={email:this.email,title:rem.title,description:rem.description}
    //subscribing
   this.rs.createReminder(rem).subscribe(res => {
    //added to favourites
  if(res["message"]=="failed") {
    alert(res["reason"])
    this.router.navigateByUrl("/signin")
  }
  else{
    if (res["message"] == "added to reminders") {
      this.TS.info('Added to reminder')
      this.visibleNote = false;
    }
    //if note not added to favourites
    else {
      alert(res["message"])
    }
  
  }
   
  }, err => {
    console.log(err)
  })

  //adding samenote in notes
  this.ns.createnotes(rem).subscribe(res => {
  }, err => {
    console.log(err)
  })
  }

  //method to add notes to favourites
  favouriteNote(favObj) {

    let fav=favObj.value

    fav={email:this.email,title:fav.title,description:fav.description}
    //subscribing
    this.fs.createfavourite(fav).subscribe(res => {
     if(res["message"]=="failed"){
       alert(res["message"])
       this.router.navigateByUrl("/signin")
     }
     else{
        //added to favourites
      if (res["message"] == "added to favourites") {
        this.TS.info("added to favourites")
        this.visibleNote = false;
      }
      //if note not added to favourites
      else {
        alert(res["message"])
      }
     }
    }, err => {
      console.log(err)
    })

    //adding samenote in notes
    this.ns.createnotes(fav).subscribe(res => {
    }, err => {
      console.log(err)
    })
  }

  
  //method to cancel note or checklist
  cancelNote() {
    this.visibleNote = false;
    this.visibleCheck=false;
    this.values=[]
  }

//-----------------------------checkList methods-----------------------------------------------------------------

   //method to save list
   saveList(noteObj) {
    let note=noteObj.value
    console.log(noteObj)
    note={email:this.email,title:note.title,description:"",checkList:this.values,checkedList:this.checkedList}

    console.log(note)
    //subscribing
    this.ns.createnotes(note).subscribe(res => {
     if(res["message"]=="failed"){
       alert(res["reason"])
       this.router.navigateByUrl("/signin")
     }
     else{
        //if note crreated
      if (res["message"] == "notes created") {
        this.TS.info('CheckList added successfully')
        this.visibleCheck = false;
        this.values=[]
      }
      else if(res["message"]=="title already exists")
      {
        alert("title already  exists create unique title")
        this.visibleCheck=true;
      }
      //if note not created
      else {
        this.visibleCheck = true;
        alert(res["message"])
       
      }
     }
    }, err => {
      console.log(err)
    })
  }
   
  //method to remind not
  remindList(remObj) {

    let rem=remObj.value

    rem={email:this.email,title:rem.title,checkList:this.values,checkedList:this.checkedList}
    //subscribing
   this.rs.createReminder(rem).subscribe(res => {
    //added to favourites
  if(res["message"]=="failed") {
    alert(res["reason"])
    this.router.navigateByUrl("/signin")
  }
  else{
    if (res["message"] == "added to reminders") {
      this.TS.info('Added to reminder')
      this.visibleCheck = false;
      this.values=[]
    }
    //if note not added to reminders
    else {
      alert(res["message"])
    }
  
  }
   
  }, err => {
    console.log(err)
  })

  //adding samenote in notes
  this.ns.createnotes(rem).subscribe(res => {
  }, err => {
    console.log(err)
  })
  }

  //method to add notes to favourites
  favouriteList(favObj) {

    let fav=favObj.value

    fav={email:this.email,title:fav.title,checkList:this.values,checkedList:this.checkedList}
    //subscribing
    this.fs.createfavourite(fav).subscribe(res => {
     if(res["message"]=="failed"){
       alert(res["message"])
       this.router.navigateByUrl("/signin")
     }
     else{
        //added to favourites
      if (res["message"] == "added to favourites") {
        this.TS.info("added to favourites")
        this.visibleCheck = false;
        this.values=[]
      }
      //if note not added to favourites
      else {
        alert(res["message"])
      }
     }
    }, err => {
      console.log(err)
    })

    //adding samenote in notes
    this.ns.createnotes(fav).subscribe(res => {
    }, err => {
      console.log(err)
    })
  }


 add(ch){
  this.values.push(ch.value)
 }
  

}
