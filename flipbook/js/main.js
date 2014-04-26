/**
 * Modified: 2013.02.16
 */

jQuery( function( $ ) {

	var flipbook,

	$frameNo = $( '#currentFrame' ),
	$knob = $( '#knob' ),
	btnList = [
		$( '#reverseBtn' ).data( { id: 0, methodName: 'reverse' } ),
		$( '#stopBtn' ).data( { id: 1, methodName: 'stop' } ),
		$( '#pauseBtn' ).data( { id: 2, methodName: 'pause' } ),
		$( '#playBtn' ).data( { id: 3, methodName: 'play' } )
	],
	btnList2 = [
		$( '#pat1Btn' ).data( { id: 0 } ),
		$( '#pat2Btn' ).data( { id: 1 } ),
		$( '#pat3Btn' ).data( { id: 2 } )
	];


	var setState = function( id ) {
		for ( var i = btnList.length; i--; ) {
			var $btn = btnList[i];
			if ( $btn.data( 'id' ) === id ) {
				$btn[0].src = $btn[0].src.replace( '_off', '_on' );
			} else {
				$btn[0].src = $btn[0].src.replace( '_on', '_off' );
			}
		}
	};

	var setState2 = function( id ) {
		for ( var i = btnList2.length; i--; ) {
			var $btn = btnList2[i];
			if ( $btn.data( 'id' ) === id ) {
				$btn[0].src = $btn[0].src.replace( '_off', '_on' );
			} else {
				$btn[0].src = $btn[0].src.replace( '_on', '_off' );
			}
		}
	};

	flipbook = new Flipbook( 'screen', 20, 1 );
	flipbook.onLastFrame = flipbook.onFirstFrame = function() {
		if ( !flipbook.getLoop() ) {
			setState( 1 );
		}
	};
	flipbook.onUpdate = function( data ) {
		$frameNo.text( data.frameNumber );
	};

	for ( var i = btnList.length; i--; ) {
		btnList[i]
		.on( 'click', function() {
			var $btn = $( this );
			flipbook[$btn.data( 'methodName' )]();
			setState( $btn.data( 'id' ) );
		} );
	}

	for ( var j = btnList2.length; j--; ) {
		btnList2[j]
		.on( 'click', function() {
			var $btn = $( this );
			var id = $btn.data( 'id' );
			flipbook.setPos( 500 * id * -1 );
			setState2( id );
		} );
	}

	$knob
	.on( 'click', function() {
		var isLoop = flipbook.getLoop();
		flipbook.setLoop( !isLoop );
		$knob
		.animate( {
			left: isLoop ? 10 : 23
		}, 200 );
	} );

	setState2( 0 );

	window.prettyPrint && prettyPrint();

} );