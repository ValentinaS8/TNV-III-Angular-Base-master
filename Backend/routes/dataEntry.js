const express = require('express');
const router = express.Router();
const DataEntry = require('../models/index').dataEntry;
const DataCovidEntry = require('../models/index').DataCovidEntry; 

router.get('/', function (req, res, next) {
    DataEntry.findAll({})
        .then(dataEntry => res.json(dataEntry))
        .catch(err => res.json(err))
    ;
});

router.get('/:id', function (req, res, next) {
    DataEntry.findOne({
            where: {
                id: req.params.id
            }
        }
    )
        .then(dataEntry => res.json(dataEntry))
        .catch(err => res.json(err));
});

router.post('/', function (req, res, next) {
    //dati passati dal frontend attraverso il body
    const {country, population, cases, deaths, recoveries, recoveryRate, fatalityRate, continent, classification, date} = req.body;

    DataEntry.create({
        //questi sono esattamente i nomi delle colonne della tabella
        country: country,
        population: population,
        cases: cases,
        deaths: deaths,
        recoveries: recoveries,
        recoveryRate: recoveryRate,
        fatalityRate: fatalityRate,
        continent: continent,
        classification: classification,
        date: date
    })
        .then(dataEntry => res.status(201).json({
            dataEntry
        }))
        .catch(error => res.status(500).json({
            error
        }));
});

router.put('/:id', function (req, res, next) {
    const dataId = req.params.id;
    const { country, population, cases, deaths, recoveries, recoveryRate, fatalityRate, continent, classification, date } = req.body;

    DataEntry.update({
        country: country,
        population: population,
        cases: cases,
        deaths: deaths,
        recoveries: recoveries,
        recoveryRate: recoveryRate,
        fatalityRate: fatalityRate,
        continent: continent,
        classification: classification,
        date: date
    }, {
        where: {
            id: dataId
        }
    })
        .then(dataEntry => res.status(201).json({
            dataEntry
        }))
        .catch(error => res.status(500).json({
            error
        }));
});

router.delete('/:id', function (req, res, next) {
    const data_id = req.params.id;

    DataEntry.destroy({
        where: {
            id: data_id
        }
    })
        .then( status => res.status(201).json({
            error: false
        }))
        .catch(err => res.status(500).json({
            error: false
        }));
});

//************************ */
router.get('/', function (req, res, next) {
    DataCovidEntry.findAll({})
        .then(DataCovidEntry => res.json(DataCovidEntry))
        .catch(err => res.json(err))
    ;
});

router.get('/:id', function (req, res, next) {
    DataCovidEntry.findOne({
            where: {
                id: req.params.id
            }
        }
    )
        .then(DataCovidEntry => res.json(DataCovidEntry))
        .catch(err => res.json(err));
});

router.post('/', function (req, res, next) {
    //dati passati dal frontend attraverso il body
    console.log("body:", req.body)
    const {country_name, population, date, today_deaths, today_cases, total_deaths, total_cases, death_rate, cases_per_million_people} = req.body;
    DataCovidEntry.create({
        //questi sono esattamente i nomi delle colonne della tabella
        country_name : country_name,
        population : population,
        date: date,
        today_deaths: today_deaths,
        today_cases: today_cases,
        total_deaths: total_deaths,
        total_cases: total_cases,
        death_rate: death_rate,        
        cases_per_million_people: cases_per_million_people
    })
        .then(DataCovidEntry => res.status(201).json({
            DataCovidEntry
        }))
        .catch(error => res.status(500).json({
            error
        }));
});

router.put('/:id', function (req, res, next) {
    const dataId = req.params.id;
    const {country_name, population, date, today_deaths, today_cases, total_deaths, total_cases, death_rate, cases_per_million_people} = req.body;

    DataCovidEntry.update({
        country_name : country_name,
        population : population,
        date: date,
        today_deaths: today_deaths,
        today_cases: today_cases,
        total_deaths: total_deaths,
        total_cases: total_cases,
        death_rate: death_rate,        
        cases_per_million_people: cases_per_million_people
    }, {
        where: {
            id: dataId
        }
    })
        .then(DataCovidEntry => res.status(201).json({
            DataCovidEntry
        }))
        .catch(error => res.status(500).json({
            error
        }));
});

router.delete('/:id', function (req, res, next) {
    const data_id = req.params.id;

    DataCovidEntry.destroy({
        where: {
            id: data_id
        }
    })
        .then( status => res.status(201).json({
            error: false
        }))
        .catch(err => res.status(500).json({
            error: false
        }));
});

module.exports = router;

