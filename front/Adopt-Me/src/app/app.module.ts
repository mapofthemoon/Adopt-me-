import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {PetsComponent} from "./pets/pets.component";
import { SheltersComponent } from './shelters/shelters.component';
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {HeaderComponent} from "./header/header.component";
import {PetsService} from "./services/pets.service";
import {SheltersService} from "./services/shelters.service";
import {TypesOfAnimalService} from "./services/types-of-animal.service";
import {VolunteersService} from "./services/volunteers.service";

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    PetsComponent,
    HeaderComponent,
    SheltersComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    PetsService,
    SheltersService,
    TypesOfAnimalService,
    VolunteersService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
