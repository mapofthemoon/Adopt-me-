import {Component, OnInit} from '@angular/core';
import {volunteer} from "../models/volunteer";
import {VolunteersService} from "../services/volunteers.service";
import {Shelter} from "../models/shelters";
import {SheltersService} from "../services/shelters.service";

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.css']
})
export class VolunteersComponent implements OnInit{
  volunteers: volunteer[];
  loaded: boolean;
  volunteer_not_found: boolean;
  show_volunteer_form: boolean;
  volunteer_id: number;
  shelters: Shelter[];
  volunteer: volunteer;

  constructor(
    private volunteersService: VolunteersService,
    private sheltersService: SheltersService
  ) {
    this.volunteers = [];
    this.loaded = true;
    this.volunteer_not_found = false;
    this.show_volunteer_form = false;
    this.volunteer_id = -1;
    this.shelters = [];
    this.volunteer = {} as volunteer;
  }

  ngOnInit(): void {
    this.loaded = false;

    this.volunteersService.getAllVolunteers().subscribe((volunteers) => {
      this.volunteers = volunteers;
      this.loaded = true;
    }, err => {
      this.volunteer_not_found = true;
      this.loaded = true;
    });

    this.sheltersService.getAllShelters().subscribe((shelters) => {
      this.shelters = shelters;
    }, err => {
      console.log('shelters not founded');
    });
  }


  add_volunteer() {
    // console.log(this.volunteer);

    this.volunteersService.addVolunteer(this.volunteer).subscribe((v) => {
      //temp comment
      // this.volunteers.push(v);
      this.show_volunteer_form = false;
    }, err => {
      console.log('Volunteer can not be added');
    });
  }

  edit_volunteer(v: volunteer) {
    this.volunteer = v;
    this.volunteer_id = v.id;
    this.show_volunteer_form = true;
  }

  update_volunteer() {
    this.volunteersService.updateVolunteer(this.volunteer_id, this.volunteer).subscribe((v) => {
      for(let i = 0; i < this.volunteers.length; i++){
        if(this.volunteers[i].id == v.id){
          this.volunteers[i] = v;
          break;
        }
      }

      this.show_volunteer_form = false;
    }, err => {
      console.log('Error updating volunteer!');
    });
  }

  delete_volunteer(id: number) {
    this.volunteersService.deleteVolunteer(id).subscribe((status) => {
      for(let i = 0; i < this.volunteers.length; i++){
        if(this.volunteers[i].id == id){
          this.volunteers.splice(i, 1);
        }
      }
    }, err => {
      console.log('Error deleting volunteer!')
    });
  }

  show_add_volunteer_form(){
    this.show_volunteer_form = true;
    this.volunteer = {} as volunteer;
    this.volunteer_id = -1;
  }
}
