// build json files from csv

let fs = require('fs-extra'),
path = require('path'),
csv = require('csvtojson/v1');

let csvToJson = function (csvFilePath) {

    console.log(csvFilePath);

    return new Promise((resolve,reject) => {

        csv()
        .fromFile(csvFilePath)
        .on('json', (json) => {

		    console.log('yeas');
		
            //resolve(json);

        }).on('done', (e)=>{
			
			console.log('hello?');
			console.log(e.message);
			
			resolve();
			
		});

    });

};

let buildFiles = function (obj) {

    let index = 0,
    len = obj.files.length,

    tick = function () {

        index += 1;
        return index < len;

    },

    readFiles = function () {

        return new Promise((resolve, reject) => {

            let filePath = path.join(obj.dir_csv, obj.files[index]);

            csvToJson(filePath).then((json) => {

                //return fs.writeFile(filePath, json);

                //}).then(() => {

                if (tick()) {

                    readFiles();

                } else {

                    resolve();

                }

            }).catch ((e) => {

                reject(e.message);

            });

        });

    };

    return readFiles();

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
