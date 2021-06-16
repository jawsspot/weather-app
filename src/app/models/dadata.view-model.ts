import { IDadataRequest } from "../interfaces/dadata-request.interface";

export class DadataViewModel {
    public cityWithType: string[] = [];

    constructor(dadataRequest: IDadataRequest) {
        if (dadataRequest) {
            dadataRequest.suggestions.forEach(item => {
                if (item.data.city_with_type) {
                    this.cityWithType.push(item.data.city_with_type)
                }
            });
        }
    }
}