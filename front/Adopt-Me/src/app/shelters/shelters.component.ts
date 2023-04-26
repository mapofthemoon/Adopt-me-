import { Component } from '@angular/core';
import {Shelter} from "../models/shelters";

@Component({
    selector: 'app-shelters',
    templateUrl: './shelters.component.html',
    styleUrls: ['./shelters.component.css']
})
export class SheltersComponent {
  shelters: Shelter

}
