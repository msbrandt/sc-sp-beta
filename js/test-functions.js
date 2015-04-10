console.log('workubg');

// window.onload = init;

var ctx;
var bufferLoader;
var BUFFERS = {};
var BUFFERS_TO_LOAD = {
		clap: sc.tpTag+'/inc/808/clap-808.wav',
		cowbell: sc.tpTag+'/inc/808/cowbell-808.wav',
		crash: sc.tpTag+'/inc/808/crash-808.wav',
		hihat: sc.tpTag+'/inc/808/hihat-808.wav',
		kick: sc.tpTag+'/inc/808/kick-808.wav',
		openhat: sc.tpTag+'/inc/808/openhat-808.wav',
		perc: sc.tpTag+'/inc/808/perc-808.wav',
		snare: sc.tpTag+'/inc/808/snare-808.wav',
		tom: sc.tpTag+'/inc/808/tom-808.wav'
		// hat: sc.tpTag+'/inc/hat.wav',
		// irHall: sc.tpTag+'/inc/irHall.ogg' ,
		// kick: sc.tpTag+'/inc/kick2.wav',
		// snare: sc.tpTag+'/inc/snare.wav',
		// tin: sc.tpTag+'/inc/tin.wav',
		// kick1: sc.tpTag+'/inc/kick.wav',
		// kick2: sc.tpTag+'/inc/conv/kick-heavy.wav',
		// hat2: sc.tpTag+'/inc/conv/hihat-reso.wav',
		// hat3: sc.tpTag+'/inc/conv/hihat-ring.wav',
		// snare2: sc.tpTag+'/inc/conv/snare-dist01.wav',
		// snare3: sc.tpTag+'/inc/conv/snare-dist02.wav',
		// map: sc.tpTag+'/inc/Map.wav',
		// drum: sc.tpTag+'/inc/drums.wav',
		// echo: sc.tpTag+'/inc/echo-chords.wav',
		// lucky: sc.tpTag+'/inc/LuckyCharmesSkank.ogg',
		// all: sc.tpTag+'/inc/All.wav'
};

var rs = {playing:false};


function loadBuffers() {
  // Array-ify
  var names = [];
  var paths = [];
  for (var name in BUFFERS_TO_LOAD) {
    var path = BUFFERS_TO_LOAD[name];
    names.push(name);
    paths.push(path);
  }
  bufferLoader = new BufferLoader(ctx, paths, function(bufferList) {
    for (var i = 0; i < bufferList.length; i++) {
      var buffer = bufferList[i];
      var name = names[i];
      BUFFERS[name] = buffer;
    }
  });
  bufferLoader.load();
}

document.addEventListener('DOMContentLoaded', function() {
  try {
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    ctx = new AudioContext();
  }
  catch(e) {
    alert("Web Audio API is not supported in this browser");
  }
  loadBuffers();
});


