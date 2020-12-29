/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('courses', {
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
    cer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    cou_N_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    coache_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    category_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    place: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    hours: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    price: {
      type: DataTypes.STRING(10),
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
    tableName: 'courses',
    timestamps: true
    });
};
