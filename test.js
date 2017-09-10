var TruckyAPIClient = require('./index.js');

var api = new TruckyAPIClient();
api.servers().then((response) => {
    console.log(response);
});

api.pois().then(function(response) {
    console.log(response);
});

api.resolveVanityUrl("dowmeister").then( (response) => {
    console.log(response);
});