export interface ApiMeteo{
    current : ApiMeteoData
}

export interface ApiMeteoData{
    timezone : string,
    time : number,    
    temperature : number,
    temperatureMax : number,
    temperatureMin : number,
    relHumidity : number,
    airQualityIndex: number,
}