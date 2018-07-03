// materials API
var materials = (function () {

    // color range
    var colorRange = function (per) {
        var c = 0,
        i = 0,
        arr = [],
        range = Math.pow(16, 6) - 1,
        miss;
        per = per || 0;
        c = Number(Math.floor(range * per)).toString(16);
        c = c.split('');
        miss = 6 - c.length;
        if (miss > 0) {
            while (i < miss) {
                arr.push(0);
                i += 1;
            }
            c = [].concat(arr, c);
        }
        return new THREE.Color('#' + c.join(''));
    };

    return {

        setOptions: function (options) {

            options = options || {};
            options.day = options.day || {
                users: 0,
                date: '1/1/10'
            };
            options.data = options.data || {

                days: []

            };
            options.daysBack = options.daysBack || options.data.days.length;
            options.opacity = options.opacity || 0;

            return options;

        },

        //  fund out what material to use here
        set: function (options) {

            this.setOptions(options);

            // we should have a latest day
            if (options.data.latest) {

                if (options.day.jsDate === options.data.latest.date) {

                    return this['latest'](options);

                }

            }

            // we should have users
            if (options.day.users) {

                if (Number(options.day.users) === Number(options.data.bestDay)) {

                    return this['bestday'](options);

                }

            }

            return this['time'](options);

        },

        // material for the best day
        bestday: function (options) {

            return new THREE.MeshStandardMaterial({

                color: new THREE.Color(1, 0, 0),
                emissive: new THREE.Color(.25, 0, 0)

            });
        },

        // material for the best day
        latest: function (options) {

            return new THREE.MeshStandardMaterial({

                color: new THREE.Color(0, 1, 1),
                emissive: new THREE.Color(0, .25, .25)

            });
        },

        // over time material
        time: function (options) {

            this.setOptions(options);

            var latest = options.data.latest.date,
            time = latest - options.day.jsDate,
            per = 1 - (time / (1000 * 60 * 60 * 24 * options.daysBack));

            if (per < 0) {
                per = 0;
            }

            if (per > 1) {
                per = 1;
            }

            return new THREE.MeshStandardMaterial({

                color: new THREE.Color(1, per, 0)

            });

        },

        perMonth: function (options) {

            this.setOptions(options);

            options.monthColors = options.monthColors || [
                    new THREE.Color('red'),
                    new THREE.Color('orange'),
                    new THREE.Color('yellow'),
                    new THREE.Color('pink'),
                    new THREE.Color('purple'),
                    new THREE.Color('green'),
                    new THREE.Color('cyan'),
                    new THREE.Color('blue'),
                    new THREE.Color('white'),
                    new THREE.Color('brown'),
                    new THREE.Color('black'),
                    new THREE.Color('greay')
                ];

            var i = 0;
            if (options.day) {
                var jsDate = options.day.jsDate;
                i = jsDate.getMonth();
            }
            return new THREE.MeshStandardMaterial({

                color: options.monthColors[i]

            });

        },

        // standard material for days that are not special
        standard: function (options) {

            return new THREE.MeshStandardMaterial({

                color: new THREE.Color(1, 1, 1),
                //wireframe:true,
                //transparent: true,
                //opacity: .5

            });

        },

        dayOfWeek: function (options) {

            this.setOptions(options);

            var i = 0;

            options.colors = options.colors || [
                    new THREE.Color(1, 0, 0),
                    new THREE.Color(0, 1, 0),
                    new THREE.Color(1, 1, 0),
                    new THREE.Color(0, .5, 1),
                    new THREE.Color(1, 0, 1),
                    new THREE.Color(1, .5, 0),
                    new THREE.Color(0, 1, 1)
                ];

            if (options.day) {

                var jsDate = options.day.jsDate;
                i = jsDate.getDay();

            }

            return new THREE.MeshStandardMaterial({

                color: options.colors[i],
                transparent: true,
                opacity: .5 //options.opacity

            });

        },

        random: function (options) {

            return new THREE.MeshStandardMaterial({

                color: colorRange(Math.random())

            });

        }

    };

}
    ());
