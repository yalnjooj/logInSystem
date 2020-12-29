/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('coursefieldvalue', {
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
    cou_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    cer_field_lookup_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    value: {
      type: DataTypes.STRING(45),
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
    tableName: 'coursefieldvalue',
    timestamps: true
    });
};
