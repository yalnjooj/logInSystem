/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('texts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    uID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    certificates_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    lang_sex_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'texts',
    timestamps: true
    });
};
