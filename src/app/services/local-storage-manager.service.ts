import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageManagerService {

  constructor() { }

  public setToLoacalStorage(item: string): void {
    const cityList: string[] = [];
    const listInLocalStorage: string = JSON.parse(localStorage.getItem('cityList'));

    if (listInLocalStorage) {
      cityList.push(item.concat(listInLocalStorage));
    } else {
      cityList.push(item);
    }

    const toLocalStorage = JSON.stringify(cityList);

    localStorage.setItem('cityList', toLocalStorage);
    console.log(toLocalStorage);
  }
}
