threeShell = (function () {

    var api = {};

    api.StandardScene = function () {

        // a scene is needed to place objects in
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        // I will need an camera to look at objects in the scene
        var aspect = 32 / 24,
        aspectLevel = 480;

        this.camera = new THREE.PerspectiveCamera(75, aspect, 1, 1000);

        var light = new THREE.PointLight();
        this.camera.add(light);
        this.scene.add(this.camera);

        // renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(aspect * aspectLevel, aspectLevel);

        // append
        this.el = $('#view').get(0);
        this.el.appendChild(this.renderer.domElement);

        // resize
        var self = this;
        var onResize = function () {

            // to keep it at aspect
            var w = window.innerHeight * aspect,
            h = window.innerHeight;

            // set fix position of dom element, and scale
            self.el.style.position = 'fixed';
            self.el.style.left = Number((window.innerWidth - w) / 2) + 'px';
            self.el.style.top = '0px';
            self.el.style.width = w + 'px';
            self.el.style.height = h + 'px';

        };
        onResize();
        window.addEventListener('resize', onResize);

        // Orbit controls
        this.controls = new THREE.OrbitControls(this.camera, this.el);
        this.controls.panSpeed = 0.5;
        this.controls.rotateSpeed = 0.5;
        this.controls.zoomSpeed = 0.5;

        this.startCamera();

        // log camera info on click
        this.el.addEventListener('click', function () {

            console.log('********** camera info **********');
            console.log(self.camera.position);
            console.log(self.controls.target);
            console.log('********** **********');

        });

    };

    // start a basic loop
    api.StandardScene.prototype.startLoop = function () {

        // the loop
        var self = this;
        var loop = function () {

            requestAnimationFrame(loop);

            self.renderer.render(self.scene, self.camera);

        };

        loop();

    };

    // set camera, and orbit controls
    api.StandardScene.prototype.startCamera = function (options) {

        var options = options || {};
        options.position = options.position || [-50, 50, -50];
        options.lookAt = options.lookAt || [0, 0, 0];

        //this.camera.position.set(options.[0],options.lookAt[1],options.lookAt[2]);
        this.camera.position.fromArray(options.position);
        this.camera.lookAt(options.lookAt[0], options.lookAt[1], options.lookAt[2]);
        this.controls.target.set(options.lookAt[0], options.lookAt[1], options.lookAt[2]);

    }

    return api;

}
    ());
