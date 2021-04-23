import { Component, OnInit } from '@angular/core';
import { SavedCityViewModel } from 'src/app/models/saved-citiy.view-model';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    public currentCities: SavedCityViewModel;
    constructor(private localStorageManagerService: LocalStorageManagerService) { }

    public ngOnInit(): void {
        const list = this.localStorageManagerService
            .getCitiesFromLocalStorage();
        this.currentCities = list.filter((v) => v.current === true)[0];
    }

}
