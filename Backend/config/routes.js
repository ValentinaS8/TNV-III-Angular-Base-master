const DataEngine = require('../engine/entry');
const ErrorsEngine  = require('../engine/errors');

module.exports = (app) => {

  const dataPath = '/data';
 // const meteoDataPath = '/meteodata'

  /********** DATA REST APIs **********/
  app.get(dataPath, DataEngine.getEntry);
  app.post(dataPath, DataEngine.createEntry);
  app.get(`${dataPath}/:id`, DataEngine.getEntryById);
  app.put(`${dataPath}/:id`, DataEngine.editEntry);
  app.delete(`${dataPath}/:id`, DataEngine.deleteEntry);

 /* app.get(meteoDataPath, DataEngine.getEntry);
  app.post(meteoDataPath, DataEngine.createEntry);
  app.get(`${meteoDataPath}/:id`, DataEngine.getEntryById);
  app.put(`${meteoDataPath}/:id`, DataEngine.editEntry);
  app.delete(`${meteoDataPath}/:id`, DataEngine.deleteEntry);*/
  /********** ERROR HANDLER **********/
  app.use(ErrorsEngine.page404);
  app.use(ErrorsEngine.pageError);

};