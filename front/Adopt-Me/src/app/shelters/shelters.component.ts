import {Component, OnInit} from '@angular/core';
import {Shelter} from "../models/shelters";
import {SheltersService} from "../services/shelters.service";

@Component({
    selector: 'app-shelters',
    templateUrl: './shelters.component.html',
    styleUrls: ['./shelters.component.css']
})
export class SheltersComponent implements OnInit{
  shelters: Shelter[];
  shelters_not_found: boolean;
  loaded: boolean;

  constructor(private sheltersService: SheltersService) {
    this.shelters = [];
    this.shelters_not_found = false;
    this.loaded = true;
  }

  ngOnInit(): void {
    this.loaded = false;

    this.sheltersService.getAllShelters().subscribe((shelters) => {
      this.shelters = shelters;
      this.loaded = true;
    }, error => {
      this.shelters_not_found = true;
      this.loaded = true;
    });
  }



}
