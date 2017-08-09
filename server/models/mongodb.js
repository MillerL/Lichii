/**
 * Created by miller on 2017/6/6.
 */
// DB Connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://mint:xiao@121.40.148.8:27017/mintWp');
exports.mongoose = mongoose;