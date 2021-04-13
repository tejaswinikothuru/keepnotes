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
  email;

  ngOnInit(): void {
this.email=localStorage.getItem("email")

    //subscribing
    this.fs.getfavourites(this.email).subscribe(res => {
      this.favouritesData = res["message"]
      //if token not exists or session expired
     if(res["message"]=="failed"){
       alert(res["reason"])
       this.router.navigateByUrl("/signin")
      }
      //if token exists
     else{
       
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

  checked(checkobj,title){
    console.log(checkobj,title)
    let checkbox={title:title,checkobj:checkobj}
    this.fs.removecheck(checkbox).subscribe(res=>{
      this.favouritesData=res["message"]
      console.log(this.favouritesData)
    },err=>{})
    
    this.ns.removecheck(checkbox).subscribe(res=>{})
    this.rs.removecheck(checkbox).subscribe(res=>{})
  }
  uncheck(checkedobj,title){
    console.log(checkedobj,title)
    let checkedbox={title:title,checkedobj:checkedobj}
    this.fs.uncheck(checkedbox).subscribe(res=>{
      this.favouritesData=res["message"]
      console.log(this.favouritesData)
    },err=>{})

    this.ns.uncheck(checkedbox).subscribe(res=>{})
    this.rs.uncheck(checkedbox).subscribe(res=>{})
  
  }

}
