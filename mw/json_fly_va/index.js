
let express = require('express'),
FileAsync = require('lowdb/adapters/FileAsync'),
low = require('lowdb'),
flyJS = express();

flyJS.get('/',

    [

        // set the standard response object
        require('./response_set_obj'),

        // get the days database
        require('./db_get_days'),

        // check for query string
        require('./check_query'),

        // respond to sd and ed query string values
        require('./response_send_sded'),

        // end of line
        require('./response_send_fail')

    ]);

module.exports = function (options) {

    flyJS.set('path_db', options.path_db || 'db.json');

    return flyJS;

};
