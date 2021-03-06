const DataEntry = require('../models/index').DataEntry; //dovrebbe essere giusto così (file senza riferimento al modello dei dati)
const DataCovidEntry = require('../models/index').DataCovidEntry;

const getEntry = (req, res) => {
  DataEntry.findAll({})
    .then(entry => {
      return res.status(200).send(entry)
    })
    .catch(err => {
      return res.status(500).send(err)
    });
};

const getEntryById = (req, res) => {
  const entryId = req.params.id;

  DataEntry.findOne({
    where: {
      id: entryId
    }
  })
    .then(entry => {
      if (!entry) {
        return res.status(404).send({
          error: true,
          message: 'The requested data does not exist.',
          entryId
        })
      }

      return res.status(200).send(entry);
    })
    .catch(err => {
      return res.status(500).send(err);
    })
};

const createEntry = (req, res) => {
  const {country, population, cases, deaths, recoveries, recoveryRate, fatalityRate, continent, classification, date} = req.body;

  DataEntry.create({
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
    .then(entry => {
      return res.status(201).send(entry);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
};

const editEntry = (req, res) => {
  const entryId = req.params.id;
  const {country, population, cases, deaths, recoveries, recoveryRate, fatalityRate, continent, classification, date} = req.body;

  DataEntry.findOne({
    where: {
      id: entryId
    }
  })
    .then(entry => {
      if (!entry) {
        return res.status(404).send({
          error: true,
          message: 'Cannot update a entry that does not exist.',
          entryId
        })
      }

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
          id: entryId
        }
      })
        .then(updated => {
          if(updated.pop() === 1) {
            return res.status(201).send({
              updated: true,
              entryId
            });
          } else {
            return res.status(400).send({
              updated: false,
              entryId
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

const deleteEntry = (req, res) => {
  const entryId = req.params.id;

  DataEntry.destroy({
    where: {
      id: entryId
    }
  })
    .then( res => {
      return res.status(204).send({});
    })
    .catch(error => {
      return res.status(500).send(error);
    })
};

/************ */
const getCovidEntry = (req, res) => {
  DataCovidEntry.findAll({})
    .then(entry => {
      return res.status(200).send(entry)
    })
    .catch(err => {
      return res.status(500).send(err)
    });
};

const getCovidEntryById = (req, res) => {
  const entryId = req.params.id;

  DataCovidEntry.findOne({
    where: {
      id: entryId
    }
  })
    .then(entry => {
      if (!entry) {
        return res.status(404).send({
          error: true,
          message: 'The requested data does not exist.',
          entryId
        })
      }

      return res.status(200).send(entry);
    })
    .catch(err => {
      return res.status(500).send(err);
    })
};

const createCovidEntry = (req, res) => {
  const {country_name, population, date, today_deaths, today_cases, total_deaths, total_cases, death_rate, cases_per_million_people} = req.body;
  console.log("createCovidEntry");
  DataCovidEntry.create({
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
    .then(entry => {
      return res.status(201).send(entry);
    })
    .catch(error => {
      return res.status(500).send(error);
    });
};

const editCovidEntry = (req, res) => {
  const entryId = req.params.id;
  const {country_name, population, date, today_deaths, today_cases, total_deaths, total_cases, death_rate, cases_per_million_people} = req.body;

  DataCovidEntry.findOne({
    where: {
      id: entryId
    }
  })
    .then(entry => {
      if (!entry) {
        return res.status(404).send({
          error: true,
          message: 'Cannot update a entry that does not exist.',
          entryId
        })
      }

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
          id: entryId
        }
      })
        .then(updated => {
          if(updated.pop() === 1) {
            return res.status(201).send({
              updated: true,
              entryId
            });
          } else {
            return res.status(400).send({
              updated: false,
              entryId
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

const deleteCovidEntry = (req, res) => {
  const entryId = req.params.id;

  DataCovidEntry.destroy({
    where: {
      id: entryId
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
  getEntry,
  getEntryById,
  editEntry,
  deleteEntry,
  createEntry,
  getCovidEntry,
  getCovidEntryById,
  editCovidEntry,
  deleteCovidEntry,
  createCovidEntry
};