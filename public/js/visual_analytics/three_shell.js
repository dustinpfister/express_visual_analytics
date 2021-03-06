threeShell = (function () {

    var api = {};

    // set the container to full screen
    var containerSetFull = function (container) {

        var sty = this.el.style;

        sty.position = 'fixed';
        sty.zIndex = '1100';
        sty.left = '0px';
        sty.top = '0px';
        sty.width = window.innerWidth + 'px';
        sty.height = window.innerHeight + 'px';

        sty.background = '#ffffff';

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        console.log(window.innerWidth);

        console.log('full');

    };

    // set the container in the page
    var containerSetNotFull = function (container) {

        var sty = this.el.style,

        w = this.aspectLevel * this.aspect,
        h = this.aspectLevel;

        sty.position = 'static';
        sty.marginRight = 'auto';
        sty.marginLeft = 'auto';
        sty.width = w + 'px';
        sty.height = h + 'px';
        sty.background = '#0000ff';

        this.renderer.setSize(w, h);

        console.log('not full');

    };

    // add in ui elements to the scene
    var addUI = function () {

        var fsBox = new THREE.Mesh(
                new THREE.BoxGeometry(2, 2, 2),
                new THREE.MeshDepthMaterial({

                    transparent: true,
                    opacity: .5

                }));

        fsBox.position.set(-18, 13, -20);
        this.camera.add(fsBox);

        console.log(this.camera);

    }

    api.StandardScene = function () {

        this.fullScreen = false;

        // a scene is needed to place objects in
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1f1f1f);

        // I will need an camera to look at objects in the scene
        this.aspect = 32 / 24;
        this.aspectLevel = 480;

        this.camera = new THREE.PerspectiveCamera(75, this.aspect, 1, 10000);

        var light = new THREE.PointLight();
        this.camera.add(light);
        this.scene.add(this.camera);

        // renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.aspect * this.aspectLevel, this.aspectLevel);

        // append
        this.el = $('#view').get(0);
        this.el.appendChild(this.renderer.domElement);

        // resize
        var self = this;
        var onResize = function () {

            // to keep it at aspect
            //var w = window.innerHeight * aspect,
            // h = window.innerHeight;

            // set fix position of dom element, and scale
            //self.el.style.position = 'fixed';
            //self.el.style.left = Number((window.innerWidth - w) / 2) + 'px';
            //self.el.style.top = '0px';
            //self.el.style.width = w + 'px';
            //self.el.style.height = h + 'px';

        };
        onResize();
        window.addEventListener('resize', onResize);

        // Orbit controls
        this.controls = new THREE.OrbitControls(this.camera, this.el);
        this.controls.panSpeed = 0.5;
        this.controls.rotateSpeed = 0.5;
        this.controls.zoomSpeed = 1;
        this.controls.screenSpacePanning = true

            addUI.call(this);
        this.startCamera();

        // log camera info on click
        this.el.addEventListener('click', function () {

            console.log('********** camera info **********');
            console.log(
                'position : [' + self.camera.position.toArray() + '],' +
                'lookAt : [' + self.controls.target.toArray() + ']');

            console.log('********** **********');

        });

        // toggle full screen
        this.el.addEventListener('click', function (e) {

            var box = e.target.getBoundingClientRect(),
            x = e.clientX - box.left,
            y = e.clientY - box.top;

            if (x <= 75 && y <= 75) {

                self.fullScreen = !self.fullScreen;

                if (self.fullScreen) {

                    containerSetFull.call(self, e);

                } else {

                    containerSetNotFull.call(self, e);

                }

            }

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
