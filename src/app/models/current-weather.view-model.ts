
import { ICoordinates, IWeatherOfCity } from '../interfaces/weather-response.interface';

export class CurrentWeatherViewModel {
    public name: string
    /**Атмосферное давление */
    public pressure: number;
    /**Время получения данных */
    public dt: number;
    /**Широта и долгота */
    public coordinates: ICoordinates;
    /**Статус запроса */
    public requestCod: number;
    /** облачность % */
    public clouds: number;
    /**Код страны */
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
    /**Айди погоды */
    public weatherId: number;
    /**Группа погодных параметров (Дождь, Снег, Экстрим и др.) */
    public weatherMain: string;
    /**Погодные условия в группе */
    public weatherDescription;
    /**Идентификатор значка погоды */
    public weatherIcon: string;

    public windGust: number;
    public windDeg: number;
    public cityId: number;

    public current?: boolean;

    constructor(data: IWeatherOfCity) {
        this.name = data.name;

        this.dt = data.dt;

        this.weatherDescription = data.weather[0].description;
        this.weatherMain = data.weather[0].main;
        this.weatherIcon = data.weather[0].icon;
        this.weatherId = data.weather[0].id

        this.coordinates = data.coord;

        this.clouds = data.clouds.all;

        this.requestCod = data.cod;

        this.feelsLike = data.main.feels_like;
        this.pressure = data.main.pressure;
        this.humidity = data.main.humidity;
        this.tempMax = data.main.temp_max;
        this.tempMin = data.main.temp_min;
        this.temp = data.main.temp;

        this.country = data.sys.country;
        this.sunrise = data.sys.sunrise;
        this.sunset = data.sys.sunset;

        this.timezone = data.timezone;
        this.cityId = data.id;
        this.windSpeed = data.wind.speed;
        this.windGust = data.wind.gust;
        this.windDeg = data.wind.deg;
    }
}
