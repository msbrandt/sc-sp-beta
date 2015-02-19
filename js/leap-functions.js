jQuery(function($){

	var stageW = 1200,
		stageH = 600;

	var stage = new PIXI.Stage(0xFFFFFF);
	var render = new PIXI.autoDetectRenderer(stageW, stageH);

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
						// stage.removeChild();
						// console.log('swipe');
						// render.view;

					};

				})
			}
			return render.render(stage);
		}

		space.children.forEach(function(child){
			child.x -= 0.2 * delta; 
			if(child.getBounds().contains(rocketship.x, rocketship.y)){
				collided = true;
			}
			if(child.x < -child.width){
				space.removeChild(child);
			}
		});

		var last = space.children[space.children.length - 1];

		if(space.children.length == 0 || last.x < (stageW - 250)){
			var comit = PIXI.Sprite.fromImage(fp.path+"/img/asteroid1.png");
			comit.y = Math.floor(Math.random() * (stageH - 100));
			comit.x = stageW;
			space.addChild(comit);
		}

		if(frame.pointables.length > 0){
	        var pos = frame.pointables[0].stabilizedTipPosition;
	        var normPos = frame.interactionBox.normalizePoint(pos, true);

	        // Move the rocket to the normalized finger position
	        rocketship.x = stageW * normPos[0];
	        rocketship.y = stageH * (1 - normPos[1]); 
		}

		if(frame.gestures.length > 0){
			frame.gestures.forEach(function(gesture){
				if(gesture.type == "keyTap"){
					var lazer = new PIXI.Graphics();
					lazer.beginFill(0xff0000)
					lazer.drawRect(30, 10, 20, 20);
					lazer.endFill();

					stage.addChild(lazer);
				}
			})
		}

	render.render(stage);

	});

});
