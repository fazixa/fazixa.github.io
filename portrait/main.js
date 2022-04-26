// const TWEEN = require("./tween");

window.onload = function() {
	
	var moving = false;
	var x_initial = 0;
	var y_initial = 0;
	var motion_x_initial = 0;
	var motion_y_initial = 0;
	var damping_factor = 10;
	var current_frame = 1;
	var animation_frame = 1;
	var counter = 0;
	var loaded = false;
	var touch_event = null;
	var max_rotation = 25;

	var container = document.getElementById('container');
	var scene = document.getElementById('shadowbox');
	var background = document.getElementById('background');
	var shadow = document.getElementById('shadow');
	var floaties = document.getElementById('floaties');
	var floaties2 = document.getElementById('floaties2');
	// var box_hadow = document.getElementById('box-shadow');
	var mask = document.getElementById('mask');
	var sword = document.getElementById('sword');
	var canvasRect = background.getBoundingClientRect();


	function fillScreen() {
		// set size to fill screen
		var window_width = window.innerWidth;
		var window_height = window.innerHeight;
		var size = Math.min(window_width, window_height);
		var new_width = window_height * 0.75;
		var new_height = window_height;

		if (window_width < (window_height * 0.75)) {
			new_width = window_width;
			new_height = window_width * (4/3);
		}

		container.style.width = window_width + 'px';
		container.style.height = window_height + 'px';

		scene.style.width = new_width + 'px';
		scene.style.height = new_height + 'px';
	}

	fillScreen();
	window.onresize = function() {
		fillScreen();
	};
	window.onorientationchange = function() {
		fillScreen();
		motion_x_initial = undefined;
		motion_y_initial = undefined;
	};

	var motion_offset = {
		x: 0,
		y: 0
	};

	var offset = {
		x: 0,
		y: 0
	};

	var background_1 = new Image();
	var mask_1 = new Image();
	var mask_1_dark = new Image();
	var shadow_1 = new Image();
	var floaties_1 = new Image();
	var sword_1 = new Image();

	var layers = [
		{
			'image': background_1,
			'src': "./images/1.png",
			'loaded': false
		},{
			'image': mask_1,
			'src': "./images/mask2.png",
			'loaded': false
		}
		// ,{
		// 	'image': shadow_1,
		// 	'src': "./images/shadow.png",
		// 	'loaded': false
		// }
		,
		{
			'image': floaties_1,
			'src': "./images/stroke.png",
			'loaded': false
		},{
			'image': sword_1,
			'src': "./images/3.png",
			'loaded': false
		}
	];

	layers.forEach(function(layer, index) {
		layer.image.onload = function () {
			layer.loaded = true;
			counter += 1;
			if (counter == layers.length) {
				loaded = true;

				var loading_mask = document.getElementById('loading');
				loading_mask.style.opacity = 0;
				loading_mask.style.visibility = 'hidden';

				requestAnimationFrame(transformScene);
			}
		}
		layer.image.src = layer.src;
	});



	scene.onmousemove = function(event) {
		event.preventDefault();
	};

	window.ontouchmove = function(event) {
		event.preventDefault();
	};

	// scene.ontouchstart = function(event) {
	// 	console.log('touch');
	// 	moving = true;
	// 	x_initial = event.touches[0].clientX;
	// 	y_initial = event.touches[0].clientY;
	// 	background.style.transition = 'none';
	// 	shadow.style.transition = 'none';
	// 	floaties.style.transition = 'none';
	// 	sword.style.transition = 'none';
	// 	mask.style.transition = 'none';
	// }

	scene.addEventListener('touchstart', function(event) {
		moving = true;
		x_initial = event.touches[0].clientX;
		y_initial = event.touches[0].clientY;
		background.style.transition = 'none';
		shadow.style.transition = 'none';
		floaties.style.transition = 'none';
		floaties2.style.transition = 'none';
		sword.style.transition = 'none';
		mask.style.transition = 'none';
	});



	scene.onmousemove = function(event) {
		moving = true;
		// x_initial = event.clientX;
		// y_initial = event.clientY;
		x_initial = canvasRect.left+(canvasRect.right-canvasRect.left)/2;
		y_initial = canvasRect.top+(canvasRect.bottom-canvasRect.top)/2;
		background.style.transition = 'none';
		shadow.style.transition = 'none';
		floaties.style.transition = 'none';
		floaties2.style.transition = 'none';
		sword.style.transition = 'none';
		mask.style.transition = 'none';
	};



	window.onmousemove = function(event) {
		event.preventDefault();
		var x_current = event.clientX;
		var y_current = event.clientY;
		document.getElementById('cr').style.width='20px'

	
	  
		gsap.set(".cursor2", {
		  x: x_current,
		  y: y_current });

		if (moving === true) {
			offset.x = (x_current - x_initial) / damping_factor;
			offset.y = (y_current - y_initial) / damping_factor;
		}
	
	};



	window.onmouseout = function(event){
		console.log(",,,,,,,,,,,,,,,,,,,,");
		document.getElementById('cr').style.width='0px'
	}



	scene.addEventListener('touchmove', function(event) {
		event.preventDefault();
		var x_current = event.touches[0].clientX;
		var y_current = event.touches[0].clientY;
		touch_event = event;

		if (moving === true) {
			offset.x = (x_current - x_initial) / damping_factor;
			offset.y = (y_current - y_initial) / damping_factor;
		}
	});

	// scene.ontouchmove = function(event) {
	// 	event.preventDefault();
	// 	var x_current = event.touches[0].clientX;
	// 	var y_current = event.touches[0].clientY;
	// 	touch_event = event;

	// 	if (moving === true) {
	// 		offset.x = (x_current - x_initial) / damping_factor;
	// 		offset.y = (y_current - y_initial) / damping_factor;
	// 	}
	// }

	var endGesture = function(event) {
		touch_event = null;
		moving = false;
		// x_initial = 0;
		// y_initial = 0;
		// offset.x = 0;
		// offset.y = 0;
		TWEEN.removeAll();
		var pointer_tween = new TWEEN.Tween(offset).to({x:0, y:0}, 300).easing(TWEEN.Easing.Back.Out).start();
		

		background.style.transition = 'transform 0.1s ease';
		shadow.style.transition = 'transform 0.1s ease';
		floaties.style.transition = 'transform 0.1s ease';
		floaties2.style.transition = 'transform 0.1s ease';
		sword.style.transition = 'transform 0.1s ease';
		mask.style.transition = 'transform 0.1s ease';
	};
	scene.addEventListener('mouseout', endGesture, false);
	document.addEventListener('touchend', endGesture, false);
	document.addEventListener('touchcancel', endGesture, false);
	window.addEventListener('touchend', endGesture, false);
	window.addEventListener('touchcancel', endGesture, false);
	scene.addEventListener('touchend', endGesture, false);
	scene.addEventListener('touchcancel', endGesture, false);

	var translate_mode = true; // Chrome does dumb things with blend modes and 3d transforms. This is a hacky fix.

	if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
		translate_mode = false;
	} else {
		shadowbox.style.transformStyle = 'flat';
	}

	transformScene = function() {
		TWEEN.update();

		if (translate_mode === true) {
			// background.style.transition = 'none';
			// shadow.style.transition = 'none';
			// floaties.style.transition = 'none';
			// mask.style.transition = 'none';
			// sword.style.transition = 'none';

			// shadow.style.transition = 'none';
			floaties.style.transform =
				'translateX(' + (1 * (offset.x + motion_offset.x)) + 'px) translateY(' + (1 * (offset.y + motion_offset.y)) + 'px) scale(1.1)';
			floaties2.style.transform =
				'translateX(' + (1.7 * (offset.x + motion_offset.x)) + 'px) translateY(' + (1.7 * (offset.y + motion_offset.y)) + 'px) scale(1.1)';
			mask.style.transform =
				'translateX(' + (0.3 * (offset.x + motion_offset.x)) + 'px) translateY(' + (0.3* (offset.y + motion_offset.y)) + 'px) scale(1.02)';
			// box_hadow.style.transform =
			// 	'translateX(' + (0.3 * (offset.x + motion_offset.x)) + 'px) translateY(' + (0.3* (offset.y + motion_offset.y)) + 'px) scale(0.8)';
			sword.style.transform = 'translateX(' + (1.2 * (offset.x + motion_offset.x)) + 'px) translateY(' + (1.2 * (offset.y + motion_offset.y)) + 'px) scale(0.99)';
		}

		scene.style.transition = 'none';
		scene.style.transform = 'rotateX(' + (-offset.y + -motion_offset.y) + 'deg) rotateY(' + (offset.x + motion_offset.x) + 'deg)';

		if (moving === false) {
			scene.style.transition = '0.1s ease';
		}

		var new_animation_frame = Math.ceil(current_frame / 10);
		if (new_animation_frame !== animation_frame) {
			animation_frame = new_animation_frame;
			// shadow.style.backgroundImage = "url('images/shadow_" + animation_frame + ".png')"
			// floaties.style.backgroundImage = "url('images/floaties_" + animation_frame + ".png')"
			// sword.style.backgroundImage = "url('images/sword_" + animation_frame + ".png')"
			var scene_width = scene.offsetWidth;
			// var background_position = -((animation_frame - 1) * scene_width);
			background_position = (100/7) * ((animation_frame - 1));
			floaties.style.backgroundPosition = background_position + '% 50%';
			// shadow.style.backgroundPosition = background_position + '% 50%';
			// sword.style.backgroundPosition = background_position + '% 50%';
		}

		if (touch_event && touch_event.touches.length === 0) {
			alert('no touching!');
			endGesture();
		}

		current_frame += 1;
		if (current_frame > 80) {
			current_frame = 1;
		}

		requestAnimationFrame(transformScene);
	};

	var motion_button = document.querySelector('.allow-motion-button');

	

	// Control rotation based on rotation rate
	var alpha = 0;
	var beta = 0;
	var total_x = 0;
	var total_y = 0;
	var max_offset = 2000;

	window.addEventListener("devicemotion", function(e) {
		motion_button.classList.remove('visible');
	   
	    alpha = e.rotationRate.alpha;
	    beta = e.rotationRate.beta;
	    
	    total_x += beta;
	    total_y += alpha;

	    if (Math.abs(total_x) > max_offset) {
	        total_x = max_offset * Math.sign(total_x);
	    }
	    if (Math.abs(total_y) > max_offset) {
	        total_y = max_offset * Math.sign(total_y);
	    }
	    
	    var x_offset = total_y / 65;
	    var y_offset = -total_x / 65;

	    motion_offset.x = x_offset;
	    motion_offset.y = y_offset;

	    if (window.orientation === 90) {
	    	motion_offset.x = x_offset;
	    	motion_offset.y = y_offset;
	    } else if (window.orientation === -90) {
	    	motion_offset.x = -x_offset;
	    	motion_offset.y = -y_offset;
	    } else if (window.orientation === 180) {
	    	motion_offset.x = y_offset;
	    	motion_offset.y = -x_offset;
	    } else if (window.orientation === 0) {
	    	motion_offset.x = -y_offset;
	    	motion_offset.y = x_offset;
	    }
	});
	// end rotation rate control

	window.addEventListener('orientationchange', function(event) {
		// motion_initial.x = 0;
		// motion_initial.y = 0;

		window.setTimeout(function() {
			total_x = 0;
			total_y = 0;
			background_position = 0;
		}, 250);
	});

	if (window.DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) {
		motion_button.classList.add('visible');
	}

	function enableMotion() {
		DeviceOrientationEvent.requestPermission();
		motion_button.classList.remove('visible');
	}

};


