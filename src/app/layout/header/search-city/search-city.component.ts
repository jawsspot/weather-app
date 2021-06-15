import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CurrentWeatherViewModel } from 'src/app/models/current-weather.view-model';
import { SavedCityViewModel } from 'src/app/models/saved-citiy.view-model';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
import { RequestService } from 'src/app/services/request-service.service';

@Component({
    selector: 'app-search-city',
    templateUrl: './search-city.component.html',
    styleUrls: ['./search-city.component.scss']
})
export class SearchCityComponent implements OnInit {
    @Input()
    public searchEnabled: boolean;
    public searchString: FormControl;
    public searchResults: CurrentWeatherViewModel;
    public empty: string;

    constructor(private requestService: RequestService, private localStorageManagerService: LocalStorageManagerService) {
        this.searchString = new FormControl('');
    }

    public ngOnInit(): void {
    }

    public search(): void {
        this.requestService.getCurrentWeatherInfo(this.searchString.value)
            .subscribe((data: CurrentWeatherViewModel) => {
                this.searchResults = data;
                this.empty = null;
            }, (err) => {
                this.empty = 'город не найден';
            });
    }

    public addToCityList(): void {
        const city = new SavedCityViewModel(this.searchResults);
        this.localStorageManagerService.setToLocalStorage(city);
        this.searchResults = null;
    }

}
