var express = require('express');
var router = express.Router();
var Wp = require("./../models/Wp");
var mongoose = require('mongoose');
mongoose.connect('mongodb://miller:xiao@121.40.148.8:27017/mintWp');
var db = mongoose.connection;

// var db = mongoose.createConnection('mongodb://miller:xiao@121.40.148.8:27017/mintWp');
// 链接错误

db.on('error', function (error) {
    console.log(error);
});
router.get('/', function (req, res) {
    res.send("wp");
});

router.get('/getDataList', function (req, res, next) {
    Wp.find({}).sort({"id": -1}).limit(10).exec(function (err, docs) {
        if (err) throw err;
        // object of the user
        var response = {status: 1, data: docs, errorDesc: err};
        res.send(response);
    });
});

module.exports = router;

