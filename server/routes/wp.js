var express = require('express');
var router = express.Router();
var Wp = require("./../models/Wp");
var mongoose = require('mongoose');
mongoose.connect('mongodb://mint:xiao@127.0.0.1:10001/mintWp');
// mongoose.connect('mongodb://mint:xiao@﻿121.40.148.8:10001/mintWp');
var db = mongoose.connection;

// var db = mongoose.createConnection('mongodb://miller:xiao@121.40.148.8:27017/mintWp');
// 链接错误

db.on('error', function (error) {
    console.log(error);
});
db.on('open', function (error) {
    console.log("++++++数据库连成功++++++");
});
router.get('/', function (req, res) {
    Wp.find({}).exec(function (err, docs) {
        if (err) throw err;
        var response = {status: 1, data: docs, errorDesc: err};
        res.send(response);
    });
});


router.get('/getDataList', function (req, res) {
    var year = req.query.year;
    var month = req.query.month;
    var _id = req.query.id;//获取URL里的today参数的值
    // var day = req.query.day;
    // var num = parseInt(req.query.num);
    //查询数据库
    // var _day = day.toString();
    console.log(year);
    if (year && month) {
        Wp.find({year: year, month: month}).sort({"id": 1}).exec(function (err, docs) {
            if (err) throw err;
            // object of the user
            var response = {status: 1, data: docs, errorDesc: err};
            res.send(response);
        });
    }

    /*if (day) {
        /!*Wp.find({id: {$lte: today}, month: month}).sort({"id": -1}).exec(function (err, docs) {
            if (err) throw err;
            // object of the user
            var response = {status: 1, data: docs, errorDesc: err};
            res.send(response);
        });*!/
        var _day = day.toString();
        Wp.find({year: year, month: month, index: _day}).sort({"id": -1}).exec(function (err, docs) {
            if (err) throw err;
            // object of the user
            var response = {status: 1, data: docs, errorDesc: err};
            res.send(response);
        });
    } else {
        Wp.find({year: year}, {month: month}).sort({"id": -1}).exec(function (err, docs) {
            if (err) throw err;
            // object of the user
            var response = {status: 1, data: docs, errorDesc: err};
            res.send(response);
        });
    }*/

});
router.get('/getDate', function (req, res) {
    var date = req.query.id;
    if (date) {
        Wp.find({id: {$lte: date}}).exec(function (err, docs) {
            if (err) throw err;
            var response = {status: 1, data: docs, errorDesc: err};
            res.send(response);
        });
    }
});

module.exports = router;

