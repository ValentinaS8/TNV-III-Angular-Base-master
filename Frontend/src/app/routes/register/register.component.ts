import { User } from '../../models/user.model';
import { Component, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  userName: string;
  pwd: string;
  currentUser: User;
  myimage: string = "/assets/2.jpg"


  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  addUsers() {
    //this.currentuser.userName = this.userName;
    //this.currentuser.pwd = this.pwd
    this.currentUser = { userName: this.userName, pwd: this.pwd }
    this.loginService.addUser(this.currentUser);
    console.log(this.currentUser,this.loginService.users);
    this.router.navigate(['/login']);
  }
}

