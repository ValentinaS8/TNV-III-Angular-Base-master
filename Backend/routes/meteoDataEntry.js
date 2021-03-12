const express = require('express');
const router = express.Router();
const MeteoDataEntry = require('../models/index').MeteoDataEntry;

router.get('/', function (req, res, next) {
    MeteoDataEntry.findAll({})
        .then(MeteoDataEntry => res.json(MeteoDataEntry))
        .catch(err => res.json(err))
    ;
});

router.get('/:id', function (req, res, next) {
    MeteoDataEntry.findOne({
            where: {
                id: req.meteo.params.id
            }
        }
    )
        .then(MeteoDataEntry => res.json(MeteoDataEntry))
        .catch(err => res.json(err));
});

router.post('/', function (req, res, next) {
    
    const {timezone, temperature, temperatureMax, temperatureMin,
        relHumidity,airQualityIndex} = req.body;
        console.log("body:", req.body)

    MeteoDataEntry.create({ 

        timezone: timezone,
        
        temperature: temperature,
        temperatureMax: temperatureMax,
        temperatureMin: temperatureMin,
        relHumidity: relHumidity,  
        airQualityIndex: airQualityIndex,      
    })
        .then(MeteoDataEntry => res.status(201).json({
            MeteoDataEntry
        }))
        .catch(error => res.status(500).json({
            error
        }));
});

router.put('/:id', function (req, res, next) {
    const meteoId = req.params.id;
    const { timezone, temperature, temperatureMax, temperatureMin,relHumidity, airQualityIndex} = req.body;

    DataEntry.update({
        timezone: timezone,
        
        temperature: temperature,
        temperatureMax: temperatureMax,
        temperatureMin: temperatureMin,
        relHumidity:relHumidity,
        airQualityIndex:airQualityIndex,
    }, {

        where: {
            id: meteoId
        }
    })
        .then(MeteoDataEntry => res.status(201).json({
            MeteoDataEntry
        }))
        .catch(error => res.status(500).json({
            error
        }));
});

router.delete('/:id', function (req, res, next) {
    const meteo_id = req.params.id;

    DataEntry.destroy({
        where: {
            id: meteo_id
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

