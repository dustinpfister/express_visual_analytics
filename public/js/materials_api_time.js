
$.ajax({

    //url: '/json/days.json'
    //url: '/json/2018.json'
    url: '/json/db.json'

}).done(function (res) {

    var data = {
        days: [],
        bestDay: -1,
    };

    if (res.days) {

        data.days = res.days;

    }

    if (res.constructor.name === 'Array') {

        data.days = res;

    }

    // reference data.days
    var days = data.days;

    // find the best day once for data.bestDay
    var bestDay = (function (data) {

        data.bestDay = -1;

        data.days.forEach(function (day) {

            if (Number(day.users) > data.bestDay) {

                data.bestDay = Number(day.users);

            }

        });

        return data.bestDay;

    }
        (data));

    // jsDate should be part of a day object
    (function () {

        data.latest = {

            date: new Date(0),
            dayIndex: 0

        };

        data.days.forEach(function (day, i) {

            // get jsDate
            var d = day.date.split('/');

            day.jsDate = new Date('20' + d[2], d[0] - 1, d[1]);

            if (day.jsDate > data.latest.date) {

                data.latest = {

                    date: day.jsDate,
                    dayIndex: i

                };

            }

        });

    }
        ());

    console.log('latest: ' + data.latest.date);

    // a scene is needed to place objects in
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // I will need an camera to look at objects in the scene
    var aspect = 32 / 24,
    aspectLevel = 480;
    var camera = new THREE.PerspectiveCamera(75, aspect, 1, 1000);

    var light = new THREE.PointLight();
    light.position.set(0, 25, 0);
    camera.add(light);
    scene.add(camera);

    // renderer
    var renderer = new THREE.WebGLRenderer();
    //renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(aspect * aspectLevel, aspectLevel);

    // append
    var el = $('#view').get(0);
    el.appendChild(renderer.domElement);

    // resize
    var onResize = function () {

        // to keep it at aspect
        var w = window.innerHeight * aspect,
        h = window.innerHeight;

        // set fix position of dom element, and scale
        el = renderer.domElement;
        el.style.position = 'fixed';
        el.style.left = Number((window.innerWidth - w) / 2) + 'px';
        el.style.top = '0px';
        el.style.width = w + 'px';
        el.style.height = h + 'px';

    };
    onResize();
    window.addEventListener('resize', onResize);

    // Orbit controls
    var controls = new THREE.OrbitControls(camera, el);
    controls.panSpeed = 0.5;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 0.5;

    // staring position of camera, and orbit controls focus
    camera.position.set(-20, 20, -40);
    camera.lookAt(80, 0, 0);
    controls.target.set(80, 0, 0);

    // materials API
    var materials = {

        //  fund out what material to use here
        set: function (options) {

            options = options || {};
            options.day = options.day || {
                day: {}
            };
            options.data = options.data || {};
			
			options.daysBack = options.daysBack || options.data.days.length;

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

        // standard material for days that are not special
        time: function (options) {

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

                color: new THREE.Color(per, per, 0),
                //wireframe:true,
                transparent: true,
                opacity: per * .8

            });

        },

        // standard material for days that are not special
        standard: function (options) {

            return new THREE.MeshStandardMaterial({

                color: new THREE.Color(1, 1, 1),
                //wireframe:true,
                transparent: true,
                opacity: .5

            });

        }

    };

    // for each day in the response
    days.forEach(function (day, i) {

        if (day.date.match(/\d+\/\d+\/\d+/) && day.users > 0) {

            var jsDate = day.jsDate;

            // The Box for this day
            var d = 1,
            h = day.users * .125,
            w = 1,
            box = new THREE.Mesh(

                    // geometry
                    new THREE.BoxGeometry(d, h, w),

                    // material(s)
                    materials.set({

                        day: day,
                        data: data
                        //bestDay: data.bestDay,
                        //jsDate: jsDate

                    }));

            // set BOX position
            var firstDay = new Date(jsDate.getFullYear(), jsDate.getMonth(), 1),
            yearX = (jsDate.getFullYear() - 2017) * 6 * 12,
            monthX = (jsDate.getMonth() * 6),
            dayX = Math.floor((firstDay.getDay() + jsDate.getDate() - 1) / 7), //Math.floor(jsDate.getDate() / 7),
            x = dayX + monthX + yearX;
            y = h / 2;
            z = jsDate.getDay();

            box.position.set(x, y, z)

            // and the box to the scene
            scene.add(box);

        }

    });

    // the loop
    var loop = function () {

        requestAnimationFrame(loop);

        renderer.render(scene, camera);

    };

    loop();

});
