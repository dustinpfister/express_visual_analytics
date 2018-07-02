
// "day_matrix" work for visual_analytics
getData.get(function (data) {

    // using getdata.js to get the json data
    var days = data.days,

    // using three_shell.js
    shell = new threeShell.StandardScene();

    var highest = 0;
    days.forEach(function (day, i) {

        if (Number(day.users) > highest) {

            highest = Number(day.users);

        }
    });

    // for each day in the response
    days.forEach(function (day, i) {

        if (day.date.match(/\d+\/\d+\/\d+/) && day.users > 0) {

            var jsDate = day.jsDate;

            // The Box for this day
            var d = 1,
            h = day.users / highest * 10,
            w = 1;

            var bar = new THREE.Mesh(
                    // geometry
                    new THREE.BoxGeometry(d, h, w),
                    materials.standard());

            var row = Math.floor(i / 28),
            col = i % 28;

            if (h > 4) {

                console.log(highest);

            }

            bar.position.set(row * 2, h / 2, col * 2);

            var cube = new THREE.Mesh(
                    // geometry
                    new THREE.BoxGeometry(1, 1, 1),
                    (function () {

                        return new THREE.MeshBasicMaterial({

                            //wireframe: true
                            color: 0x000000,
                            transparent: true,
                            opacity: .5

                        })

                    }
                        ()));

            cube.position.set(row * 2, h / 2 * 2 + .5, col * 2);

            //  add the bar
            shell.scene.add(bar);
            shell.scene.add(cube);

        }

    });

    // start the camera here
    shell.startCamera({

        position: [-4.862419273850179, 15.387518615916813, -4.764027047735164],
        lookAt: [3.7836326754453897, 8.462837651634782, 3.236078193879614]

    });

    // can just call the startLoop method
    shell.startLoop();

});
