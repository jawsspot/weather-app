export interface IDadataRequest {
    suggestions: ISuggestion[]

}

export interface ISuggestion {
    value: string,
    unrestricted_value: string,
    data: {
        city: string,
        city_with_type: string,
    }
}