
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

                    materials.dayOfWeek({

                        day: day,
                        data: data

                    }));

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
                shell.scene.add(group);
            }

            var x = dayX,
            y = h / 2;
            z = jsDate.getDay();

            box.position.set(x, y, z);

            // add day box to group
            group.add(box);

        }

    });

    // position groups
    (function () {

        var step = 2;

        for (var groupKey in groups) {

            var group = groups[groupKey],
            gInfo = group.userData;

            var len = (gInfo.y - 2017) * 12 + gInfo.m * 1 + 8,
            r = Math.PI * 2 * (len % 12 / 12),
            x = Math.cos(r) * (len * step),
            z = Math.sin(r) * (len * step);
            y = len * 0;

            group.position.set(x, y, z);
            group.lookAt(0, 0, 0);

        }
    }
        ());

    // start the camera here
    shell.startCamera({

        position: [-56.46552671104806,  29.956587969042168, -28.437721624416564],
        lookAt: [64.71206348116684, -1.9597999999999955, 20.763000115905466]

    });

    shell.scene.background = new THREE.Color(1, 1, 1);

    // can just call the startLoop method
    shell.startLoop();

});
