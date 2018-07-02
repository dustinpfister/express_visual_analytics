
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

        //if (day.date.match(/\d+\/\d+\/\d+/) && day.users > 0) {

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

                        var canvas = document.createElement('canvas'),
                        ctx = canvas.getContext('2d');

                        canvas.width = 64;
                        canvas.height = 64;

                        ctx.fillStyle = '#ff0000';
                        ctx.fillRect(0, 0, canvas.width, canvas.height);

                        ctx.fillStyle = '#ffffff';
                        ctx.fillText(day.date, 10, 10);
                        ctx.fillText(day.users, 10, 30);

                        var texture = new THREE.CanvasTexture(canvas);

                        return new THREE.MeshStandardMaterial({

                            //wireframe: true
                            //color: 0x000000,
                            //transparent: true,
                            opacity: .5,
                            map: texture

                        })

                    }
                        ()));

            cube.position.set(row * 2, h / 2 * 2 + .5, col * 2);

            //  add the bar
            shell.scene.add(bar);
            shell.scene.add(cube);

        //}

    });

    // start the camera here
    shell.startCamera({

        position: [-1.4392469721658716, 1.0114560976233171, -1.691763780883234],
        lookAt: [2.0871152513244455, 1.289064193907922, 3.5582157784820523]

    });

    // can just call the startLoop method
    shell.startLoop();

});
