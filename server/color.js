/**
 * Created by miller on 2017/6/19.
 */
// var ColorThief = require('color-thief');


Wp.find({id: 20170619, month: 6}).sort({"id": -1}).limit(1).exec(function (err, docs) {
    if (err) throw err;
    // object of the user
    // res.send(response);
    console.log(docs);

    // var colorThief = new ColorThief();
    // colorThief.getColor(sourceImage);
});

