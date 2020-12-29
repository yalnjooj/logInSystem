var DataTypes = require("sequelize").DataTypes;
var _certificates = require("./certificates");
var _catagory = require("./catagory");
var _coaches = require("./coaches");
var _certificate_name = require("./certificate_name");
var _courses_fields = require("./courses_fields");
var _courses = require("./courses");
var _courses_name = require("./courses_name");
var _course_field_value = require("./course_field_value");
var _fields = require("./fields");
var _reset_passwords = require("./reset_passwords");
var _fields_certificate_lookup = require("./fields_certificate_lookup");
var _roles = require("./roles");
var _print_course_student = require("./print_course_student");
var _lang_sex = require("./lang_sex");
var _profiles = require("./profiles");
var _smbs_name = require("./smbs_name");
var _smbs_certificate_lookup = require("./smbs_certificate_lookup");
var _stamps_marks_backgrounds_signatures = require("./stamps_marks_backgrounds_signatures");
var _students = require("./students");
var _student_course_lookup = require("./student_course_lookup");
var _texts = require("./texts");
var _users = require("./users");

function initModels(sequelize) {
  var certificates = _certificates(sequelize, DataTypes);
  var catagory = _catagory(sequelize, DataTypes);
  var coaches = _coaches(sequelize, DataTypes);
  var certificate_name = _certificate_name(sequelize, DataTypes);
  var courses_fields = _courses_fields(sequelize, DataTypes);
  var courses = _courses(sequelize, DataTypes);
  var courses_name = _courses_name(sequelize, DataTypes);
  var course_field_value = _course_field_value(sequelize, DataTypes);
  var fields = _fields(sequelize, DataTypes);
  var reset_passwords = _reset_passwords(sequelize, DataTypes);
  var fields_certificate_lookup = _fields_certificate_lookup(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var print_course_student = _print_course_student(sequelize, DataTypes);
  var lang_sex = _lang_sex(sequelize, DataTypes);
  var profiles = _profiles(sequelize, DataTypes);
  var smbs_name = _smbs_name(sequelize, DataTypes);
  var smbs_certificate_lookup = _smbs_certificate_lookup(sequelize, DataTypes);
  var stamps_marks_backgrounds_signatures = _stamps_marks_backgrounds_signatures(sequelize, DataTypes);
  var students = _students(sequelize, DataTypes);
  var student_course_lookup = _student_course_lookup(sequelize, DataTypes);
  var texts = _texts(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  return {
    certificates,
    catagory,
    coaches,
    certificate_name,
    courses_fields,
    courses,
    courses_name,
    course_field_value,
    fields,
    reset_passwords,
    fields_certificate_lookup,
    roles,
    print_course_student,
    lang_sex,
    profiles,
    smbs_name,
    smbs_certificate_lookup,
    stamps_marks_backgrounds_signatures,
    students,
    student_course_lookup,
    texts,
    users,
  };
}
module.exports = { initModels };
