<?php
function synth(){
	?>

	<div class="synth-container">
		<div class="row">
			<div class="col-md-3">
 				<div class="level-cont">
 					<div class="col-md-6">
						<label for"volume">Volume</label>
						<input type="range" id="volume" orient="vertical" min="0" max="100" value="100" oninput="synth.changeVolume(this)">
					</div>
					<div class="col-md-6">
						<label for"input-level">Input Level</label>
						<input type="range" id="input-level" orient="vertical">
					</div>
				</div> 
				<div class="sample-display">
					<input type="text" placeholder="Search Samples">
					<ul>
						<li>kick</li>
						<li>snare</li>
						<li>cowbell</li>
						<li>hihat</li>
					</ul>
				</div>

				<div class="control-row">
					<ul>
						<li id="play-btn" onclick="synth.play()" data-isactive="0"><span class="glyphicon glyphicon-play"></span></li>
						<li data-isactive="0" onclick="synth.stop()"><span class="glyphicon glyphicon-stop"></span></li>
						<li data-isactive="0">Tap</li>
						<li id="toogle-loop" data-isactive="0" onclick="synth.loop(this)">Loop</li>
					</ul>
				</div>
				<div class="xy-pad"></div>
			</div>
			<div class="col-md-9" id="synth-controls">
				<div class="row">
					<div class="col-sm-2">
						<label>Oscillator</label>
						<input type="range" orient="vertical">
					</div>
					<div class="col-sm-2">
						<label>Quality</label>
						<input type="range" orient="vertical" max="1" min="0" step="0.01" oninput="synth.changeEQ(this)">
					</div>
					<div class="col-sm-2">
						<label>Tempo</label>

						<input id="tempo" type="range" min="1" max="300" step="1" value="80" orient="vertical">
						<label id="tempo-val"></label>
					</div>
					<div class="col-sm-2">
						<label>Filter</label>
						<input id="filter-inp" type="range" orient="vertical" max="8" min="0" step="1" value="0" oninput="getFilter()">
						<label id="filter-val"></label>

					</div>
					<div class="col-sm-2">
						<label>InsertFX</label>

						<input type="range" orient="vertical" max="1" min="0" step=".01" oninput="synth.changeFX(this)">
					</div>
					<div class="col-sm-2">
						<div class="channels">
							<ul>
								<li>1</li>
								<li>2</li>
								<li>3</li>
								<li>4</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-6">
						<ul>
							<li class="pad" data-active="3" data-sample="clap" onclick="synth.playPads(this)"></li>
							<li class="pad" data-active="3" data-sample="cowbell" onclick="synth.playPads(this)"></li>
							<li class="pad" data-active="3" data-sample="kick" onclick="synth.playPads(this)"></li>
							<li class="pad" data-active="3" data-sample="snare" onclick="synth.playPads(this)"></li>
							<li class="pad" data-active="3" data-sample="perc"onclick="synth.playPads(this)"></li>
							<li class="pad" data-active="3" data-sample="tom" onclick="synth.playPads(this)"></li>
							<li class="pad" data-active="0" data-sample="nana" onclick="synth.playPads(this)"></li>
							<li class="pad" data-active="0" data-sample="nana" onclick="synth.playPads(this)"></li>
						</ul>

					</div>
					<div class="col-sm-6">
						<ul>
							<li class="pad" data-active="0" data-sample="nana" onclick="synth.playPads(this)"></li>
							<li class="pad" data-active="0" data-sample="nana" onclick="synth.playPads(this)"></li>
							<li class="pad" data-active="0" data-sample="nana" onclick="synth.playPads(this)"></li>
							<li class="pad" data-active="1" data-sample="nana" onclick="synth.playPads(this)"></li>
							<li class="pad" data-active="0" data-sample="nana" onclick="synth.playPads(this)"></li>
							<li class="pad" data-active="0" data-sample="nana" onclick="synth.playPads(this)"></li>
							<li class="pad" data-active="0" data-sample="nana" onclick="synth.playPads(this)"></li>
							<li class="pad" data-active="0" data-sample="nana" onclick="synth.playPads(this)"></li>

						</ul>

					</div>
				</div>
			</div>
		</div>
	</div>

<?php
}
?>