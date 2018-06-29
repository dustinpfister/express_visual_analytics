
$.ajax({

    //url: '/json/days.json'
    //url: '/json/2018.json'
    url: '/json/db.json'

}).done(function (res) {

    //console.log(Array.isArray(days))

    var days = [];

    if (res.days) {

        days = res.days;

    }

    if (res.constructor.name === 'Array') {

        days = res;

    }

    // a scene is needed to place objects in
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xafafaf);

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
        el.style.left = Number((window.innerWidth - w) / 2)+'px';
        el.style.top = '0px';
        el.style.width = w + 'px';
        el.style.height = h + 'px';

    };
    onResize();
    window.addEventListener('resize', onResize);

    // Orbit controls
    var controls = new THREE.OrbitControls(camera, el);
    controls.panSpeed = 0.1;
    controls.rotateSpeed = 0.1;
    controls.zoomSpeed = 0.5;

    // staring position of camera, and orbit controls focus
    camera.position.set(-20, 20, -40);
    camera.lookAt(80, 0, 0);
    controls.target.set(80, 0, 0);

    // for each day in the response
    days.forEach(function (day, i) {

        if (day.date.match(/\d+\/\d+\/\d+/)) {

            // get jsDate
            var d = day.date.split('/'),
            jsDate = new Date('20' + d[2], d[0] - 1, d[1]);

            // The Box for this day
            var d = 1,
            h = day.users * .125,
            w = 1,
            box = new THREE.Mesh(new THREE.BoxGeometry(d, h, w),
                    new THREE.MeshStandardMaterial({

                        color: new THREE.Color(1 - (jsDate.getDate() / 31), 0, jsDate.getFullYear() == '2017' ? 1 : 0),
                        emissive: 0x2a2a2a

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
