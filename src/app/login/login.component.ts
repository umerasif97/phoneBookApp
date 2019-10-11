import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user = {email: "test@test.com", password: "test123"};
  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  login(){
    if(this.loginForm.value['email'] == this.user.email && this.loginForm.value['password'] == this.user.password){
      alert("Successfully login");
      this.router.navigate(['contactList']);
    }else {
      alert("email/password is incorrect");
    }
  }

}
