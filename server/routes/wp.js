var express = require('express');
var router = express.Router();
var Wp = require("./../models/Wp");

router.get('/', function (req, res) {
    res.send("wp");
});

router.get('/getDataList', function (req, res, next) {
    Wp.getDataList(function (err, docs) {
        res.send(docs);
    });
});


/*exports.doMovieAdd = function (req, res) {
 console.log(req.body.content);
 var json = req.body.content;
 // //var json = JSON.parse(req.body.content);
 if (json._id) {//update

 } else {//insert
 Wp.save(json, function (err) {
 if (err) {
 res.send({'success': false, 'err': err});
 } else {
 res.send({'success': true});
 }
 });
 }
 };*/

module.exports = router;

