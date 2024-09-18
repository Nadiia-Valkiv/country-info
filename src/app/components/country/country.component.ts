import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CountriesService} from "../../services/countries.service";
import {Holiday} from "../../interfaces/holiday";
import {DatePipe, UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [
    DatePipe,
    UpperCasePipe
  ],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent implements OnInit {
  countryCode!: string;
  countryName!: string;
  listOfHolidays!: Holiday[];


  constructor(private route:ActivatedRoute, private router:Router, private countriesService: CountriesService) {
  }

  ngOnInit() {this.route.params.subscribe(params => {
    this.countryCode= params['code'];
    this.countryName= params['name'];
    this.getHolidays()
  })
  }

  getHolidays(){
    this.countriesService
      .getCountryHoliday(this.countryCode)
      .subscribe((listOfHoliday: Holiday[]) => {
        this.listOfHolidays = listOfHoliday;
      });
  }

  backToHomePage() {
    this.router.navigate(['']);
  }

}
