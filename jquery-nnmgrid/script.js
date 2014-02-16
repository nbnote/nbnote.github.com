jQuery( function( $ ) {

	var flag = false;
	var $container = $( '#container' ).nnmGrid();
	var $btn = $( '#resize-btn' )
		.on( 'click', function() {
			flag = !flag;
			$container.width( flag ? 470 : 630 );
			$container.nnmGrid( 'update' );
		} );
} );


