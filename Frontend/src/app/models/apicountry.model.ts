export interface ApiCountry{
    data : ApiCountryData
}

export interface ApiCountryData{
    name : string,
    code: string,
    coordinates: Coordinates,
    population: number,
    latest_data : LatestData
}

export interface Coordinates{
    latitude: number,
    longitude: number
}

export interface LatestData{
    deaths : number,
    confirmed:number,
    recovered: number,
    critical : number,
    calculated : Calculated
}

export interface Calculated{
    death_rate: number, 
    recovery_rate: number, 
    recovered_vs_death_ratio: number, 
    cases_per_million_population: number 
}