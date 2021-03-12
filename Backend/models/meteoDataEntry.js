'use strict';

module.exports = (sequelize, DataType) => {
  let MeteoDataEntry = sequelize.define('MeteoDataEntry', {
    // id missing because Sequelize adds it by default
    timezone:  DataType.STRING(50),
    time: DataType.INTEGER(12),
    temperature: DataType.FLOAT,
    temperatureMax: DataType.FLOAT,
    temperatureMin: DataType.FLOAT,
    relHumidity: DataType.FLOAT,
    airQualityIndex: DataType.FLOAT,
     }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'meteodata'
  });

  // Association to other models (foreign keys)
  MeteoDataEntry.associate = function (models) {

  };

  return MeteoDataEntry;
};
