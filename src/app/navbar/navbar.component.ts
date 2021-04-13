import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

 username;
 email;

  ngOnInit(): void {
    //get user first name from local storage
    this.username=localStorage.getItem("firstName")
    this.email=localStorage.getItem("email")
  }
  gotoHome(){
    this.router.navigateByUrl("/home")
  }

  note(){
    this.router.navigateByUrl("/notes")
  }

  reminder(){
    this.router.navigateByUrl("/reminder")
  }

  favourite(){
    this.router.navigateByUrl("/favourites")
  }

  archive(){
    this.router.navigateByUrl("/archive")
  }

  trash(){
    this.router.navigateByUrl("/trash")
  }

  signOut(){
   localStorage.clear();
    //navigate to signin
    this.router.navigateByUrl("/signin")
  
  }
  
}
