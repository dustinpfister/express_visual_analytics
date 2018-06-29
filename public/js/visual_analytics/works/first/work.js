

getData.get(function(data){

    var days = data.days;
	
	var shell = new threeShell.StandardScene();

	/*
    // a scene is needed to place objects in
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // I will need an camera to look at objects in the scene
    var aspect = 32 / 24,
    aspectLevel = 480;
    var camera = new THREE.PerspectiveCamera(75, aspect, 1, 1000);

    var light = new THREE.PointLight();
    //light.position.set(0, 25, 0);
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
        el.style.left = Number((window.innerWidth - w) / 2) + 'px';
        el.style.top = '0px';
        el.style.width = w + 'px';
        el.style.height = h + 'px';

    };
    onResize();
    window.addEventListener('resize', onResize);

    // Orbit controls
    var controls = new THREE.OrbitControls(camera, el);
    controls.panSpeed = 0.5;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 0.5;

    // staring position of camera, and orbit controls focus
    camera.position.set(-20, 20, -40);
    camera.lookAt(80, 0, 0);
    controls.target.set(80, 0, 0);

	*/
	
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

                    materials.standard())

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
            shell.scene.add(box);

        }

    });

	shell.startLoop();

});

