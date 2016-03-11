var express    = require( 'express' );
var https      = require( 'https' );
var PeerServer = require( 'peer' ).PeerServer;
var fs         = require( 'fs' );

var httpsServer = express();

var keys = {
  key: fs.readFileSync( 'server.key' ),
  cert: fs.readFileSync( 'server.crt' )
};

PeerServer( { port: 9000, ssl: keys } );

httpsServer.use( express.static( __dirname + '/public' ) );

https.createServer( keys, httpsServer ).listen( 3000 );

