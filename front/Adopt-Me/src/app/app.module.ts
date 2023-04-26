import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {PetsComponent} from "./pets/pets.component";
import { SheltersComponent } from './shelters/shelters.component';

@NgModule({
  declarations: [
    AppComponent,
    PetsComponent,
    SheltersComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
