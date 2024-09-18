import {Component, OnInit} from '@angular/core';
import {CountriesService} from '../../services/countries.service';
import {Country} from '../../interfaces/country';
import {FormsModule} from '@angular/forms';
import {RandomCountriesWidget} from '../../interfaces/randomCountriesWidget';
import {Holiday} from "../../interfaces/holiday";
import {DatePipe, UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, DatePipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchText: string = '';
  listOfCountries: Country[] = [];
  filteredCountries: Country[] = [];
  widgets: RandomCountriesWidget[] = [];
  randomCountries: Country[] = [];

  constructor(private countriesService: CountriesService) {
  }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.countriesService
      .getAllAvailableCountries()
      .subscribe((listOfCountries: Country[]) => {
        this.listOfCountries = listOfCountries.sort((a, b) => a.name.localeCompare(b.name));
        this.filteredCountries = listOfCountries;

        this.showRandomCountriesHolidayWidget();
      });
  }

  filterByName(): void {
    this.filteredCountries = this.listOfCountries.filter((country) =>
      country.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  showRandomCountriesHolidayWidget(): void {
    const allCountries = [...this.listOfCountries]
    this.randomCountries = allCountries
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    this.randomCountries.forEach(country => {
      this.countriesService.getCountryHoliday(country.countryCode)
        .subscribe((holidays: Holiday[]) => {
          this.widgets.push({
            countryName: country.name,
            holidayName: holidays[0].name,
            holidayDate: holidays[0].date,
          })
        })
    })
  }
}
