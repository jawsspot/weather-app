import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
    private urlCitySearch: string;
    constructor(private requestService: RequestService) {
        this.searchString = new FormControl('');
    }

    public ngOnInit(): void {
    }

    public search(): void {
        this.requestService.searchCity(this.searchString.value)
            .subscribe((data) => console.log(data))
    }

}
