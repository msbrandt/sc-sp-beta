var audioCtx; 
function init() {
	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	audioCtx ? console.log('context created') : console.log('No Web Audio for you :(');
	
}

var audioBuffer = null;

// var url = '../inc/hat.wav';

function loadSound(url, ctx){
	console.log(audioCtx);
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arrayBuffer';

	request.onload = function(){
		console.log('sound loaded');
		ctx.decodeAudioData(request.response, function(buffer){
			audioBuffer = buffer;
			console.log('sound decoded');
		})
	}
	request.send();
}
var src = null;
function playSound(anybuffer){
	src = audioCtx.createBufferSource();
	src.buffer = anybuffer;
	src.connect(audioCtx.destination);
}


var btn = document.getElementById('pad1');
var btn2 = document.getElementById('pad2');
btn2.addEventListener('click', init);

btn.addEventListener('click', function(){
	var url = 'http://localhost/~msbrandt/mixer/wp-content/themes/sc-sp-beta/inc/kick.wav';
	loadSound(url, audioCtx);
	// playSound(audioBuffer);	
});