import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IDadataRequest } from '../interfaces/dadata-request.interface';
import { IWeatherOfCity } from '../interfaces/weather-response.interface';
import { CurrentWeatherViewModel } from '../models/current-weather.view-model';
import { DadataViewModel } from '../models/dadata.view-model';

const API_KEY: string = encodeURIComponent('c3bd662b29ae337317d3b9882d6cede6');

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    private static urlCitySearch = 'https://api.openweathermap.org/data/2.5/weather';
    private static urlDadata: string = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
    private static dadataToken: string = 'd99cd4b54e5506d61387ab5622c9941d83583a83';

    constructor(private http: HttpClient) {
    }
    /** Получаем данные для поисковой строки  */

    public getCurrentWeatherInfo(city: string): Observable<CurrentWeatherViewModel> {
        return this.http.get(
            RequestService.urlCitySearch, { params: { q: city, lang: 'ru', appid: API_KEY, units: 'metric' } }
        ).pipe(
            switchMap((data: IWeatherOfCity) => {
                return of(new CurrentWeatherViewModel(data));
            })
        );
    }

    public getPromptFromDadata(query: string): Observable<DadataViewModel> {
        const body = JSON.stringify({ query: query })
        const options = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + RequestService.dadataToken
        }

        return this.http.post(RequestService.urlDadata, body, { headers: options }).pipe(
            switchMap((res: IDadataRequest) => {
                return of(new DadataViewModel(res))
            })
        )
    }


    // рест на почасовой прогноз https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
}
