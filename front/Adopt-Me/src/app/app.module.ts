import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {PetsComponent} from "./pets/pets.component";
import { SheltersComponent } from './shelters/shelters.component';
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {HeaderComponent} from "./header/header.component";

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
