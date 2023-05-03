import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email: string;
  password: string;
  error: boolean;
  ngOnInit(): void {
  }
  constructor(private authService: AuthService, private router: Router) {
    this.email = ''
    this.password = ''
    this.error = false
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(_ => {
      this.router.navigate(['']);
    }, error => {
      this.error = true
      console.log(error)
    });
  }
}
