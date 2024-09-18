import {Injectable} from '@angular/core';
import {Country} from '../interfaces/country';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Holiday} from "../interfaces/holiday";

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private readonly url: string =
    'https://date.nager.at/api/v3';

  constructor(private http: HttpClient) {}

  getAllAvailableCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.url + '/AvailableCountries');
  }

  getCountryHoliday(countryCode: string): Observable<Holiday[]> {
    return this.http.get<any>(
      this.url + `/NextPublicHolidays/${countryCode}`
    );
  }

  getCountryHolidayByYear(countryCode: string, year: string): Observable<Country> {
    return this.http.get<any>(
      this.url + `/PublicHolidays/${year}/${countryCode}`
    );
  }
}
