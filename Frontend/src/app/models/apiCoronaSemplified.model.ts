export interface ApiCoronaDataSemplified {
    country_name : string,
    population: number,
    date: string, //data -> da convertire in formato corretto prima di salvare sul db
    today_deaths: number, //morti di oggi
    today_cases: number, //casi di oggi
    total_deaths : number, //storico dei morti
    total_cases : number, //storico dei casi
    death_rate: number, //percentuale morti
    cases_per_million_people: number //casi su un milione di abitanti
}


