// materials API
var materials = (function () {

    var setOptions = function (options) {

        options = options || {};
        options.day = options.day || {
            day: {}
        };
        options.data = options.data || {};

        options.daysBack = options.daysBack || options.data.days.length;

    };

    return {

        //  fund out what material to use here
        set: function (options) {

		    setOptions(options);
		
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

           setOptions(options);

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

        // standard material for days that are not special
        standard: function (options) {

            return new THREE.MeshStandardMaterial({

                color: new THREE.Color(1, 1, 1),
                //wireframe:true,
                //transparent: true,
                //opacity: .5

            });

        }

    };

}
    ());
