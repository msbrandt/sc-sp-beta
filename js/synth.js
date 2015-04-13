var ctx;
var BUFFERS = {};
var SOURCES = [];
var synth = {playing:false, FREQ_MUL: 7000, QUAL_MUL: 30};
var synthBtns = document.getElementsByClassName('synth-btns');
var channelBtns = document.getElementsByClassName('channel-btns');
var pads = document.getElementsByClassName('pad');
var playBtn = document.querySelector('#play-btn');
// var tempoInp = document.getElementById('tempo');
var tempoDisply = document.getElementById('tempo-val');
var filterInp = document.getElementById('filter-inp');
var filterDis = document.getElementById('filter-val');


// var tempo = tempoInp.value;
// tempoDisply.innerHTML = tempo;
// tempoInp.addEventListener('input', changeTempo);
var filters = [
  'lowpass',
  'highpass',
  'bandpass',
  'lowshelf',
  'highshelf',
  'peaking',
  'notch',
  'allpass'
];
changeFilterDis();

var BUFFERS_TO_LOAD = {
		clap: sc.tpTag+'/inc/808/clap-808.wav',
		cowbell: sc.tpTag+'/inc/808/cowbell-808.wav',
		crash: sc.tpTag+'/inc/808/crash-808.wav',
		hihat: sc.tpTag+'/inc/808/hihat-808.wav',
		kick: sc.tpTag+'/inc/808/kick-808.wav',
		openhat: sc.tpTag+'/inc/808/openhat-808.wav',
		perc: sc.tpTag+'/inc/808/perc-808.wav',
		snare: sc.tpTag+'/inc/808/snare-808.wav',
    tom: sc.tpTag+'/inc/808/tom-808.wav',
		test: sc.tpTag+'/inc/conv/snare-dist01.wav'
    // test2: sc.tpTag+'/inc/Map.wav'
	};

// function playSound(buffer, time){
//   var thisSrc = createSource(buffer);
//   if(!thisSrc.src.start){
//     thisSrc.src.start = src.noteOn;
//   }
//   thisSrc.src.start(time);
  
// }

// function createSource(buffer){
//   var src = ctx.createBufferSource();
//   var filter = ctx.createBiquadFilter();
//   var gainNode = ctx.createGain ? ctx.createGain() : ctx.createGainNode();
//   src.buffer = buffer;
//   filter.type = (typeof filter.type === 'string') ? 'lowpass' : 0;
//   filter.frequency.value = 5000;
//   src.connect(filter);
//   filter.connect(gainNode);
//   gainNode.connect(ctx.destination);

//   return {
//     src: src,
//     gainNode: gainNode
//   };
// }
function trackTime(){
  var startTime = ctx.currentTime + 0.100;
  var tempo = 80;
  var en = (60 / tempo) / 2;

  for(var bar = 0; bar < 100; bar++){
    var time = startTime + bar * 8 * en;
    return time;
  }
}
synth.loop = function(el){
  if(el.dataset.isactive == 0){
    el.dataset.isactive = 1;
  }else{
    el.dataset.isactive = 0;

  }
  // el.dataset.isactive ? console.log('yes') : console.log('no');
}
synth.playPads = function(el){
  var sample = String(el.dataset.sample);
  var useSrc = ctx.createBufferSource();
  var x = trackTime();
  // console.log(x);
  var tl = document.querySelector('#toogle-loop');
  useSrc.buffer = BUFFERS[sample];
  useSrc.connect(ctx.destination);
  if(tl.dataset.isactive == 1){
    useSrc.loop = true;

  }
  if(!useSrc.start){
    useSrc.start = useSrc.noteOn;
  }

  useSrc.start(0);
  this.src = useSrc;

}
synth.play = function(){
  if(!ctx.createGain){
    ctx.createGain = ctx.createGainNode;
  }
  this.gainNode = ctx.createGain();
  
  var src = ctx.createBufferSource();
  
  src.buffer = BUFFERS.test2;

  

  this.filter = ctx.createBiquadFilter();
  this.filter.type = 'lowpass';
  this.filter.frequency.value = 440; 
  src.connect(this.filter);
  this.filter.connect(this.gainNode);

  this.gainNode.connect(ctx.destination);

  src.loop = true;

  if(!src.start){
    src.start = src.noteOn;
  }
  src.start(0);
  this.src = src;
  playBtn.dataset.isactive = 1;

  // var clap = BUFFERS.clap;
  // var cb = BUFFERS.cowbell;
  // var crash = BUFFERS.crash;
  // var hihat = BUFFERS.hihat;
  // var kick = BUFFERS.kick;
  // var openhat = BUFFERS.openhat;
  // var perc = BUFFERS.perc;
  // var snare = BUFFERS.snare;
  // var tom = BUFFERS.tom; 
  // var ent = (60 / tempo) / 2;


 //  var startTime = ctx.currentTime + 0.100;

 //  var time = startTime + bar * 8 * ent;
 //  var newTime = time;

 //  tempoInp.addEventListener('input', function(){
 //    tempoDisply.innerHTML = this.value;
 //    var newent = (60 / this.value) / 2;
 //    newTime = startTime + bar * 8 * newent; 
 //  });

	// var eightNoteTime = (60 / tempo) / 2;

// Loop to play sound
	// for(var bar = 0; bar < 100; bar++){
	// 	var time = startTime + bar * 8 * ent;
 //    // playSound(kick, time);
 //    // playSound(kick, time + 4 * eightNoteTime);
 //    // playSound(snare, time + 2 * eightNoteTime);
 //    // playSound(snare, time + 6 * eightNoteTime);
 //    // playSound(openhat, time + 8 * eightNoteTime);
 //    // playSound(tom, time + 12 * eightNoteTime);

 //    for(var i = 0; i<4; i++){
 //      // playSound(perc, time + i * eightNoteTime);
 //    }    
		
	// 	for(var i = 0; i<8; i++){

	// 		// playSound(hihat, time + i * ent);

	// 	}
	// }
	

}

synth.stop = function(){
  playBtn.dataset.isactive = 0;

  if(!this.src.stop){
    this.src.stop = src.noteOff;
  }  
  this.src.stop();
}

synth.changeVolume = function(el){
  var volume = el.value;
  var frac = parseInt(volume) / parseInt(el.max);
  this.gainNode.gain.value = frac * frac;
}

synth.changeFX = function(el){
  var minVal = 40;
  var maxVal = ctx.sampleRate / 2;

  var numberOfOctaves = Math.log(maxVal / minVal) / Math.LN2;
  var multiplier = Math.pow(2, numberOfOctaves * (el.value - 1.0));

  // console.log(this);

  this.filter.frequency.value = maxVal * multiplier;
}
synth.changeEQ = function(el){
  this.filter.Q.value = el.value * this.QUAL_MUL;
}
// synth.changeTempo = function(el){
//   tempo = el.value;
//   tempoDisply.innerHTML = tempo;
// }
function getLoop(){
  var is_active = this.dataset.isactive;
  return is_active;
}
function getFilter(){
  var newFilter = filterInp.value;
  changeFilterDis(); 

  return filters[newFilter];
}

function changeFilterDis(){
  var f = filterInp.value;
  filterDis.innerHTML = filters[f]; 

  // console.log(filters[f]);
}
//*****************Loading functions.....DO NOT TOUCH!****************************************
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