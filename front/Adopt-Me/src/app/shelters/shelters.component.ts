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
  show_shelter_form: boolean;
  shelter: Shelter;
  selected_id: number;

  constructor(private sheltersService: SheltersService) {
    this.shelters = [];
    this.shelters_not_found = false;
    this.loaded = true;
    this.show_shelter_form = false;
    this.shelter = {} as Shelter;
    this.selected_id = -1;
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

  add_shelter(){
    this.sheltersService.addShelter(this.shelter).subscribe((s) => {
      this.shelters.push(s);
      this.show_shelter_form = false;
    }, err => {
      console.log('Shelter can not be added');
    });
  }

  edit_shelter(s: Shelter){
    this.show_shelter_form = true;
    this.selected_id = s.id;
    this.shelter = s;
  }

  update_shelter() {
    this.sheltersService.updateShelter(this.selected_id, this.shelter).subscribe((s) => {
      for(let i = 0; i < this.shelters.length; i++){
        if(this.shelters[i].id === s.id){
          this.shelters[i] = s;
          break;
        }
      }

      this.show_shelter_form = false;


      //or
      // this.sheltersService.getAllShelters().subscribe((shelters) => {
      //   this.shelters = shelters;
      // });
    }, err => {
      console.log('error updating shelter');
    });
  }

  delete_shelter(id: number) {
    this.sheltersService.deleteShelter(id).subscribe((success) => {
      console.log('Shelter has successfully been deleted!');

      for(let i = 0; i < this.shelters.length; i++){
        if(this.shelters[i].id === id){
          this.shelters.splice(i, 1);
          break;
        }
      }


      //or
      // this.sheltersService.getAllShelters().subscribe((shelters) => {
      //   this.shelters = shelters;
      // });
    }, err => {
      console.log('Error deleting shelter');
    });
  }
}
