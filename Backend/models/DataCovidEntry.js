'use strict';

module.exports = (sequelize, DataType) => {
    let DataCovidEntry = sequelize.define('DataCovidEntry', {
      // id missing because Sequelize adds it by default
          country_name : DataType.STRING(100),
          population : DataType.INTEGER(11),
          date: DataType.INTEGER(12),
          today_deaths: DataType.INTEGER(11),
          today_cases: DataType.INTEGER(11),
          total_deaths: DataType.INTEGER(11),
          total_cases: DataType.INTEGER(11),
          death_rate: DataType.FLOAT,        
          cases_per_million_people: DataType.INTEGER(11)
    }, {
      freezeTableName: true,
      timestamps: false,
      tableName: 'dati_covid'
    });
  
    // Association to other models (foreign keys)
    DataCovidEntry.associate = function (models) {
  
    };
  
    return DataCovidEntry;
  };