rs.play = function(){
	function playSound(buffer, time){
		var src = ctx.createBufferSource();
		src.buffer = buffer;
		// src.thisCtx = start(0); 
		src.connect(ctx.destination);
		if(!src.start){
			src.start = src.noteOn;
		}
		// console.log(src);
		src.start(time);
	// return {
	// 		source: src
	// 	};
	}

	var clap = BUFFERS.clap;
	var cb = BUFFERS.cowbell;
	var crash = BUFFERS.crash;
	var hihat = BUFFERS.hihat;
	var kick = BUFFERS.kick;
	var openhat = BUFFERS.openhat;
	var perc = BUFFERS.perc;
	var snare = BUFFERS.snare;
	var tom = BUFFERS.tom;


	// var kick = BUFFERS.kick;
	// var snare = BUFFERS.snare;
	// var hihat = BUFFERS.hat;
	
	// var hihatRe = BUFFERS.hat2;
	// var hihatRi = BUFFERS.hat3;
	
	// var tin = BUFFERS.tin;
	// var ir = BUFFERS.irHall;
	// var k = BUFFERS.kick1;

	// var k2 = BUFFERS.kick2;
	// var s2 = BUFFERS.snare2;
	// var s3 = BUFFERS.snare3;

	var startTime = ctx.currentTime + 0.100;
	var tempo = 80;
	var eightNoteTime = (60 / tempo) / 2;

	for(var bar = 0; bar < 100; bar++){
		var time = startTime + bar * 8 * eightNoteTime;
		playSound(kick, time);
		playSound(kick, time + 4 * eightNoteTime);
		// playSound(clap, time * eightNoteTime);


		playSound(snare, time + 2 * eightNoteTime);
		playSound(snare, time + 6 * eightNoteTime);

		// playSound(tin, time + 7 * eightNoteTime);

		playSound(openhat, time + 8 * eightNoteTime);
		playSound(tom, time + 12 * eightNoteTime);
		// playSound(crash, time + 20 * eightNoteTime);
		
		// for(var i = 0; i<3; i++){
		// 	playSound(clap, time + i * eightNoteTime);

		// }
		for(var i = 0; i<8; i++){
			playSound(hihat, time + i * eightNoteTime);

		}
		for(var i = 0; i<4; i++){
			playSound(perc, time + i * eightNoteTime);
		}
	}

}
rs.stop = function(){
	// console.log(this);
	// this.playing = false;
}
rs.toggle = function(){
	this.playing ? this.stop() : this.play();
	this.playing = !this.playing;
}

var crossFade = {playing:false};

crossFade.play = function(){
	this.ctl1 = createSource(BUFFERS.drum);
	this.ctl2 = createSource(BUFFERS.echo);

	this.ctl1.gainNode.gain.value = 0;
	if(!this.ctl1.source.start){
		this.ctl1.source.noteOn(0);
		this.ctl2.source.noteOn(0);
	}else{
		this.ctl1.source.start(0);
		this.ctl2.source.start(0);

	}

	function createSource(buffer){
		var source = ctx.createBufferSource();
		var gainNode = ctx.createGain ? ctx.createGain() : ctx.createGainNode();
		source.buffer = buffer;

		source.loop = true;
		source.connect(gainNode);
		gainNode.connect(ctx.destination);

		return {
			source: source,
			gainNode: gainNode
		};
	}
	// crossFade.play();
};
crossFade.stop = function(){
	if(!this.ctl1.source.stop){
		this.ctl1.source.noteOff(0);
		this.ctl2.source.noteOff(0);
	}else{
		this.ctl1.source.stop(0);
		this.ctl2.source.stop(0);
	}
}
crossFade.cross = function(el){
	// console.log(this);
	var x = parseInt(el.value) / parseInt(el.max);

	var gain1 = Math.cos(x * 0.5*Math.PI);
	var gain2 = Math.cos((1.0 - x) * 0.5*Math.PI);

	this.ctl1.gainNode.gain.value = gain1;
	this.ctl2.gainNode.gain.value = gain2;
}
crossFade.toggle = function(){
	this.playing ? this.stop() : this.play();
	this.playing = !this.playing;
}
// function init(){
// 	window.AudioContext = window.AudioContext || window.webkitAudioContext;
// 	ctx = new AudioContext;

// 	bufferLoader = new BufferLoader(
// 		ctx,
// 		[
// 			sc.tpTag+'/inc/All.wav',
// 			sc.tpTag+'/inc/Map.wav',
// 			sc.tpTag+'/inc/All.wav',
// 			sc.tpTag+'/inc/Map.wav',
// 		],
// 		finishedLoading
// 		);
// 	bufferLoader.load();
// }




// function finishedLoading(bufferList){
// 	var src1 = ctx.createBufferSource();
// 	var src2 = ctx.createBufferSource();

// 	src1.buffer = bufferList[0];
// 	src2.buffer = bufferList[1];

// 	src1.connect(ctx.destination);
// 	src2.connect(ctx.destination);

// 	src1.start(0);
// 	src2.start(0);
// }

function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}