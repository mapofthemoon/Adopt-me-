import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { PetsComponent } from './pets/pets.component';
import { SheltersComponent } from './shelters/shelters.component';

const routes: Routes = [
    { path : 'home',component:WelcomePageComponent},
    { path : 'pets', component: PetsComponent},
    { path : 'shelters', component: SheltersComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
