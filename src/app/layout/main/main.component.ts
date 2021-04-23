import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CurrentWeatherViewModel } from 'src/app/models/current-weather.view-model';
import { SavedCityViewModel } from 'src/app/models/saved-citiy.view-model';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
import { RequestService } from 'src/app/services/request-service.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    public currentCity: SavedCityViewModel;
    public dataWeather: CurrentWeatherViewModel;
    constructor(private localStorageManagerService: LocalStorageManagerService, private requestService: RequestService) { }

    public ngOnInit(): void {
        this.localStorageManagerService.refresh.subscribe(() => {
            this.getCurrentCity();
            this.getWeather();
        });

        this.getCurrentCity();
        this.getWeather();
    }

    /** Получаем текучищий город */
    private getCurrentCity(): void {
        const list = this.localStorageManagerService.getCitiesFromLocalStorage();
        this.currentCity = list.filter((v) => v.current === true)[0];
        if (!this.currentCity) {
            this.currentCity = list[0];
        }
    }

    private getWeather(): void {
        this.requestService.getDataCityForMain(this.currentCity.name)
            .pipe(
                tap((data: CurrentWeatherViewModel): void => {
                    this.dataWeather = data;
                })
            )
            .subscribe()
    }
}
