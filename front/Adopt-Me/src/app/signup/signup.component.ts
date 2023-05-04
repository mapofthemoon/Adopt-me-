import {Component, OnInit} from '@angular/core';
import {User} from "../models/user";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  user: User;
  password1: string;

  constructor(private authService: AuthService, private router: Router) {
    this.user = {} as User;
    this.password1 = '';
  }

  ngOnInit(): void {
  }

  signup() {
    this.authService.signUp(this.user).subscribe(_ => {
      this.router.navigate(['login']);
    })
  }
}
