import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FavouriteService } from '../favourite.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  //inject services
  constructor(private fs: FavouriteService, private Ts: ToastrService,private router:Router) { }

  favouritesData = [];

  ngOnInit(): void {
    //subscribing
    this.fs.getfavourites().subscribe(res => {
      this.favouritesData = res["message"]
      //if token not exists or session expired
     if(res["message"]=="failed"){
       alert(res["reason"])
       this.router.navigateByUrl("/signin")
      }
      //if token exists
     else{
       
      if(this.favouritesData.length==0)
      {   this.Ts.info("No favourites")}
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
}
