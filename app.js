let express = require('express'),
csvFilePath = './csv/2017_day.csv',
csv = require('csvtojson'),

app = express();

app.set('port', 8080);

app.get('/', (req, res) => {

    csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        res.json(jsonObj);
    });

});

app.listen(app.get('port'), ()=>{

    console.log('express_visual_analytics is up on port: ' + app.get('port'));

});
