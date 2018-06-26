
console.log('yes');

$.ajax({
    url: '/json/2018.json'

}).done(function (days) {

    days.forEach(function (day) {

        if (day.date.match(/\d+\/\d+\/\d+/)) {
            console.log(day);

        }

    });

});
