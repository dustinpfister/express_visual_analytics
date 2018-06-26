// build json files from csv

let = csvFilePath = '../csv/2017_day.csv',
fs = require('fs-extra'),
csv = require('csvtojson');

exports.build = function (obj) {

    return new Promise(function (resolve, reject) {

        if (!obj.dir_csv) {

            reject('must give a dir_csv path');

        }

        resolve();

    });

};

/*
app.get('/', (req, res) => {

csv()
.fromFile(csvFilePath)
.then((jsonObj) => {
res.json(jsonObj);
});

});
*/
