// var mongodb = require('./mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WpSchema = new Schema({
    type: String,
    id: String,
    month: String,
    pic: String,
    desc: String,
    index: String,
    total: String
}, {collection: "wallpapers"});
var Wp = mongoose.model('Wp', WpSchema);
/*var WpApi = function () {
 };

 WpApi.prototype.getDataList = function (callback) {
 var db = mongodb.mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function () {
 /!*Wp.find().sort({"id": -1}).limit(10).exec(function (err, docs) {
 callback(err, docs);
 });*!/
 console.log("open db");
 Wp.find({}, function (err, docs) {
 callback(err, docs);
 });
 })
 };*/
/*WpApi.prototype.save = function (obj, callback) {
 var instance = new Wp(obj);
 instance.save(function (err) {
 callback(err);
 });
 };

 WpApi.prototype.findByIdAndUpdate = function (obj, callback) {
 var _id = obj._id;
 delete obj._id;
 Wp.findOneAndUpdate(_id, obj, function (err, obj) {
 callback(err, obj);
 });
 };*/
module.exports = Wp;

