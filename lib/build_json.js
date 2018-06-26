// build json files from csv

let csvFilePath = '../csv/2017_day.csv',
fs = require('fs-extra'),
csv = require('csvtojson');

exports.build = function (obj) {

    return new Promise((resolve, reject) => {

        // reject if no path to csv is given
        if (!obj.dir_csv) {

            reject('must give a dir_csv path');

        }

        // ensure give path is there.
        fs.ensureDir(obj.dir_csv).then(() => {

            // read the contents
            return fs.readdir(obj.dir_csv);

        }).then((files) => {

            resolve(files);

        }).catch ((mess) => {

            reject(mess);

        });

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
