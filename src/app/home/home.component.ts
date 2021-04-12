import { Component, OnInit } from '@angular/core';
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

  visible = false;
  show=false;
  created=false;
 email;
  ngOnInit(): void {
    this.email=localStorage.getItem("email")
  }


  createNote() {
    //to display note creating area
    this.visible = true;
  }
 
  //method to save note
  saveNote(noteObj) {
   
    //subscribing
    this.ns.createnotes(noteObj.value).subscribe(res => {
     if(res["message"]=="failed"){
       alert(res["reason"])
     }
     else{
        //if note crreated
      if (res["message"] == "notes created") {
        this.TS.info('Notes added successfully')
        this.visible = false;
      }
      else if(res["message"]=="title already exists")
      {
        alert("title already  exists create unique title")
        this.visible=true;
      }
      //if note not created
      else {
        this.visible = true;
        alert(res["message"])
       
      }
     }
    }, err => {
      console.log(err)
    })
  }
   
  //method to remind not
  remindNote(remObj) {
    //subscribing
   this.rs.createReminder(remObj.value).subscribe(res => {
    //added to favourites
   
    if (res["message"] == "added to reminders") {
      this.TS.info('Added to reminder')
      this.visible = false;
    }
    //if note not added to favourites
    else {
      alert(res["message"])
    }
   
  }, err => {
    console.log(err)
  })

  //adding samenote in notes
  this.ns.createnotes(remObj.value).subscribe(res => {
  }, err => {
    console.log(err)
  })
  }

  //method to add notes to favourites
  favouriteNote(favObj) {
    //subscribing
    this.fs.createfavourite(favObj.value).subscribe(res => {
      //added to favourites
      if (res["message"] == "added to favourites") {
        alert("added to favourites")
        this.visible = false;
      }
      //if note not added to favourites
      else {
        alert(res["message"])
      }
    }, err => {
      console.log(err)
    })

    //adding samenote in notes
    this.ns.createnotes(favObj.value).subscribe(res => {
    }, err => {
      console.log(err)
    })
  }

  //archive notes
  archiveNote(ref) {
    console.log(ref.value)
  }

  //method to cancel note
  cancelNote() {
    this.visible = false;
  }

}