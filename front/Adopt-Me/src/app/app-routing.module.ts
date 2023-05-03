import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { PetsComponent } from './pets/pets.component';
import { SheltersComponent } from './shelters/shelters.component';
import {VolunteersComponent} from "./volunteers/volunteers.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
    { path : 'home',component:WelcomePageComponent},
    { path : 'pets', component: PetsComponent},
    { path : 'shelters', component: SheltersComponent},
    { path : 'volunteers', component: VolunteersComponent},
    { path : 'login', component: LoginComponent},
    { path : '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
