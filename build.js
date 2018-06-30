let path = require('path');

require('./lib/csv_ga_import')({

    dir_csv: path.join(__dirname,'csv'),
    dir_db: (path.join(__dirname,'db'))

}).then((a) => {

    console.log('Looks like we did it');

}).catch ((e) => {

    console.log(e.message);

});
