let express = require('express'),

app = express();

app.set('port', 8080);

app.get('/', function (req, res) {

    res.send('okay');

});

app.listen(app.get('port'), function () {

    console.log('express_visual_analytics is up on port: ' + app.get('port'));

});
