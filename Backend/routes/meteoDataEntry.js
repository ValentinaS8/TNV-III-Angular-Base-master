const express = require('express');
const router = express.Router();
const MeteoDataEntry = require('../models/index').meteoDataEntry;

router.get('/', function (req, res, next) {
    MeteoDataEntry.findAll({})
        .then(meteoDataEntry => res.json(meteoDataEntry))
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
        .then(meteoDataEntry => res.json(meteoDataEntry))
        .catch(err => res.json(err));
});

router.post('/', function (req, res, next) {
    const {nome_citta, data, temp_max, temp_min, temp_media,
         umidita_perc} = req.body;

    MeteoDataEntry.create({
        nome_citta: nome_citta,
        data: data,
        temp_max: temp_max,
        temp_min: temp_min,
        temp_media: temp_media,
        umidita_perc: umidita_perc,        
    })
        .then(meteoDataEntry => res.status(201).json({
            meteoDataEntry
        }))
        .catch(error => res.status(500).json({
            error
        }));
});

router.put('/:id', function (req, res, next) {
    const meteoId = req.meteo.params.id;
    const { nome_citta, data, temp_max, temp_min, temp_media, umidita_perc, fatalityRate, continent, classification, date } = req.body;

    DataEntry.update({
        nome_citta: nome_citta,
        data: data,
        temp_max: temp_max,
        temp_min: temp_min,
        temp_media: temp_media,
        umidita_perc: umidita_perc,
       
    }, {
        where: {
            id: meteoId
        }
    })
        .then(meteoDataEntry => res.status(201).json({
            meteoDataEntry
        }))
        .catch(error => res.status(500).json({
            error
        }));
});

router.delete('/:id', function (req, res, next) {
    const meteo_id = req.meteo.params.id;

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

