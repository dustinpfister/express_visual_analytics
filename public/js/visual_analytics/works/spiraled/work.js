
// "spiraled"
getData.get(function (data) {

    // using getdata.js to get the json data
    var days = data.days,

    // using three_shell.js
    shell = new threeShell.StandardScene();

    var groups = {};
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

                    materials.standard({

                        day: day,
                        data: data

                    }));

            // set BOX position
            var firstDay = new Date(jsDate.getFullYear(), jsDate.getMonth(), 1);
            //yearX = (jsDate.getFullYear() - 2017) * 6 * 12,
            //monthX = (jsDate.getMonth() * 6),
            var dayX = Math.floor((firstDay.getDay() + jsDate.getDate() - 1) / 7);

            var groupKey = jsDate.getFullYear() + '_' + jsDate.getMonth();

            var group = groups[groupKey];
            if (!group) {

                group = groups[groupKey] = new THREE.Group();
                var gInfo = group.userData;

                gInfo.y = jsDate.getFullYear();
                gInfo.m = jsDate.getMonth();

                shell.scene.add(group);
            }

            var x = dayX;
            y = h / 2;
            z = jsDate.getDay();

            box.position.set(x, y, z);

            group.add(box);

        }

    });

    // position groups
    (function () {

        var step = 2.5;

        for (var groupKey in groups) {

            var group = groups[groupKey],
            gInfo = group.userData;

            var len = (gInfo.y - 2017) * 12 + gInfo.m * 1,
            r = Math.PI * 2 * (len % 12 / 12),
            x = Math.cos(r) * (len * step),
            z = Math.sin(r) * (len * step);

            group.position.set(x, 0, z)

        }
    }
        ());

    // start the camera here
    shell.startCamera({

        position: [3.1541, 73.7662, -48.2703],
        lookAt: [1.3786, -1.9598, 54.7771]

    });

    // can just call the startLoop method
    shell.startLoop();

});
