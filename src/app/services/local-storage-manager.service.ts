import { templateJitUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ISavedCity } from '../interfaces/saved-city.interface';
import { SavedCityViewModel } from '../models/saved-citiy.view-model';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageManagerService {
    public refresh: Subject<any> = new Subject();
    constructor() { }

    public setToLocalStorage(item: SavedCityViewModel): void {
        item.current = true;
        let cityList: SavedCityViewModel[] = [];
        const listInLocalStorage: SavedCityViewModel[] = JSON.parse(localStorage.getItem('cityList'));

        /** Проверяем есть ли город в ls */
        if (listInLocalStorage && listInLocalStorage.some(i => i.name === item.name)) {
            return;
        }

        if (listInLocalStorage) {
            /** убираем флаг текущего города */
            listInLocalStorage.forEach((v: SavedCityViewModel): void => { v.current = false; });

            listInLocalStorage.push(item);
            cityList = cityList.concat(listInLocalStorage);
        } else {
            cityList.push(item);
        }

        const toLocalStorage = JSON.stringify(cityList);
        localStorage.setItem('cityList', toLocalStorage);

        this.refresh.next();
    }



    /** Получаем список сохранённых городов */
    public getCitiesFromLocalStorage(): SavedCityViewModel[] {
        return JSON.parse(localStorage.getItem('cityList'))
            .map((item): ISavedCity => {

                return new SavedCityViewModel(item);
            });

    }

    public toggleCurrentCity(item: SavedCityViewModel): void {
        item.current = true;
        let cityList: SavedCityViewModel[] = [];
        const listInLocalStorage: SavedCityViewModel[] = JSON.parse(localStorage.getItem('cityList'));

        if (listInLocalStorage) {
            listInLocalStorage.forEach((v: SavedCityViewModel): void => {
                if (v.name === item.name) {
                    v.current = true;
                } else {
                    v.current = false;
                }
            });
            cityList = cityList.concat(listInLocalStorage);
            const toLocalStorage = JSON.stringify(cityList);
            localStorage.setItem('cityList', toLocalStorage);
        }
        this.refresh.next();
    }

    public removeCity(item: SavedCityViewModel): void {
        let cityList: SavedCityViewModel[] = [];
        let listInLocalStorage: SavedCityViewModel[] = JSON.parse(localStorage.getItem('cityList'));
        listInLocalStorage = listInLocalStorage.filter(value => value.name !== item.name);
        cityList = cityList.concat(listInLocalStorage);
        const toLocalStorage = JSON.stringify(cityList);
        localStorage.clear();
        localStorage.setItem('cityList', toLocalStorage);
        
        this.refresh.next();
    }
}
