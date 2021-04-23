import { IWeatherOfCity } from '../interfaces/weather-response.interface';

export class CityWeatherViewModel {
    public name: string;
    public temp: number;
    public description: string;

    constructor(data: IWeatherOfCity) {
        this.name = data.name;
        this.temp = data.main.temp;
        this.description = data.weather[0].description;
    }
}
