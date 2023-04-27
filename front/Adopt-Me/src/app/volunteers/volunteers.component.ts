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



}
