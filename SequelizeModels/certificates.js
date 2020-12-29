/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('certificates', {
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
    certificate_name_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    lang_sex_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    cer_position: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    texts_position: {
      type: DataTypes.CHAR(1),
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
    tableName: 'certificates',
    timestamps: true
    });
};
