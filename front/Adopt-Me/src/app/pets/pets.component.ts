import {Component, OnInit} from '@angular/core';
import {PetsService} from "../services/pets.service";
import {Pet} from "../models/pets";
import {Type_of_animal} from "../models/Type_of_animal";
import {TypesOfAnimalService} from "../services/types-of-animal.service";
import {SheltersService} from "../services/shelters.service";
import {Shelter} from "../models/shelters";
@Component({
    selector: 'app-pets',
    templateUrl: './pets.component.html',
    styleUrls: ['./pets.component.css']
})

export class PetsComponent implements OnInit{

  pets: Pet[];
  loaded: boolean;
  pets_not_found: boolean;
  show_pets_form: boolean;
  pet: Pet;
  pet_id: number;
  shelters: Shelter[];
  type_of_animals: Type_of_animal[];

  constructor(
    private petsService: PetsService,
    private typeOfAnimalService: TypesOfAnimalService,
    private shelterService: SheltersService
  ) {
    this.pets = [];
    this.loaded = true;
    this.pets_not_found = false;
    this.show_pets_form = false;
    this.pet = {} as Pet;
    this.pet_id = -1;
    this.type_of_animals = [];
    this.shelters = [];
  }

  ngOnInit(): void {
    this.loaded = false;

    this.petsService.getAllPets().subscribe((pets) => {
      this.pets = pets;
      this.loaded = true;
    }, err => {
      this.pets_not_found = true;
      this.loaded = true;
    });

    this.typeOfAnimalService.getAllTypesOfAnimals().subscribe((types) => {
      this.type_of_animals = types;
    }, err => {
      console.log('Types of animals not found!');
    });

    this.shelterService.getAllShelters().subscribe((shelters) => {
      this.shelters = shelters;
    }, err => {
      console.log('Shelters not found!');
    });
  }


  show_pet_volunteer_form() {
    this.show_pets_form = true;
    this.pet = {} as Pet;
    this.pet_id = -1;
  }

  add_pet() {
    this.petsService.addPet(this.pet).subscribe((p) => {
      //temp comment
      // this.pets.push(p);
      this.show_pets_form = false;
    }, err => {
      console.log('Can not add pet!');
    });
  }

  edit_shelter(p: Pet) {
    this.show_pets_form = true;
    this.pet = p;
    this.pet_id = p.id;
  }

  delete_volunteer(id: number) {
    this.petsService.deletePet(id).subscribe(status => {
      for(let i = 0; this.pets.length; i++){
        if(this.pets[i].id == id){
          this.pets.splice(i, 1);
          break;
        }
      }
    }, err => {
      console.log('Error deleting pet!');
    });
  }

  update_pet() {
    this.petsService.updatePet(this.pet_id, this.pet).subscribe((p) => {
      for(let i = 0; this.pets.length; i++){
        if(this.pets[i].id == p.id){
          this.pets[i] = p;
          break;
        }
      }

      this.show_pets_form = false;
    }, err => {
      console.log('Can not update pet');
    });
  }
}
