<?php 
/**
*
* @subpackage sc-playlist
* @since Today
*/

 get_header(); ?> 

<section>
	<div class="synth">
		<ul class="row">
			<li id="pad1" data-sound="<?php echo get_template_directory_uri(); ?>/inc/kick.wav"></li>
			<li id="pad2" data-sound="<?php echo get_template_directory_uri(); ?>/inc/snare.wav"></li>
			<li id="pad3" data-sound="<?php echo get_template_directory_uri(); ?>/inc/tin.wav"></li>
			<li id="pad4" data-sound="<?php echo get_template_directory_uri(); ?>/inc/hat.wav"></li>
			<li id="pad5" data-sound="<?php echo get_template_directory_uri(); ?>/inc/irHall.ogg"></li>
			<li id="pad6" data-sound="<?php echo get_template_directory_uri(); ?>/inc/LuckyCharmesSkank.mp3"></li>
		</ul>
	</div>
	<div id="oscillator"></div>
</section>

<!-- <audio src='<?php echo get_template_directory_uri();?>/inc/LuckyCharmesSkank.mp3' controls="controls"></audio> -->
<?php get_footer(); ?>