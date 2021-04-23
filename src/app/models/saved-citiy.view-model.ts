import { ISavedCity } from '../interfaces/saved-city.interface';

export class SavedCityViewModel {
    public name: string;
    public current?: boolean;

    constructor(data: ISavedCity) {
        this.name = data.name;
        if (data.current) {
            this.current = data.current;
        }
    }
}
