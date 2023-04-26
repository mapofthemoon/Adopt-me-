import {Component, OnInit} from '@angular/core';
import {VolunteersService} from "../services/volunteers.service";
import {PetsService} from "../services/pets.service";
import {SheltersService} from "../services/shelters.service";

@Component({
    selector: 'app-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.css']
})

export class WelcomePageComponent implements OnInit{
  number_of_volunteers: number | string;
  number_of_pets: number | string;
  number_of_shelters: number | string;
  loading_error: boolean;

  constructor(
    private volunteersService: VolunteersService,
    private petsService: PetsService,
    private sheltersService: SheltersService
  ) {
    this.loading_error = false;
    this.number_of_pets = '?';
    this.number_of_volunteers = '?';
    this.number_of_shelters = '?';
  }
  ngOnInit(): void {
    this.petsService.getAllPets().subscribe((pets) => {
      this.number_of_pets = pets.length;
    }, err => {
      this.loading_error = true;
    });

    this.volunteersService.getAllVolunteers().subscribe((volunteers) => {
      this.number_of_volunteers = volunteers.length;
    }, err => {
      this.loading_error = true;
    });

    this.sheltersService.getAllShelters().subscribe((shelters) => {
      this.number_of_shelters = shelters.length;
    }, err =>{
      this.loading_error = true;
    });
  }

}
