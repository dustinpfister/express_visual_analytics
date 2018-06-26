
console.log('yes');

$.ajax({
    url: '/json/2018.json'

}).done(function (days) {

    // a scene is needed to place objects in
    var scene = new THREE.Scene(),

    // I will need an camera to look at objects in the scene
    camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000),

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);

    $('#view').get(0).appendChild(renderer.domElement);

    console.log();

    days.forEach(function (day, i) {

        if (day.date.match(/\d+\/\d+\/\d+/)) {

            var d = day.date.split('/'),

            jsDate = new Date('20' + d[2], d[0] - 1, d[1]);

            //if (jsDate.getMonth() === 0) {

                var y = day.users * .125;

                var cube = new THREE.Mesh(new THREE.BoxGeometry(1, y, 1),
                        new THREE.MeshNormalMaterial());

                var wd = jsDate.getDay(), // week day
                x = wd + 1 * wd;

                cube.position.set(
                    x,
                    y / 2,
                    i/ 7 + 1 * i/7);

                scene.add(cube);

            //}

        }

    });

    camera.position.set(15, 15, 15);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);

});
