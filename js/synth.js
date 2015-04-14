var ctx;
var BUFFERS = {};
var SOURCES = [];
var playSrc = [];
var synth = {playing:false, FREQ_MUL: 7000, QUAL_MUL: 30};
var synthBtns = document.getElementsByClassName('synth-btns');
var pads = document.getElementsByClassName('pad');
var playBtn = document.querySelector('#play-btn');
var tempoInp = document.getElementById('tempo');
var tempoDisply = document.getElementById('tempo-val');
var filterInp = document.getElementById('filter-inp');
var filterDis = document.getElementById('filter-val');

var tempoInt = tempoInp.value;
tempoDisply.innerHTML = tempoInt;
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
  eight08: {
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
  },
  aco: {
    crash: sc.tpTag+'/inc/aco/c-crash-acoustic.wav',
    hithat1: sc.tpTag+'/inc/aco/c-hihat-acoustic01.wav',
    hithat2: sc.tpTag+'/inc/aco/c-hihat-acoustic02.wav',
    kick1: sc.tpTag+'/inc/aco/c-kick-acoustic01.wav',
    kick2: sc.tpTag+'/inc/aco/c-kick-acoustic02.wav',
    kick3: sc.tpTag+'/inc/aco/c-kick-big.wav',
    openhat: sc.tpTag+'/inc/aco/c-openhat-acoustic01.wav',
    ride: sc.tpTag+'/inc/aco/c-ride-acoustic01.wav',
    snare1: sc.tpTag+'/inc/aco/c-snare-acoustic01.wav',
    snare2: sc.tpTag+'/inc/aco/c-snare-acoustic02.wav',
    tom1: sc.tpTag+'/inc/aco/c-tom-acoustic01.wav',
    tom2: sc.tpTag+'/inc/aco/c-tom-acoustic02.wav'
  }

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

synth.loop = function(el){
  if(el.dataset.isactive == 0){
    //Turn Loop on
    el.dataset.isactive = 1;
    // setInterval(function(){
      // console.log(SOURCES);
      // barLoop(true);
    // }, (60 / 80) /2);
    
  }else{
    //Turn Loop Off

    el.dataset.isactive = 0;
        // console.log(SOURCES);
    // console.log(this);
    for(var x=0; x<SOURCES.length; x++){
      SOURCES[x].stop();
    }
    for(var i=0; i<pads.length; i++){
      if(pads[i].dataset.active == 4){
        var chg = pads[i];
        chg.dataset.active = 3;

      }

    }
    // barLoop(false);

  }

  // el.dataset.isactive ? console.log('yes') : console.log('no');
}
var blaray = [];
function playLoop(buffer, time){
      var theSrc = ctx.createBufferSource();

      theSrc.buffer = BUFFERS[buffer];

      theSrc.connect(ctx.destination);
      SOURCES.push(theSrc);
      
      if(!theSrc.start){
        theSrc.start = theSrc.noteOn;
      }
      theSrc.start(time);
}
function getChannel(){
    var channels = document.getElementsByClassName('channel-btns');
   for (var i=0; i<channels.length; i++) {
      if(channels[i].dataset.channel == 1){
        var useChannel = channels[i].dataset.octive;

      }
    }; 
    return useChannel; 
}
function loopSound(sample){
    playSrc.push(sample);
    var ch = getChannel();
    console.log(BUFFERS);

    var st = ctx.currentTime + 0.100;
    var t = tempoInp.value;
    var ent = (60 / t) / 2;
    
    for(var bar = 0; bar < 100; bar++){
      var time = st + bar * 8 * ent;
      if(ch == 1){
        for(var i = 0; i<1; i++){
          playLoop(sample, time + i * ent);
        }
      }else if(ch == 2){
        for(var i = 0; i<2; i++){
          playLoop(sample, time + i * ent);
        }
      }else if(ch == 3){
        for(var i = 0; i<3; i++){
          playLoop(sample, time + i * ent);
        }        
      }else if(ch == 4){
        for(var i = 0; i<4; i++){
          playLoop(sample, time + i * ent);
        }
      }else if(ch == 5){
        for(var i = 4; i<5; i++){
          playLoop(sample, time + i * ent);
        }
      }else if(ch == 6){
        for(var i = 5; i<6; i++){
          playLoop(sample, time + i * ent);
        }
      }else if(ch == 7){
        for(var i = 6; i<7; i++){
          playLoop(sample, time + i * ent);
        }
      }else if(ch == 8){
        for(var i = 7; i<8; i++){
          playLoop(sample, time + i * ent);
        }
      }
      // playLoop(sample, time + 8 * ent);
      
      // for(var i = 0; i<8; i++){
      //   playLoop(sample, time + i * ent);
      //   // console.log((time + i * ent));

      // }

    }
  
}

synth.playPads = function(el){
  var sample = String(el.dataset.sample);
  var tl = document.querySelector('#toogle-loop');

  // el.dataset.active = 1;
  if(tl.dataset.isactive == 1){
    if(el.dataset.active == 4){
      el.dataset.active = 3;

    }else if(el.dataset.active == 3){
      //Bar Loop code goes here!
      el.dataset.active = 4;
      // this.src = useSrc;
      loopSound(sample);
      // console.log(this);
    }
  }else{
      //Single play music goes here!
      var useSrc = ctx.createBufferSource();

      useSrc.buffer = BUFFERS[sample];

      useSrc.connect(ctx.destination);

      if(!useSrc.start){
        useSrc.start = useSrc.noteOn;
      }

      useSrc.start(0);
      this.src = useSrc;
  }


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
synth.changeTempo = function(el){
  tempo = el.value;
  tempoDisply.innerHTML = tempo;
}
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
synth.changeChannel = function(el){
  var chBtns = document.getElementsByClassName('channel-btns');
  for(var i=0; i<chBtns.length; i++){
    chBtns[i].dataset.channel = 0;
  }
  el.dataset.channel = 1;
}
//*****************Loading functions.....DO NOT TOUCH!****************************************
var Tracks = function(p, n, pa){
      this.playlist = p,
      this.name = n,
      this.path = pa;
} 
function loadBuffers() {
  // Array-ify
  var names = [];
  var paths = [];
  var n = {}
  
  for (var playlist in BUFFERS_TO_LOAD) {
    for(var name in BUFFERS_TO_LOAD[playlist]){
      var path = BUFFERS_TO_LOAD[playlist][name];
      names.push(new Tracks(playlist,name,path));
      // names.push(BUFFERS_TO_LOAD[playlist]);
      paths.push(path);
    }

  }
  bufferLoader = new BufferLoader(ctx, paths, function(bufferList) {
    for (var i = 0; i < bufferList.length; i++) {
      var buffer = bufferList[i];
      var name = names[i].name;
      // var pl = names[i].playlist; 
      BUFFERS[name] = buffer;
      // console.log(BUFFERS);
      
    }
  });
  bufferLoader.load();

  // console.log(BUFFERS);
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