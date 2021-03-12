export interface MeteoCovidData{
    //campi covid
    population: number,
    updated_at: string, //data -> da convertire in formato corretto prima di salvare sul db
    today_deaths: number, //morti di oggi
    today_confirmed: number, //casi di oggi
    total_deaths : number, //storico dei morti
    total_confirmed : number, //storico dei casi
    death_rate: number, //percentuale morti
    cases_per_million_population: number //casi su un milione di abitanti
    //campi meteo
    timezone : string;
    temperature : number,
    temperatureMax : number,
    temperatureMin : number,
    relHumidity : number,
    airQualityIndex: number,
}
