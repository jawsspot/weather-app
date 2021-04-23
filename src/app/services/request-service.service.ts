import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IWeatherOfCity } from '../interfaces/weather-response.interface';
import { CityWeatherViewModel } from '../models/city-weather.view-model';



const API_KEY: string = encodeURIComponent('c3bd662b29ae337317d3b9882d6cede6');

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    private urlCitySearch: string;

    constructor(private http: HttpClient) {
        this.urlCitySearch = 'https://api.openweathermap.org/data/2.5/weather';
    }



    public searchCity(city: string): Observable<CityWeatherViewModel |any> {
        return this.http.get(
            this.urlCitySearch, { params: { q: city, appid: API_KEY, units: 'metric' } }
        ).pipe(
            tap((data: IWeatherOfCity) => {
                return new CityWeatherViewModel(data);
            }),
            catchError((err: any): any => {
                return of('Город не найден');
            })
        );
    }
}

export interface ResponseModelCitySearch {
    query: string;

}
