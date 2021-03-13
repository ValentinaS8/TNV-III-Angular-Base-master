export interface ApiMeteo{
    data: current 
}

export interface current{
    timezone : string;
    current : ApiMeteoData
}
export interface ApiMeteoData{
    
    temperature : number,
    temperatureMax : number,
    temperatureMin : number,
    relHumidity : number,
    airQualityIndex: number,
}