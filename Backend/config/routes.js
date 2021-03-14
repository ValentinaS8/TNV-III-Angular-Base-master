const DataEngine = require('../engine/entry');
const MeteoDataEngine = require('../engine/meteoEntry')
const ErrorsEngine  = require('../engine/errors');

module.exports = (app) => {

  const dataPath = '/data';
  const dataCovidPath = '/dati_covid';
  const meteoDataPath = '/meteodata'

  /********** DATA REST APIs **********/
  app.get(dataPath, DataEngine.getEntry);
  app.post(dataPath, DataEngine.createEntry);
  app.get(`${dataPath}/:id`, DataEngine.getEntryById);
  app.put(`${dataPath}/:id`, DataEngine.editEntry);
  app.delete(`${dataPath}/:id`, DataEngine.deleteEntry);
  //funzioni aggiunte
  app.get(dataCovidPath, DataEngine.getCovidEntry);
  app.post(dataCovidPath, DataEngine.createCovidEntry);

  app.get(meteoDataPath, MeteoDataEngine.meteoGetEntry);
  app.post(meteoDataPath, MeteoDataEngine.meteoCreateEntry);
  app.get(`${meteoDataPath}/:id`, MeteoDataEngine.meteoGetEntryById);
  app.put(`${meteoDataPath}/:id`, MeteoDataEngine.meteoEditEntry);
  app.delete(`${meteoDataPath}/:id`, MeteoDataEngine.meteoDeleteEntry);
  /********** ERROR HANDLER **********/
  app.use(ErrorsEngine.page404);
  app.use(ErrorsEngine.pageError);

};