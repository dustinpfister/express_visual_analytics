let express = require('express'),
path = require('path'),

works = express();

// main index
works.get('/', function (req, res) {

    res.render('index', {
		
		layout: 'work_index'
		
	});

});

// work path
works.get(/.+/, function(req,res){
	
	res.render('index',{
		
		layout: 'work',
		workname : req.url.split('/')[1]
		
	});
	
})

module.exports = function (options) {

    options = options || {};
    options.views = options.views || 'views';

    // ejs rendering
    works.set('view engine', 'ejs');
    works.set('views', options.views);

    return works;

};
