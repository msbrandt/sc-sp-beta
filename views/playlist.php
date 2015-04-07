<?php 
function load_playlist(){
?>
<div id="open-playlist"><div class="glyphicon glyphicon-list-alt"></div></div>
<div id="loaded-playlist">
	<span id="close">x</span>
	<ul>
	<?php
		load_song_list_li();
	?>
	</ul>
</div>
<?php }; ?>


