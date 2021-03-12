import { User } from '../models/user.model';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  admin:User={userName:"admin",pwd:"admin"};
  isAuthenticate = false;
  isLogged=false;
  users:User[] =[this.admin];
  
  constructor( ) { }
  
  addUser(user: User){
    this.users.push(user);
  }

  checkIsLogged(){
    return this.isLogged;
  }

  checkUser( userName:string, pwd:string ){
    for(let i=0;i<this.users.length;i++){
      if(userName === this.users[i].userName && pwd === this.users[i].pwd){
        this.isLogged=true;
        return true;
      }}

       
    return false;
  }
}


