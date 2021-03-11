'use strict';

module.exports = (sequelize, DataType) => {
  let DataEntry = sequelize.define('DataEntry', {
    // id missing because Sequelize adds it by default
    country:  DataType.STRING(100),
    population: DataType.INTEGER(14),
    cases: DataType.INTEGER(11),
    deaths: DataType.INTEGER(11),
    recoveries: DataType.INTEGER(11),
    recoveryRate: DataType.FLOAT,
    fatalityRate: DataType.FLOAT,
    continent: DataType.STRING(12),
    classification: DataType.STRING(12),
    date: DataType.INTEGER(12)
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'data'
  });

  // Association to other models (foreign keys)
  DataEntry.associate = function (models) {

  };

  return DataEntry;
};

