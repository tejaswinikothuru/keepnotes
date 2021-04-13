import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserserviceService } from '../userservice.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router:Router, private us:UserserviceService,private TS:ToastrService) { }

  signup:FormGroup;
  submitted=false;

  ngOnInit(): void {
    this.signup=new FormGroup({
      firstName:new FormControl(null,[Validators.required,Validators.minLength(3)]),
      lastName:new FormControl(null,[Validators.required,Validators.minLength(3)]),
      gender:new FormControl(null,[Validators.required]),
      dob:new FormControl(null,[Validators.required]),
      email:new FormControl(null,[Validators.required,]),
      password:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.pattern("^(?=.[a-z])(?=.*[A-Z])(?=.*[0-9]).*$")]),
      cpassword:new FormControl(null,[Validators.required])
    })
  }

  getControls(){
    return this.signup.controls;
   }

  submit(){
    this.submitted=true;
   if(this.signup.valid){
    this.us.createuser(this.signup.value).subscribe(res=>{
      //if user registers  navigate to signin page
      if(res["message"]=="usercreated"){
        this.router.navigateByUrl("/signin")
        this.TS.success('Registration Sucessfull','Success')
      }
      else{
        alert("User already exists")
      }
    },err=>{
      alert("Registration unsuccessfull")
      console.log(err)
    })
   
  }
}
}
