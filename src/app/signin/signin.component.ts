import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UserserviceService } from '../userservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private router: Router, private us: UserserviceService, private TS: ToastrService) { }

  signIn: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.signIn = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  getControls() {
    return this.signIn.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signIn.valid) {
      this.us.userLogincheck(this.signIn.value).subscribe(res => {
        if (res["message"] == "login success") {
          this.TS.success('Login Success')
          //save token in browser memory
          localStorage.setItem("token", res["token"])
          localStorage.setItem("firstName", res["firstName"])
          localStorage.setItem("email", res["email"])
          //navigate to home page
          this.router.navigateByUrl("/home")

        }
        else {
          alert(res["message"])
        }
      }, err => {
        alert("something wrong")
        console.log(err)
      })
    }
  }

  gotoSignUp() {
    this.router.navigateByUrl("/signup")

  }
}
