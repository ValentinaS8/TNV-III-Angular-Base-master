/*export interface ApiMeteo{
    data: current 
}

export interface current{
    current : ApiMeteoData
}*/
export interface ApiMeteo{
    timezone : string,
    time : number,    
    temperature : number,
    temperatureMax : number,
    temperatureMin : number,
    relHumidity : number,
    airQualityIndex: number,
}