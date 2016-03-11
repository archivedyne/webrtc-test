navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
window.onload = function () {
  var myStream;
  var errorCallback = function ( e ) { console.log( "error", e ); };
  var setOthersStream = function ( stream ) {
    $( '#others-video' ).prop( 'src', URL.createObjectURL( stream ) );
  };

  navigator.getUserMedia(
    { audio: true, video: true },
    function ( stream ) {
      myStream = stream;
      $( '#video' ).prop( 'src', URL.createObjectURL( stream ) );
    },
    errorCallback
  );

  var peer = new Peer( Math.random().toString(36).slice(-8), { host: window.location.href, path: '/' , debug: 3, port: 9000, secure: true } );

  peer.on( 'open', function ( id ) {
    $( '#peer-id' ).text( id );
  } );

  peer.on( 'call', function ( call ) {
    call.answer( myStream );
    call.on('stream', setOthersStream);
  } );

  $( '#call' ).on( 'click', function () {
    var call = peer.call( $( '#others-peer-id' ).val(), myStream );
    call.on( 'stream', setOthersStream );
  } );
  peer.on( 'error', errorCallback );
};

