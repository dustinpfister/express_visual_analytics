
// "day_matrix" work for visual_analytics
getData.setQuery({

    sd: '1/1/18',
    ed: '6/26/18',
    sort: 'users'

});
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

    // a wood material maybe?
    materials.wood = function (options) {

        return new THREE.MeshStandardMaterial({

            color: 0xaf8a00

        });

    };

    // an info material?
    materials.info = function (options) {

        options = this.setOptions(options);

        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

        canvas.width = 128;
        canvas.height = 128;

        ctx.fillStyle = '#ff0000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('date: ' + options.day.date, 64, 40);
        ctx.fillText('users: ' + options.day.users, 64, 60);

        var texture = new THREE.CanvasTexture(canvas);

        return new THREE.MeshStandardMaterial({

            //wireframe: true
            //color: 0x000000,
            transparent: true,
            opacity: .8,
            map: texture

        });

    };

    // for each day in the response
    days.forEach(function (day, i) {

        if (day.date.match(/\d+\/\d+\/\d+/) && day.users > 0) {

            var jsDate = day.jsDate;

            // The Box for this day
            var d = 1,
            h = day.users / highest * 50,
            w = 1;

            var bar = new THREE.Mesh(
                    // geometry
                    new THREE.BoxGeometry(d, h, w),
                    materials.wood());

            var row = Math.floor(i / 28),
            col = i % 28;

            bar.position.set(row * 2, h / 2, col * 2);

            var cube = new THREE.Mesh(
                    // geometry
                    new THREE.BoxGeometry(1, 1, 1),

                    materials.info({

                        day: day

                    }));

            cube.position.set(row * 2, h / 2 * 2 + .5, col * 2);

            //  add the bar
            shell.scene.add(bar);
            shell.scene.add(cube);

        }

    });

    // start the camera here
    shell.startCamera({

        position: [-5.951581141857064, 8.501525417463574, -3.3300546776065056],
        lookAt: [2.906165425885311, 3.8934451356375184, 5.998022643139286]

    });

    // can just call the startLoop method
    shell.startLoop();

});
