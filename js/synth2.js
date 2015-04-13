console.log('synth 2');

var audio = {
	buffer: {},
	compatibility: {},
	files: [
		sc.tpTag+'/inc/808/clap-808.wav',
		sc.tpTag+'/inc/808/cowbell-808.wav',
		sc.tpTag+'/inc/808/crash-808.wav',
		sc.tpTag+'/inc/808/hihat-808.wav',
		sc.tpTag+'/inc/808/kick-808.wav',
		sc.tpTag+'/inc/808/openhat-808.wav',
		sc.tpTag+'/inc/808/perc-808.wav',
		sc.tpTag+'/inc/808/snare-808.wav',
		sc.tpTag+'/inc/808/tom-808.wav'	
	],
	proceed: true,
	src_loop: {},
	src_once: {}
};
// console.log(audio);
audio.play = function(x){
	if(audio.src_loop[x]._playing){
		audio.stop(x);
	}else{
		audio.src_loop[x] = audio.context.createBufferSource();
		audio.src_loop[x].buffer = audio.buffer[x];
		audio.src_loop[x].loop = true;
		audio.src_loop[x].connect(audio.context.destination);

		var offset = audio.findSync(x);
		audio.src_loop[x]._startTime = audio.context.currentTime;

		if(audio.compatibility.start === 'noteOn'){
			audio.src_once[x] = audio.context.createBufferSource();
            audio.src_once[x].buffer = audio.buffer[x];
            audio.src_once[x].connect(audio.context.destination);
            audio.src_once[x].noteGrainOn(0, offset, audio.buffer[x].duration - offset); 	
			
			audio.src_loop[x][audio.compatibility.start](audio.context.currentTime + (audio.buffer[x].duration - offset));	
		}else {
			audio.src_loop[x][audio.compatibility.start](0, offset);
		}
		audio.src_loop[x]._playing = true;
	}
}

audio.stop = function(x) {
    // if (audio.src_loop[x]._playing) {
    //     audio.src_loop[x][audio.compatibility.stop](0);
    //     audio.src_loop[x]._playing = false;
    //     audio.src_loop[x]._startTime = 0;
    //     if (audio.compatibility.start === 'noteOn') {
    //         audio.src_once[x][audio.compatibility.stop](0);
    //     }
    // }
};
audio.findSync = function(n){
	// var first = 0,
	// 	current = 0,
	// 	offset = 0;

	// for (var i in audio.src_loop){
	// 	current = audio.src_loop[i]._startTime;
	// 	if(current > 0){
	// 		if(current < first || first === 0){
	// 			first = current;
	// 		}
	// 	}
	// }
	// if(audio.context.currentTime > first){
	// 	offset = (audio.context.currentTime - first) % audio.buffer[n].duration
	// }
}



//********************** Compatibility and Loading *************************************

try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    audio.context = new window.AudioContext();
} catch(e) {
    audio.proceed = false;
    alert('Web Audio API not supported in this browser.');
}

if(audio.proceed){
	(function(){
		var start = 'start',
			stop = 'stop',
			buffer = audio.context.createBufferSource();
		if(typeof buffer.start !== 'function'){
			start = 'noteOn';
		}
		audio.compatibility.start = start;

		if(typeof buffer.stop !== 'function'){
			stop = 'noteOff';
		}
		audio.compatibility.stop = stop;
	})();

	for (var a in audio.files) {
    (function() {
        var i = parseInt(a) + 1;
        var req = new XMLHttpRequest();
        req.open('GET', audio.files[i - 1], true); // array starts with 0 hence the -1
        req.responseType = 'arraybuffer';
        req.onload = function() {
            audio.context.decodeAudioData(
                req.response,
                function(buffer) {
                    audio.buffer[i] = buffer;
                    audio.src_loop[i] = {};
                    // var button = document.getElementById('button-loop-' + i);
                    // button.addEventListener('click', function(e) {
                    //     e.preventDefault();
                    console.log(i);
                        audio.play(this.value, false);
                    // });
                },
                function() {
                    console.log('Error decoding audio "' + audio.files[i - 1] + '".');
                }
            );
        };
        req.send();
    })();
}
}