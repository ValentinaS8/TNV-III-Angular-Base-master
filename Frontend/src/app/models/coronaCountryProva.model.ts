export interface CoronaCountryProva {
    data : ApiCovidData
}

export interface ApiCovidData {
    name : string,
    population: number,
    updated_at: string, //data -> da convertire in formato corretto prima di salvare sul db
    today: Today //contiene casi di morte e positivi di oggi
    latest_data : LatestData //contiene storico dei morti e dei positivi
}

export interface Today {
    deaths: number, //morti di oggi
    confirmed: number, //casi di oggi
}

export interface LatestData{
    deaths : number, //storico dei morti
    confirmed:number, //storico dei casi
    calculated : Calculated //contiene la ercentuale di morti e il numero di casi su un milione di abitanti
}

export interface Calculated{
    death_rate: number, //percentuale morti
    cases_per_million_population: number //casi su un milione di abitanti
}

