import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {User} from "../models/user";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    authenticated: boolean;
    user: User;
    constructor(private authService: AuthService) {
        this.authenticated = false;
        this.user = {} as User;
    }

    ngOnInit(): void {
        setInterval(() => {
            if(localStorage.getItem('token')){
                this.authenticated = true;

                this.authService.user().subscribe((u) => {
                    this.user = u;
                });
            }else{
                this.authenticated = false;
            }
        }, 1000);

    }


    logout() {
        this.authService.logout().subscribe(_=>{
            this.authenticated = false;
            this.user = {} as User;
        });
    }
}