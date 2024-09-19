import { Injectable } from '@angular/core';
import { Country } from '../interfaces/country';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Holiday } from '../interfaces/holiday';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllAvailableCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.url}/AvailableCountries`);
  }

  getCountryHoliday(countryCode: string): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(
      `${this.url}/NextPublicHolidays/${countryCode}`,
    );
  }

  getCountryHolidayByYear(
    countryCode: string,
    year: number,
  ): Observable<Holiday[]> {
    const yearString = year.toString();
    return this.http.get<Holiday[]>(
      `${this.url}/PublicHolidays/${yearString}/${countryCode}`,
    );
  }
}
