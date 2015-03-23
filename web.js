var express = require('express');
var app = express();
var compression = require('compression');

// compress all requests
app.use(compression());
app.use('/versions', express.static('versions'));

// TODO: eventually loop through all version and display an index with links
//app.get('/', function(req, res) {
//    res.send('Hello World!')
//});

var server = app.listen(3000, function() {
    var address = server.address();
    console.log('Example app listening at http://%s:%s', address.address, address.port)
});
