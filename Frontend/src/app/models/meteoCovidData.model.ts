import { ApiCoronaData } from './apiCorona.model';
import { ApiMeteo } from './apimeteo.model';

export interface MeteoCovidData {
    state:           string;
    city:            string;
    data:            string;
    population:      number;
    today_deaths:    number;
    today_confirmed: number;
    total_deaths:    number;
    total_confirmed: number;
    temperature:     number;
    humidity:        number;
    aqi:             number;
}
