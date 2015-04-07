<?php 
function load_deck($id){
?>
<article class="deck" id="deck-<?php echo $id; ?>"  data-active_deck="false" data-volume_control="vo-<?php echo $id; ?>">

	<div class="active-deck-button" data-active="false" id="act-deck-<?php echo $id; ?>"><div class="glyphicon"></div></div>

	<div class="vinyl" id="v-<?php echo $id; ?>" data-vinyl="false">
			<div class="time-display">
				<span class="current-time">0:00</span>
				<span>/</span>
				<span class="total-time">0:00</span>
			</div>
			<div class="vinyl-layer0">
				<div class="vinyl-layer1">
					<div class="vinyl-layer2">

					</div>
				</div>
			</div>
	</div>

	<div class="progress">
		<input class="wave-prog" value="0" id="wave-<?php echo $id; ?>" type="range" min='0' max="">
		
	</div>
	<div class="display">
		<div class="now-playing">none</div>
	</div>
	<div class="toggle-button" id="tog-<?php echo $id; ?>" data-play="false">
		<div class="glyphicon glyphicon-play"></div>	
	</div>
</article>
<?php 
}
?>