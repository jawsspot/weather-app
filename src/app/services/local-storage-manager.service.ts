import { templateJitUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ISavedCity } from '../interfaces/saved-city.interface';
import { SavedCityViewModel } from '../models/saved-citiy.view-model';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageManagerService {

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

            listInLocalStorage.forEach((v: SavedCityViewModel): void => { v.current = false; });
            listInLocalStorage.forEach((v: SavedCityViewModel): void => {
                if (v.name === item.name) {
                    v.current = true;
                }
            });

            cityList = cityList.concat(listInLocalStorage);
            const toLocalStorage = JSON.stringify(cityList);
            localStorage.setItem('cityList', toLocalStorage);
        }
    }
}
