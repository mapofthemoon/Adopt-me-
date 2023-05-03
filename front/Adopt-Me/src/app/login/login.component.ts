import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  user: User;
  error: boolean;
  ngOnInit(): void {
  }
  constructor(private authService: AuthService, private router: Router) {
    this.user = {} as User;
    this.error = false
  }

  login() {
    this.authService.login(this.user).subscribe(_ => {
      this.router.navigate(['']);
    }, error => {
      this.error = true
      console.log(error)
    });
  }
}
