import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './layout/header/header.component';
import { AppLayoutComponent } from './layout/app-layout.component';
import { MainComponent } from './layout/main/main.component';
import { SearchCityComponent } from './layout/header/search-city/search-city.component';
import { CityListComponent } from './layout/header/city-list/city-list.component';
import { LocalStorageManagerService } from './services/local-storage-manager.service';
import { RequestService } from './services/request-service.service';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AppLayoutComponent,
        MainComponent,
        SearchCityComponent,
        CityListComponent

    ],
    imports: [
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        LocalStorageManagerService,
        RequestService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }