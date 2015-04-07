<?php 
/**
*
* @subpackage sc-playlist
* @since Today
*/

 get_header(); ?> 

<section>
<?php 
	load_deck('a');
	load_deck('b');
	load_playlist();
?>

</section>

<?php get_footer(); ?>