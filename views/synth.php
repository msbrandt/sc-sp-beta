<?php
function synth(){
	?>

	<div class="synth-container">
		<div class="row">
			<div class="col-md-3">
 				<div class="level-cont">
					<label for"volume">Volume</label>
					<input type="range" id="volume" orient="vertical">
					<label for"input-level">Input Level</label>

					<input type="range" id="input-level" orient="vertical">
				</div> 
				<div class="sample-display">
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
						<li data-isactive="0"><span class="glyphicon glyphicon-stop"></span></li>
						<li data-isactive="0">Tap</li>
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
						<label>Filter</label>

						<input type="range" orient="vertical" max="1" min="0" step=".01" oninput="synth.changeFX(this)">
					</div>
					<div class="col-sm-2">
						<label>Tempo</label>

						<input id="tempo" type="range" min="0" max="256" step="1" value="80" orient="vertical" oninput="synth.changeTempo(this)">
						<label id="tempo-val"></label>
					</div>
					<div class="col-sm-2">
						<label>InsertFX</label>

						<input type="range" orient="vertical" max="1" min="0" step=".01" oninput="synth.changeEQ(this)">
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
							<li class="pad" data-active="0" data-sample="nana"></li>
							<li class="pad" data-active="1" data-sample="nana"></li>
							<li class="pad" data-active="0" data-sample="nana"></li>
							<li class="pad" data-active="0" data-sample="nana"></li>
							<li class="pad" data-active="0" data-sample="nana"></li>
							<li class="pad" data-active="0" data-sample="nana"></li>
							<li class="pad" data-active="0" data-sample="nana"></li>
							<li class="pad" data-active="0" data-sample="nana"></li>
						</ul>

					</div>
					<div class="col-sm-6">
						<ul>
							<li class="pad" data-active="0" data-sample="nana"></li>
							<li class="pad" data-active="0" data-sample="nana"></li>
							<li class="pad" data-active="0" data-sample="nana"></li>
							<li class="pad" data-active="0" data-sample="nana"></li>
							<li class="pad" data-active="0" data-sample="nana"></li>
							<li class="pad" data-active="0" data-sample="nana"></li>
							<li class="pad" data-active="0" data-sample="nana"></li>
							<li class="pad" data-active="0" data-sample="nana"></li>

						</ul>

					</div>
				</div>
			</div>
		</div>
	</div>

<?php
}
?>