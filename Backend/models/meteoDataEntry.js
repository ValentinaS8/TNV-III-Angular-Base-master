'use strict';

module.exports = (sequelize, DataType) => {
  let DataEntry = sequelize.define('MeteoDataEntry', {
    // id missing because Sequelize adds it by default
    nome_citta:  DataType.STRING(20),
    data: DataType.INTEGER(12),
    temp_max: DataType.FLOAT,
    temp_min: DataType.FLOAT,
    temp_media: DataType.FLOAT,
    umidita_perc: DataType.FLOAT,
     }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'dati_meteo'
  });

  // Association to other models (foreign keys)
  DataEntry.associate = function (models) {

  };

  return MeteoDataEntry;
};
