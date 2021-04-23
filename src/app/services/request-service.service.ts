import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ISavedCity } from '../interfaces/saved-city.interface';
import { IWeatherOfCity } from '../interfaces/weather-response.interface';
import { CityWeatherViewModel } from '../models/city-weather.view-model';
import { SavedCityViewModel } from '../models/saved-citiy.view-model';

const API_KEY: string = encodeURIComponent('c3bd662b29ae337317d3b9882d6cede6');

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    private urlCitySearch: string;

    constructor(private http: HttpClient) {
        this.urlCitySearch = 'https://api.openweathermap.org/data/2.5/weather';
    }

    public getDataCity(city: string): Observable<CityWeatherViewModel | any> {
        return this.http.get(
            this.urlCitySearch, { params: { q: city, appid: API_KEY, units: 'metric' } }
        ).pipe(
            switchMap((data: IWeatherOfCity) => {
                return of(new CityWeatherViewModel(data));
            })
        );
    }

    public searchCity(city: string): Observable<SavedCityViewModel | any> {
        return this.http.get(
            this.urlCitySearch, { params: { q: city, appid: API_KEY, units: 'metric' } }
        ).pipe(
            switchMap((data: ISavedCity) => {
                return of(new SavedCityViewModel(data));
            })
        );
    }
}

export interface ResponseModelCitySearch {
    query: string;

}
