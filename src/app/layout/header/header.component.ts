import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public hitList: string[];
    public searchEnabled: boolean;
    constructor() {

    }

    public ngOnInit(): void {
    }

    public toggleSearch(): void {
        this.searchEnabled = !this.searchEnabled;
    }
}
