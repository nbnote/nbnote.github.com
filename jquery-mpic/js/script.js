jQuery( function( $ ) {

	var spinOpts = {
		lines: 11, // The number of lines to draw
		length: 3, // The length of each line
		width: 3, // The line thickness
		radius: 12, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		direction: 1, // 1: clockwise, -1: counterclockwise
		color: '#666', // #rgb or #rrggbb
		speed: 1.5, // Rounds per second
		trail: 60, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: 'auto', // Top position relative to parent in px
		left: 'auto' // Left position relative to parent in px
	};

	var $window = $( window );
	var $scrlTarget = $( (navigator.userAgent.indexOf( 'Opera' ) !== -1) ? document.compatMode === 'BackCompat' ? 'body' : 'html' : 'html,body' );
	var $spinnerHolder = $( '#spinner' );
	var spinner = new Spinner( spinOpts ).spin( $spinnerHolder[0] );

	$scrlTarget.scrollTop( 1 );
	$spinnerHolder.css( {
		top: $window.height() / 2 | 0,
		left: $window.width() / 2 | 0
	} );

	var $screen = $( '#screen' ).mpic( {
		numFrames: 200,
		lq: 'img/lq{{index}}.jpg',
		hq: 'img/hq{{index}}.jpg',
		onLoadProgress: function( e ) {
		},
		onLoadComplete: function( e ) {
//			console.log( e );
			spinner.stop();
			$spinnerHolder.remove();
			$screen
			.css( { opacity: 0 } )
			.animate( {
				opacity: 1
			}, 1000, 'easeOutCubic' );
			$scrlTarget
			.stop( true )
			.animate( {
				scrollTop: 1600 - $window.height() / 2 | 0
			}, 1000, 'easeOutCubic' );
		},
		onUpdate: function( e ) {
//			log( e.frameNumber );
		}
	} );
} );