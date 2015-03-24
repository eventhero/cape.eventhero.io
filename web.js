var express = require('express');
var app = express();
var compression = require('compression');

// compress all requests
app.use(compression());
app.use('/versions', express.static('versions', {
    maxage: '365 days'
}));

// TODO: eventually loop through all version and display an index with links
//app.get('/', function(req, res) {
//    res.send('Hello World!')
//});

var server = app.listen(process.env.PORT || 3000, function() {
    var address = server.address();
    console.log('Example app listening at http://%s:%s', address.address, address.port)
});
