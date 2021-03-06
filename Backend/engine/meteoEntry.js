const MeteoDataEntry = require('../models/index').MeteoDataEntry;

const meteoGetEntry = (req, res) => {
  MeteoDataEntry.findAll({})
    .then(entry => {
      return res.status(200).send(entry)
    })
    .catch(err => {
      return res.status(500).send(err)
    });
};

const meteoGetEntryById = (req, res) => {
  const meteoEntryId = req.meteo.params.id;

  MeteoDataEntry.findOne({
    where: {
      id: meteoEntryId
    }
  })
    .then(entry => {
      if (!entry) {
        return res.status(404).send({
          error: true,
          message: 'The requested data does not exist.',
          meteoEntryId
        })
      }

      return res.status(200).send(entry);
    })
    .catch(err => {
      return res.status(500).send(err);
    })
};

const meteoCreateEntry = (req, res) => {
  const {nome_citta, data, temp_max, temp_min, temp_media, umidita_perc,} = req.body;

  MeteoDataEntry.create({
    nome_citta: nome_citta,
    data: data,
    temp_max: temp_max,
    temp_min: temp_min,
    temp_media: temp_media,
    umidita_perc: umidita_perc,    
  })
    .then(entry => {
      return res.status(201).send(entry);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
};

const meteoEditEntry = (req, res) => {
  const meteoEntryId = req.params.id;
  const {nome_citta, data, temp_max, temp_min, temp_media, umidita_perc,} = req.body;

  MeteoDataEntry.findOne({
    where: {
      id: meteoEntryId
    }
  })
    .then(entry => {
      if (!entry) {
        return res.status(404).send({
          error: true,
          message: 'Cannot update a entry that does not exist.',
          meteoEntryId
        })
      }

      MeteoDataEntry.update({
        nome_citta: nome_citta,
        data: data,
        temp_max: temp_max,
        temp_min: temp_min,
        temp_media: temp_media,
        umidita_perc: umidita_perc,       
      }, {
        where: {
          id: meteoEntryId
        }
      })
        .then(updated => {
          if(updated.pop() === 1) {
            return res.status(201).send({
              updated: true,
              meteoEntryId
            });
          } else {
            return res.status(400).send({
              updated: false,
              meteoEntryId
            })
          }
        })
        .catch(error => {
            return res.status(500).send(error);
          }
        );
    })
    .catch(error => {
      return res.status(500).send(error);
    })
};

const meteoDeleteEntry = (req, res) => {
  const meteoEntryId = req.params.id;

  MeteoDataEntry.destroy({
    where: {
      id: meteoEntryId
    }
  })
    .then( res => {
      return res.status(204).send({});
    })
    .catch(error => {
      return res.status(500).send(error);
    })
};

module.exports = {
  meteoGetEntry,
  meteoGetEntryById,
  meteoEditEntry,
  meteoDeleteEntry,
  meteoCreateEntry
};