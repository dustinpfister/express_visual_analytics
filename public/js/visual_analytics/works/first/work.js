
// "First" work for visual_analytics
getData.get(function (data) {

    // using getdata.js to get the json data
    var days = data.days,

    // using three_shell.js
    shell = new threeShell.StandardScene();

    // can overwrite materials in materials.js
    materials.standard = function (options) {

        return new THREE.MeshNormalMaterial();

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

                    materials.standard());

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

        //position : [56.54046873520992,77.79098062172014,38.56711532901057],lookAt : [79.37312742176765,8.570119845822198e-16,-46.28323004014121]

        position: [46.27121864129296, 51.352074161172794, -56.39317428291642],lookAt: [73.92255450888314, 2.712124478332959e-15, 125.52868605650647]

    });

    // can just call the startLoop method
    shell.startLoop();

});
