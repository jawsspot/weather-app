export interface IWeatherOfCity {
    base: string;
    clouds: {
        all: number
    };
    cod: number;
    coord: {
        lat: number;
        lon: number;
    };
    dt: number;
    if: number;
    main: {
        feels_like: number;
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
    };
    name: string;
    sys: {
        country: string;
        id: number;
        sunrise: number;
        sunset: number;
        type: number;
    };
    timezone: number;
    visibility: number;
    weather: IWeatherDetails[];
    wind: {
        deg: number;
        speed: number;
    };
}

interface IWeatherDetails {
    description: string;
    icon: string;
    id: number;
    main: string;
}
