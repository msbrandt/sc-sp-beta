var audioCtx, src; 
var audioCtxA = new (window.AudioContext || window.webkitAudioContext)();
var audioCtxB = new (window.AudioContext || window.webkitAudioContext)();
SC.initialize({
		client_id: '7d9677620e4d860d055604be6c25d43a'
});
var decks = document.getElementsByClassName('deck');
var activateBtns = document.getElementsByClassName('active-deck-button');
var vinyls = document.getElementsByClassName('vinyl');
var toggleButtons = document.getElementsByClassName('toggle-button');
var sbtn = document.getElementById('stop-btn');
var playlistBtn = document.getElementById('open-playlist');
var playlist = document.getElementById('loaded-playlist');
var songs = playlist.getElementsByTagName('li');

var closePlaylistBtn = document.getElementById('close');
var url = 'http://localhost/~msbrandt/mixer/wp-content/themes/sc-sp-beta/inc/LuckyCharmesSkank.ogg';

var x = document.createElement('audio');
x.src = url;

var theAudio = document.querySelector('audio');

var mySrc = audioCtxA.createMediaElementSource(x);
var mySrc3 = audioCtxA.createMediaElementSource(theAudio);

var gainNode = audioCtxA.createGain();

mySrc.connect(gainNode);
gainNode.connect(audioCtxA.destination);

function playSound(buffer){
	var thisSrc = audioCtxA.createBufferSource();
	console.log(thisSrc);
	thisSrc.buffer = buffer;
	thisSrc.connect(audioCtxA.destination);
	thisSrc.start();
}

document.addEventListener('keypress', function(e){
	if(e.keyCode == 13){
		playSound(mySrc);
		// mySrc3.start(0);
		// mySrc.stop();

		// x.play();
		// console.log(mySrc);
		// console.log(mySrc3);
	}

});

// for(var i=0; i<activateBtns.length; i++){
// 	activateBtns[i].addEventListener('click', activateDeck);
// 	toggleButtons[i].addEventListener('click', playDeck);
// };
// for (var x = 0; x<songs.length; x++) {
// 	songs[x].addEventListener('click', selectSong);
// };
// playlistBtn.addEventListener('click', showPlaylist);
// closePlaylistBtn.addEventListener('click', closePlaylist);

// function selectSong(){
// 	for(var i=0; i<decks.length; i++){
// 		var thisData = decks[i].dataset.active_deck;

// 		if(thisData === 'true'){
// 			var actDeck = decks[i];
// 		}
// 	}

// 	var songID = this.dataset.id;
// 	var songDuration = this.dataset.duration;
// 	var dataWave = this.dataset.wave;

// 	SC.stream('tracks/'+songID, function(sound){

// 		var rawUrl = sound.url,
// 			spUrl = rawUrl.split('.com'),
// 			useUrl = spUrl[0]+'.com/'+spUrl[1];
// 			getData(useUrl, actDeck);
// 	});
// }

// function showPlaylist(){
// 	this.style.display = 'none';
// 	playlist.style.display = 'block';
// }
// function closePlaylist(){
// 	this.parentNode.style.display = 'none';
// 	playlistBtn.style.display = 'block';
// }
// function activateDeck(){
// 	var theDeck = this.parentNode;

// 	for(var x=0; x<activateBtns.length; x++){
// 		activateBtns[x].dataset.active = false; 
// 		decks[x].dataset.active_deck = false;
// 		// vinyls[x].dataset.vinyl = false;
// 	}

// 	this.dataset.active=true;
// 	theDeck.dataset.active_deck = true;
// }
// function playDeck(){
// 	var theDeck = this.parentNode;
// 	var isActive = theDeck.dataset.active_deck; 
// 	var theVinyl = theDeck.querySelector('.vinyl');

// 	isActive ? theVinyl.dataset.vinyl = true : theVinyl.dataset.vinyl = false; 
// }

// function getData(theUrl, addDeck){
// 	// console.log(addDeck.id);
// 	if(addDeck.id === 'deck-a'){
// 		var aac = audioCtxA;
// 	}else{
// 		var aac = audioCtxB;
// 	}
// 	src = aac.createBufferSource();
// 	request = new XMLHttpRequest();

// 	request.open('GET', theUrl, true);
// 	request.responseType = 'arraybuffer';
	
// 	request.onload = function(){
// 		console.log('Loading context');
// 		var ad = request.response;
		
// 		aac.decodeAudioData(ad, function(buffer){
// 			src.buffer = buffer;
// 			src.connect(aac.destination);
// 			src.loop = true;
// 			console.log('Context decoded');
// 		},
// 		function(e){"Error with decoding" + e.err});
// 	}
// 	request.send();
// }



// btn.addEventListener('click', function(){
// 	getData();
// 	src.start(0);
// });

// sbtn.addEventListener('click', function(){
// 	src.stop(0);
// })
