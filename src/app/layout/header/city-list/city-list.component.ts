import { Component, OnInit } from '@angular/core';
import { SavedCityViewModel } from 'src/app/models/saved-citiy.view-model';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';

@Component({
    selector: 'app-city-list',
    templateUrl: './city-list.component.html',
    styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {
    public listSavedCities: SavedCityViewModel[];

    constructor(private localStorageManagerService: LocalStorageManagerService) { }

    public ngOnInit(): void {
        this.localStorageManagerService.refresh.subscribe(() => {
            this.listSavedCities = this.localStorageManagerService.getCitiesFromLocalStorage();
        });

        this.listSavedCities = this.localStorageManagerService.getCitiesFromLocalStorage();
    }

    public selectCity(city: SavedCityViewModel): void {
        this.localStorageManagerService.toggleCurrentCity(city);
    }

    public removeCity(item: SavedCityViewModel): void {
        this.localStorageManagerService.removeCity(item);
    }

}
