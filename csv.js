let csv = require('csvtojson');

csv().fromFile('./csv/2018.csv').then(function (json) {

    console.log(json);

});
