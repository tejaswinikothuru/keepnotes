import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FavouriteService } from '../favourite.service';
import { NotesService } from '../notes.service';
import { ReminderService } from '../reminder.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  //inject services
  constructor(private fs: FavouriteService,private rs:ReminderService,private ns:NotesService, private Ts: ToastrService,private router:Router) { }

  favouritesData = [];
  favouriteHeading=false;
  emptyFavourites=false;
  username;
  email;

  ngOnInit(): void {
    this.username=localStorage.getItem("firstName")
this.email=localStorage.getItem("email")

    //subscribing
    this.fs.getfavourites(this.email).subscribe(res => {
     
      //if token not exists or session expired
     if(res["message"]=="failed"){
       alert(res["reason"])
       this.router.navigateByUrl("/signin")
      }
      //if token exists
     else{
      this.favouritesData = res["message"]
      if(this.favouritesData.length==0) {  
         this.emptyFavourites=true;
        }
        else{
          this.favouriteHeading=true;
        }
     }
    }, err => { console.log(err) })
  }


  //method to remove favourite notes 
  remFavNote(remFavObj, ind) {
    //subscribing
    this.fs.deleteFavourite(remFavObj).subscribe(res => {
       //if token not exists or session expired
     if(res["message"]=="failed"){
       alert(res["reason"])
       this.router.navigateByUrl("/signin")
     }
      //if token exists
     else{
      if (res["message"] == "removed from favourites") {
        this.favouritesData.splice(ind, 1)
        this.Ts.warning("Removed from favourites")
      }
     }
    }, err => { console.log(err) })
  }

  //method to remove checklist
  removeCheckList(checkobj,title){
    let checkbox={title:title,checkobj:checkobj}
    this.fs.removeCheckList(checkbox).subscribe(res=>{
      this.favouritesData=res["message"]
    },err=>{})
    
    this.ns.removeCheckList(checkbox).subscribe(res=>{})
    this.rs.removeCheckList(checkbox).subscribe(res=>{})
  }

  //method to remove checkedlist
  removeCheckedList(checkedobj,title){
    let checkedbox={title:title,checkedobj:checkedobj}
    this.fs.removeCheckedList(checkedbox).subscribe(res=>{
      this.favouritesData=res["message"]
    },err=>{})

    this.ns.removeCheckedList(checkedbox).subscribe(res=>{})
    this.rs.removeCheckedList(checkedbox).subscribe(res=>{})
  
  }

}
