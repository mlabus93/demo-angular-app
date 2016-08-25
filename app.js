var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.sendFile('index.html', {"root": __dirname});
});

//app.use('/dist/js', express.static('./dist/js'));
//app.use('/dist/views/test', express.static('./dist/views/test'));
app.use('/', express.static('./'));

app.listen(3000, function() {
	console.log('Listening on port 3000...');
});
