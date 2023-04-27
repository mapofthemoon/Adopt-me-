import {Component, OnInit} from '@angular/core';
import {PetsService} from "../services/pets.service";
import {Pet} from "../models/pets";
@Component({
    selector: 'app-pets',
    templateUrl: './pets.component.html',
    styleUrls: ['./pets.component.css']
})

export class PetsComponent implements OnInit{

  pets: Pet[];
  loaded: boolean;
  pets_not_found: boolean;

  constructor(private petsService: PetsService) {
    this.pets = [];
    this.loaded = true;
    this.pets_not_found = false;
  }

  ngOnInit(): void {
    this.loaded = false;

    this.petsService.getAllPets().subscribe((pets) => {
      this.pets = pets;
      this.loaded = true;
    }, err => {
      this.pets_not_found = true;
    });
  }


}
