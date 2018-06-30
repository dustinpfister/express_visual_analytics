
// "monthcubes"
getData.get(function (data) {

    // using getdata.js to get the json data
    var days = data.days,

    // using three_shell.js
    shell = new threeShell.StandardScene();

    var fogColor = new THREE.Color(.25, .25, .25);
    shell.scene.background = fogColor;
    shell.scene.fog = new THREE.FogExp2(fogColor, 0.002)

        // custom over time material
        materials.time = function (options) {

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

        var r = .2 + per * .4,
        g = 0,
        b = 1 - r;

        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

        canvas.width = 32;
        canvas.height = 32;

        //ctx.fillStyle = '#ffffff';
        //ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.lineWidth = 8;
        ctx.strokeStyle = 'rgb(' + Math.floor(255 * per) + ',' + Math.floor(255 - 255 * per) + ',0)';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        var texture = new THREE.CanvasTexture(canvas);

        return new THREE.MeshStandardMaterial({

            //color: new THREE.Color(r, g, b),
            //emissive: new THREE.Color(1,1,1),
            transparent: true,
            //opacity: .15 + .85 * ((options.day.jsDate.getDay() + 1) / 7),
            map: texture

        });

    };

    var groups = {},
    highest = 0;

    // for each day in the response
    days.forEach(function (day, i) {

        if (day.date.match(/\d+\/\d+\/\d+/) && day.users > 0) {

            var jsDate = day.jsDate;

            // The Box for this day
            var d = 10,
            h = day.users * .5,
            w = 10,
            box = new THREE.Mesh(

                    // geometry
                    new THREE.BoxGeometry(d, h, w),

                    materials.time({

                        day: day,
                        data: data

                    }));

            if (h > highest) {

                highest = h;

            }

            // set BOX position
            var firstDay = new Date(jsDate.getFullYear(), jsDate.getMonth(), 1),
            dayX = Math.floor((firstDay.getDay() + jsDate.getDate() - 1) / 7);

            // find group
            groupKey = jsDate.getFullYear() + '_' + jsDate.getMonth();
            var group = groups[groupKey];
            if (!group) {

                group = groups[groupKey] = new THREE.Group();
                var gInfo = group.userData;

                gInfo.y = jsDate.getFullYear();
                gInfo.m = jsDate.getMonth();

                // add new group
                //shell.scene.add(group);
            }

            var x = dayX * d,
            y = h / 2;
            z = jsDate.getDay() * w; // using h = (nice fail)

            box.position.set(x - (w * 2.5), y, z - (d * 3.5));

            // add day box to group
            group.add(box);

        }

    });

    // set up virtual cubes
    var cubes = [];
    (function () {

        var i = 0,
        gLen = Object.keys(groups).length,
        step = 12;
        for (var groupKey in groups) {

            //var step = 15 - 10 * (i/gLen);
            var group = groups[groupKey],
            gInfo = group.userData;

            // !!! subtracting year by a number literal.
            var cubeIndex = (gInfo.y - 2017) * 2 + Math.floor((gInfo.m + 1) / 6),
            sideIndex = Math.floor((gInfo.m + 1) % 6);

            var cube = cubes[cubeIndex];
            if (!cube) {

                //cube = cubes[cubeIndex] = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100),new THREE.MeshBasicMaterial({color: new THREE.Color(0, 1, 0),wireframe: true}));
                cube = new THREE.Group();

                cube.position.set(cubeIndex * 100, cubeIndex * 100, cubeIndex * 100);

                // !!! need to set scale right
                //cube.scale.set(.5, .5, .5);

                shell.scene.add(cube);
            }

            switch (sideIndex) {

                // !!! crude way to map to sides,
                // a formula should not be to hard
            case 0:

                group.rotation.set(0, 0, 0);
                group.position.y = 25;

                break;

            case 1:

                group.rotation.set(Math.PI, 0, 0);
                group.position.y = -25;

                break;

            case 2:

                group.rotation.set(Math.PI / 2, 0, 0);
                group.position.z = 25;

                break;

            case 3:

                group.rotation.set(Math.PI / 2, 0, Math.PI);
                group.position.z = -25;

                break;

            case 4:

                group.rotation.set(Math.PI / 2, Math.PI, Math.PI / 2);
                group.position.x = 25;

                break;

            case 5:

                group.rotation.set(Math.PI / 2, Math.PI, -Math.PI / 2);
                group.position.x = -25;

                break;

            }

            cube.add(group);

            i += 1;

        }
    }
        ());

    // start the camera here
    shell.startCamera({
         position : [-14.56309216287326,-39.997294309027296,-83.78384438170627],lookAt : [129.77210495663797,139.62680403278063,237.40531553007457]
        //position: [188.76309571525505, 671.6770913282003, 330.4489052472152],lookAt: [334.69138134953243, 91.07993980243003, 94.42752060981051]

    });

    // can just call the startLoop method
    shell.startLoop();

});
