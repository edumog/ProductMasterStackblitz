import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private router: Router, private accountService: AccountService) { 
    this.createLoginForm();
  }

  private createLoginForm() {
    this.loginForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  login() {
    if(this.loginForm.value.name === 'UsuarioPrueba' && this.loginForm.value.password === 'Password') {
      this.accountService.login('UsuarioPrueba');
      this.router.navigateByUrl('/home');
    }else {
      Swal.fire({
        title: 'Usuario o contraseña incorrectos',
        timer: 4000,
        timerProgressBar: true,
        onClose: () => {
          this.loginForm.reset();
        }
      });
    } 
  }

  logout() {
    this.accountService.logout();
  }

}
