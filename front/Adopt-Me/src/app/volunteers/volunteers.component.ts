import {Component, OnInit} from '@angular/core';
import {volunteer} from "../models/volunteer";
import {VolunteersService} from "../services/volunteers.service";

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.css']
})
export class VolunteersComponent implements OnInit{
  volunteers: volunteer[];
  loaded: boolean;
  volunteer_not_found: boolean;

  constructor(private volunteersService: VolunteersService) {
    this.volunteers = [];
    this.loaded = true;
    this.volunteer_not_found = false;
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
  }



}
