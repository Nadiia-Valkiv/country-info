import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {CountryComponent} from "./components/country/country.component";

export const routes: Routes = [{ path: '', component: HomeComponent },
  {path: 'country/:code/:name', component: CountryComponent}];
