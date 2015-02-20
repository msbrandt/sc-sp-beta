jQuery(function($){

	var stageW = 1200,
		stageH = 600;

	var stage = new PIXI.Stage(0xFFFFFF);
	var render = new PIXI.autoDetectRenderer(stageW, stageH);
    var renderer = PIXI.autoDetectRenderer(window.screen.availWidth -75 ,window.screen.availHeight - 250);

	document.getElementById('game').appendChild(render.view);

	var spacebg = PIXI.Texture.fromImage(fp.path+"/img/sapcebg.png");
	var space = new PIXI.TilingSprite(spacebg, stageW, stageH);
	stage.addChild(space);

	var rocketship = PIXI.Sprite.fromImage(fp.path+"/img/spaceship.png");
	stage.addChild(rocketship);

	var collided = false;
	var timer = window.performance.now();

	var options = {
		enableGestures: true,
		frameEventName: "animationFrame"
	};
	var swap = 0;
	var isFiring = false;
	var comets = [];
	var lazers = [];
	var controller = Leap.loop(options, function(frame){
		var now = window.performance.now();
		var delta = Math.min(now - timer, 100);
		timer = now;

		space.tilePosition.x -= 0.2 * delta;

		if(collided){
			var caption = new PIXI.Text("GAME OVER", {
				font: "50px Helvetica", fill: "red"
			});
			caption.x = (stageW / 2) - (caption.width / 2);
			caption.y = stageH / 2

			stage.addChild(caption);
			if(frame.gestures.length > 0){
				frame.gestures.forEach(function(gesture){
					if(gesture.type = "swipe"){
						//TODO: reset game wiith swipe gesture
					};

				})
			}
			return render.render(stage);
		}
		if(frame.gestures.length > 0){
			frame.gestures.forEach(function(gesture){
				if(gesture.type == "keyTap"){
					requestAnimFrame( lazer_animate );
					isFiring = true;
				}
		})
		}

		space.children.forEach(function(child){
			child.x -= 0.2 * delta; 
			if(child.getBounds().contains(rocketship.x, rocketship.y)){
				collided = true;
			}
			if(isFiring){
				if(child.getBounds().contains(com))
			}
			if(child.x < -child.width){
				space.removeChild(child);
			}
		});

		// console.log(space.children);
		//TODO: Added Aliens that also shoot back at you 

		var last = space.children[space.children.length - 1];
		if(space.children.length == 0 || last.x < (stageW - 250)){

			switch (swap){
				case 1:
					var img_src = fp.path+"/img/asteroid2.png";
					break;
				case 2:
					var img_src = fp.path+"/img/asteroid3.png";
					break;

				case 3:
					var img_src = fp.path+"/img/asteroid4.png";
					swap = 0;
					break;

				default:
					var img_src = fp.path+"/img/asteroid1.png"

			}
			var comet = PIXI.Sprite.fromImage(img_src);

			comet.y = Math.floor(Math.random() * (stageH - 100));
			comet.x = stageW;
			comets.push(comet);

			space.addChild(comet);
			swap++;
		}

		if(frame.pointables.length > 0){
	        var pos = frame.pointables[0].stabilizedTipPosition;
	        var normPos = frame.interactionBox.normalizePoint(pos, true);

	        // Move the rocket to the normalized finger position
	        rocketship.x = stageW * normPos[0];
	        rocketship.y = stageH * (1 - normPos[1]); 
		}


		function lazer_animate(){
			if(isFiring){
				var lazer = new PIXI.Sprite(PIXI.Texture.fromImage(fp.path+"/img/lazer.jpg"));
				var pos = rocketship.position;
				lazer.anchor.x = 0.5;
				lazer.anchor.y = 0.5;
				lazer.position.x = pos.x + 90;
				lazer.position.y = pos.y + 40;
				lazers.push(lazer);
				stage.addChild(lazer);
				console.log(comets[0].position);
				
				console.log('shot fired');
				isFiring = false;
			}
			for(var x = 0; x < lazers.length; x++){
				var the_lazer = lazers[x];
				the_lazer.position.x += 5;
				var lazer_pos = the_lazer.getBounds(); 

				for(var i = 0; i < comets.length; i++){
					// if(lazer_pos.contains(comets[i].position.x, comets[i].position.y)){
					// 	console.log('its a hit');
					// }
				}
				// if(the_lazer.getBounds().contains(comit.x, comit.y)){
				// 	console.log('hit');
				// }

			}
			requestAnimFrame( lazer_animate );

		}

	render.render(stage);

	});

});
