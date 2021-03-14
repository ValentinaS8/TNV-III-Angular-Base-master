export interface ApiCoronaData {
    data : ApiCovidData
}

export interface ApiCovidData {
    name : string,
    population: number,
    updated_at: string, // Data di aggiornamento del file JSON
    today: Today //Dati totali di oggi (morti, casi confermati etc..)
    latest_data : LatestData //storico dei morti e dei positivi
}

export interface Today {
    deaths: number, //morti di oggi
    confirmed: number, //casi di oggi
}

export interface LatestData{
    deaths : number, //storico dei morti
    confirmed : number, //storico dei casi
    calculated : Calculated //contiene la percentuale di morti e il numero di casi su un milione di abitanti
}

export interface Calculated{
    death_rate: number, //percentuale morti
    cases_per_million_population: number //casi su un milione di abitanti
}

