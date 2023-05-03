import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    authenticated: boolean;
    constructor(private authService: AuthService) {
        this.authenticated = false;
    }

    ngOnInit(): void {
        setInterval(() => {
            if(localStorage.getItem('token'))
                this.authenticated = true;
            else
                this.authenticated = false;
        }, 10000);
    }


    logout() {
        this.authService.logout().subscribe(_=>{
            this.authenticated = false;
        });
    }
}