
// "over_time"
getData.get(function (data) {

    // using getdata.js to get the json data
    var days = data.days,

    // using three_shell.js
    shell = new threeShell.StandardScene();

    // can overwrite materials in materials.js
    //materials.standard = function (options) {

    //    return new THREE.MeshNormalMaterial();

    //};

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

                    materials.time({

                        day: day,
                        data: data,
                        daysBack: data.length

                    }));

            // set BOX position
            var firstDay = new Date(jsDate.getFullYear(), jsDate.getMonth(), 1),
            yearX = (jsDate.getFullYear() - 2017) * 6 * 12,
            monthX = (jsDate.getMonth() * 6),
            dayX = Math.floor((firstDay.getDay() + jsDate.getDate() - 1) / 7),
            x = dayX + monthX + yearX;
            y = h / 2;
            z = jsDate.getDay();

            box.position.set(x, y, z)

            // and the box to the scene
            shell.scene.add(box);

        }

    });

    // start the camera here
    shell.startCamera({

        position: [-8.86, 75.29, -47.75],
        lookAt: [95, 0, 0]

    });

    // can just call the startLoop method
    shell.startLoop();

});
