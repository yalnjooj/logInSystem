var DataTypes = require("sequelize").DataTypes;
var _catagory = require("./catagory");
var _coursefieldvalue = require("./coursefieldvalue");
var _coaches = require("./coaches");
var _certificatename = require("./certificatename");
var _certificates = require("./certificates");
var _fieldscertificatelookup = require("./fieldscertificatelookup");
var _coursesname = require("./coursesname");
var _courses = require("./courses");
var _fields = require("./fields");
var _coursesfields = require("./coursesfields");
var _langsex = require("./langsex");
var _printcoursestudent = require("./printcoursestudent");
var _profiles = require("./profiles");
var _resetpasswords = require("./resetpasswords");
var _roles = require("./roles");
var _smbscertificatelookup = require("./smbscertificatelookup");
var _smbsname = require("./smbsname");
var _stampsmarksbackgroundssignatures = require("./stampsmarksbackgroundssignatures");
var _students = require("./students");
var _studentcourselookup = require("./studentcourselookup");
var _texts = require("./texts");
var _users = require("./users");

function initModels(sequelize) {
  var catagory = _catagory(sequelize, DataTypes);
  var coursefieldvalue = _coursefieldvalue(sequelize, DataTypes);
  var coaches = _coaches(sequelize, DataTypes);
  var certificatename = _certificatename(sequelize, DataTypes);
  var certificates = _certificates(sequelize, DataTypes);
  var fieldscertificatelookup = _fieldscertificatelookup(sequelize, DataTypes);
  var coursesname = _coursesname(sequelize, DataTypes);
  var courses = _courses(sequelize, DataTypes);
  var fields = _fields(sequelize, DataTypes);
  var coursesfields = _coursesfields(sequelize, DataTypes);
  var langsex = _langsex(sequelize, DataTypes);
  var printcoursestudent = _printcoursestudent(sequelize, DataTypes);
  var profiles = _profiles(sequelize, DataTypes);
  var resetpasswords = _resetpasswords(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var smbscertificatelookup = _smbscertificatelookup(sequelize, DataTypes);
  var smbsname = _smbsname(sequelize, DataTypes);
  var stampsmarksbackgroundssignatures = _stampsmarksbackgroundssignatures(sequelize, DataTypes);
  var students = _students(sequelize, DataTypes);
  var studentcourselookup = _studentcourselookup(sequelize, DataTypes);
  var texts = _texts(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  return {
    catagory,
    coursefieldvalue,
    coaches,
    certificatename,
    certificates,
    fieldscertificatelookup,
    coursesname,
    courses,
    fields,
    coursesfields,
    langsex,
    printcoursestudent,
    profiles,
    resetpasswords,
    roles,
    smbscertificatelookup,
    smbsname,
    stampsmarksbackgroundssignatures,
    students,
    studentcourselookup,
    texts,
    users,
  };
}
module.exports = { initModels };
