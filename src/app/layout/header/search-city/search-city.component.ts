import { Component, Input, OnInit, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs/operators';
import { CurrentWeatherViewModel } from 'src/app/models/current-weather.view-model';
import { DadataViewModel } from 'src/app/models/dadata.view-model';
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
    public searchResults: CurrentWeatherViewModel;

    public empty: string;

    public searchStringControl: FormControl;


    public options: string[] = ['One', 'Two', 'Three'];

    constructor(private requestService: RequestService, private localStorageManagerService: LocalStorageManagerService) {
        this.searchStringControl = new FormControl('');
    }
    public ngOnInit(): void {
        this.initializeOptions();
    }

    public search(): void {
        this.requestService.getCurrentWeatherInfo(this.searchStringControl.value)
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

    private initializeOptions() {
        this.searchStringControl.valueChanges
            .pipe(
                filter(v => v),
                switchMap((value: string) => this.requestService.getPromptFromDadata(value))
            ).subscribe((v: DadataViewModel) => this.options = v.cityWithType)
    }

}
