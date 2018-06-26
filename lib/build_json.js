// build json files from csv

let fs = require('fs-extra'),
csv = require('csvtojson');

let csvToJson = function (csvFilePath) {

    return csv()
    .fromFile(csvFilePath)
    .then((obj) => {
        return JSON.strigify(obj);
    });

};

let buildFiles = function (obj) {

    return new Promise((resolve, reject) => {

        resolve({

            foo: 'bar'

        });

    });

};

exports.build = function (obj) {

    return new Promise((resolve, reject) => {

        // reject if no path to csv is given
        if (!obj.dir_csv || !obj.dir_json) {

            reject('must give a dir_csv, and dir_json path');

        }

        obj.files = [];

        // ensure give path is there.
        fs.ensureDir(obj.dir_csv).then(() => {

            return fs.ensureDir(obj.dir_json);

        }).then(() => {

            // read the contents
            return fs.readdir(obj.dir_csv);

        }).then((files) => {

            obj.files = files;

            return buildFiles(obj);

            //resolve(files);

        }).then((obj) => {

            resolve(obj);

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
