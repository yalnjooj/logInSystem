/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('print_course_student', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    uID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      unique: "fk_printCourseStudent_users"
    },
    stu_cou_lookup_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'student_course_lookup',
        key: 'id'
      },
      unique: "fk_printCourseStudent_studentCourseLookup"
    },
    print: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'print_course_student',
    timestamps: false
    });
};
