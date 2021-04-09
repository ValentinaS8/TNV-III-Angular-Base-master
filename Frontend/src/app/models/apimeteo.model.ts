export interface ApiMeteo{
    error: string;
    data: current 
}

export interface current{
    timezone : string;
    current : ApiMeteoData
}
export interface ApiMeteoData{
    time: string;
    temperature : number,
    temperatureMax : number,
    temperatureMin : number,
    windSpeed : number,
    relHumidity : number,
    airQualityIndex: number,
}