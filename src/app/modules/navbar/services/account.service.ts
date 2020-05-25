import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public isAuthenticated: boolean;
  public userName: string;

  constructor() { 
    this.isAuthenticated = false;
    if(localStorage.getItem('userName') !== null) {
      this.isAuthenticated = true;
      this.userName = localStorage.getItem('userName');
    } 
  }
  
  login(userName: string) {
    localStorage.setItem('userName', userName);
    this.userName = userName;
    this.isAuthenticated = true;
  }

  logout(){
    localStorage.removeItem('userName');
    this.userName = null;
    this.isAuthenticated = false;
  }

}
