
// "day_matrix" work for visual_analytics
getData.get(function (data) {

    // using getdata.js to get the json data
    var days = data.days,

    // using three_shell.js
    shell = new threeShell.StandardScene();


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

                    materials.standard());

            // box.position.set(i* 2, h/2, i *2);
			
			var row = Math.floor(i/28),
			col = i % 28;
			
			box.position.set(row*2,h/2,col*2);

            // and the box to the scene
            shell.scene.add(box);

        }

    });

    // start the camera here
    shell.startCamera({

        position: [50,50,50]

    });

    // can just call the startLoop method
    shell.startLoop();

});
