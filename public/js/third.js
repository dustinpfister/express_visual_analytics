
console.log('yes');

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
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);

    var light = new THREE.PointLight();
    light.position.set(0, 25, 0);
    camera.add(light);
    scene.add(camera);

    // renderer
    var renderer = new THREE.WebGLRenderer();
    //renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(320, 240);

    var el = $('#view').get(0);
    el.appendChild(renderer.domElement);

    el = renderer.domElement;
    el.style.position = 'fixed';
    el.style.left = '0px';
    el.style.top = '0px';
    el.style.width = window.innerWidth + 'px';
    el.style.height = window.innerHeight + 'px';

    var controls = new THREE.OrbitControls(camera, el);
    controls.panSpeed = 0.1;
    controls.rotateSpeed = 0.1;
    controls.zoomSpeed = 0.5;

    days.forEach(function (day, i) {

        if (day.date.match(/\d+\/\d+\/\d+/)) {

            var d = day.date.split('/'),

            jsDate = new Date('20' + d[2], d[0] - 1, d[1]);

            //if (jsDate.getMonth() === 0) {

            var y = day.users * .125,
            colors = [0xff8800, 0xffff00, 0x0000ff, 0xff00ff, 0xff0000, 0x00ff00, 0x00ffff],
            c = (i / days.length);

            var cube = new THREE.Mesh(new THREE.BoxGeometry(1, y, 1),
                    new THREE.MeshStandardMaterial({

                        //color: colors[jsDate.getDay()],
                        color: new THREE.Color(1 - (jsDate.getDate() / 31), 0, jsDate.getFullYear() == '2017' ? 1 : 0),
                        emissive: 0x2a2a2a

                    }));

            //var wd = jsDate.getDay(), // week day
            //x = wd + 1 * wd;

            var firstDay = new Date(jsDate.getFullYear(), jsDate.getMonth(), 1);

            var yearX = (jsDate.getFullYear() - 2017) * 6 * 12,
            monthX = (jsDate.getMonth() * 6),
            dayX = Math.floor((firstDay.getDay() + jsDate.getDate() - 1) / 7), //Math.floor(jsDate.getDate() / 7),

            x = dayX + monthX + yearX;

            cube.position.set(

                x,
                y / 2,

                jsDate.getDay())


            scene.add(cube);


        }

    });

    camera.position.set(-20, 20, -40);
    camera.lookAt(80, 0, 0);


    var loop = function () {

        requestAnimationFrame(loop);

        renderer.render(scene, camera);

    };

    loop();

});
