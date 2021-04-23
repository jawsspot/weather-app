import { templateJitUrl } from '@angular/compiler';
import { IWeatherOfCity } from '../interfaces/weather-response.interface';

export class CurrentWeatherViewModel {
    public country: string;
    /** Ощущается как */
    public feelsLike: number;
    public temp: number;
    public tempMax: number;
    public tempMin: number;
    /** Влажность */
    public humidity: number;
    /** Восход */
    public sunrise: number;
    /** Закат */
    public sunset: number;
    /** Часовой пояс */
    public timezone: number;
    /** Видимость */
    public visibility: number;
    /** Скорость ветра */
    public windSpeed: number;
    constructor(data: IWeatherOfCity){
        this.country = data.sys.country;
        this.humidity = data.main.humidity;
        this.feelsLike = data.main.feels_like;
        this.temp = data.main.temp;
        this.tempMax = data.main.temp_max;
        this.tempMin = data.main.temp_min;
        this.sunrise = data.sys.sunrise;
        this.sunset = data.sys.sunset;
        this.timezone = data.timezone;
        this.windSpeed = data.wind.speed;
    }
}
