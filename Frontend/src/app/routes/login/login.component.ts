import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  myimage: string = "/assets/3.jpg"
  userName: string;
  pwd: string;
  users: User[];
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    console.log(this.loginService.checkIsLogged());
    if (this.loginService.checkIsLogged()) {
      this.router.navigateByUrl('/graphics');
    }
  }

   login() {
    let checkLogin = this.loginService.checkUser(this.userName, this.pwd);
    if (checkLogin) {
      this.router.navigate(['/dashboard']);
    } else {
      alert("errore");
    }
  }
}
