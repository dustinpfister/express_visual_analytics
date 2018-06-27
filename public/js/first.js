
console.log('yes');

$.ajax({
    url: '/json/2018.json'

}).done(function (days) {

    // a scene is needed to place objects in
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xafafaf);

    // I will need an camera to look at objects in the scene
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000),

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    var el = $('#view').get(0);
    el.appendChild(renderer.domElement);

    el = renderer.domElement;
    el.style.position = 'fixed';
    el.style.left = '0px';
    el.style.top = '0px';
    el.style.width = window.innerWidth + 'px';
    el.style.height = window.innerHeight + 'px';

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

                        //color: new THREE.Color(0, day.users / 1000, 0),
                        color: colors[jsDate.getDay()],
                        //color: new THREE.Color(0, jsDate.getDay() / 6, 0),
                        emissive: 0x000000

                    }));

            var wd = jsDate.getDay(), // week day
            x = wd + 1 * wd;

            cube.position.set(
                x,
                y / 2,
                i / 7 + 1 * i / 7);

            scene.add(cube);

            //}

        }

    });

    camera.position.set(30, 80, 0);
    camera.lookAt(0, 43, 25);

    var light = new THREE.PointLight();
    light.position.set(0, 50, 0);

    light.add(new THREE.Mesh(new THREE.SphereGeometry(1, 20, 20), new THREE.MeshBasicMaterial({
                color: 0xffffff
            })))

    scene.add(light);

    //var controls = new THREE.OrbitControls(camera);

    var loop = function () {

        requestAnimationFrame(loop);

        renderer.render(scene, camera);

    };

    loop();

});
