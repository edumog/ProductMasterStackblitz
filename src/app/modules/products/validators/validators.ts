import { Injectable, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { promise } from 'protractor';

@Injectable({
    providedIn: 'root'
  })
export class AuthenticationValidators implements OnInit {
    private url: string;

    constructor() {
    }

    ngOnInit() {
    }

}