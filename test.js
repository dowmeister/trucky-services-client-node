var TruckyAPIClient = require('./index.js');

var api = new TruckyAPIClient();
api.servers().then((response) => {
    console.log('servers loaded');
});

api.pois().then(function(response) {
    console.log('pois loaded');
});

api.resolveVanityUrl("dowmeister").then( (response) => {
    console.log('vanity url resolved');
});