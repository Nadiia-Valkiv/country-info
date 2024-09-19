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
  years: number[] = [];
  selectedYear!: number;


  constructor(private route:ActivatedRoute, private router:Router, private countriesService: CountriesService) {
  }

  ngOnInit() {this.route.params.subscribe(params => {
    this.countryCode= params['code'];
    this.countryName= params['name'];
    this.initializeYears();
    this.selectedYear = new Date().getFullYear();
    this.getHolidays(this.selectedYear)
  })
  }
  initializeYears() {
    const startYear = 2020;
    const endYear = 2030;
    for (let year = startYear; year <= endYear; year++) {
      this.years.push(year);
    }
  }

  getHolidays(year: number){
    this.countriesService
      .getCountryHolidayByYear(this.countryCode, year)
      .subscribe((listOfHoliday: Holiday[]) => {
        this.listOfHolidays = listOfHoliday;
      });
  }

  selectYear(year: number) {
    this.selectedYear = year;
    this.getHolidays(year);
  }

  backToHomePage() {
    this.router.navigate(['']);
  }
}
