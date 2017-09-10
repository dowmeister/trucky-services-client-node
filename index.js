const fetch = require('node-fetch');
/**
 *
 *
 * @class TruckyServices
 */
class TruckyAPIClient
{

    /**
     * Creates an instance of TruckyServices.
     *
     * @memberOf TruckyServices
     */
    constructor()
    {
        this.config = {
            serviceUrl: 'https://api.truckyapp.com'
        }
    }

    /**
     *
     *
     * @param {string} url
     * @returns
     *
     * @memberOf TruckyServices
     */
    async executeRequest(url, method = "GET", payload)
    {
        try
        {
            var promise = new Promise((resolve, reject) => {

                /*var myHeaders = new {};
                myHeaders.set('user-agent', 'TruckyAPIClient');

                var myInit = {
                    method: method,
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'no-cache'
                };*/

                /*if (method == "POST") {
                    //console.warn(payload);

                    myInit
                        .headers
                        .set('Accept', 'application/json, text/plain, *//**');
                    myInit
                        .headers
                        .set('Content-Type', 'application/json');

                    myInit.body = JSON.stringify(payload);
            }*/

                console.log(url);

                fetch(this.config.serviceUrl + url, { method: method }).then((response) => {
                    return response.json()                  
                }).then( (json) => {
                    resolve(json);
                })
            });

            return promise;

        } catch (error) {

            console.debug('TruckyServices API request: ' + error.message);

            return null;
        }
    }

    /**
     *
     *
     * @param {string} username
     * @returns
     *
     * @memberOf TruckyServices
     */
    async resolveVanityUrl(username)
    {
        var response = await this.executeRequest('/v2/steam/resolveVanityUrl?username=' + username);
        return response;
    }

    /**
     *
     *
     * @param {any} steamid
     * @returns
     *
     * @memberOf TruckyServices
     */
    async getPlayerSummaries(steamid)
    {
        var response = await this.executeRequest('/v2/steam/getPlayerSummaries?steamid=' + steamid);
        return response;
    }

    async pois()
    {
        var response = await this.executeRequest('/v2/map/pois');
        return response;
    }

    async isOnline(playerID)
    {
        var response = await this.executeRequest('/v2/map/online?playerID=' + playerID);
        return response;
    }

    async getFriends(steamID)
    {
        var response = await this.executeRequest('/v2/steam/getFriendsData?steamid=' + steamID);
        return response;
    }

    /* news */
    async news()
    {
        var response = await this.executeRequest('/v2/rss/truckersMP');
        return response;
    }

    async ets2News()
    {
        var response = await this.executeRequest('/v2/rss/ets2');
        return response;
    }

    async atsNews()
    {
        var response = await this.executeRequest('/v2/rss/ats');
        return response;
    }

    async update_info()
    {
        var response = await this.executeRequest('/v2/truckersmp/update_info');
        return response;
    }

    /* events */
    async events()
    {
        var response = await this.executeRequest('/v2/events');
        return response;
    }

    /* tmpapi wrapper */
    async servers()
    {
        var response = await this.executeRequest('/v2/truckersmp/servers');
        return response;

    }

    async game_version()
    {
        var response = await this.executeRequest('/v2/truckersmp/version');
        return response;
    }

    async game_time()
    {
        var response = await this.executeRequest('/v2/truckersmp/time');
        return response;
    }

    async rules()
    {
        var response = await this.executeRequest('/v2/truckersmp/rules');
        return response;
    }

    async player(id)
    {
        var response = await this.executeRequest('/v2/truckersmp/player?playerID=' + id);
        return response;
    }

    async bans(id)
    {
        var response = await this.executeRequest('/v2/truckersmp/bans?playerID=' + id);
        return response;
    }

    /**
     * Search player by Steam ID, Steam Username or TruckersMP ID based on searchType parameter
     *
     * @param {any} searchTerm
     * @param {any} searchType
     * @returns
     *
     * @memberOf TruckersMPApi
     */
    async searchPlayer(searchTerm, searchType)
    {
        var playerInfo = {
            found: false,
            steamProfileInfo: null,
            truckersMPProfileInfo: null,
            bans: []
        };

        //console.warn(searchType);

        switch (searchType) {
            case 'steamusername':

                var steamResponse = await this.resolveVanityUrl(searchTerm);

                if (steamResponse.found) {
                    playerInfo.steamProfileInfo = steamResponse.playerInfo;
                    var apiResponse = await this.player(steamResponse.steamID);

                    if (!apiResponse.error) {
                        playerInfo.found = true;
                        playerInfo.truckersMPProfileInfo = apiResponse.response;
                        playerInfo.bans = await this.bans(playerInfo.truckersMPProfileInfo.id);
                        // playerInfo.onlineStatus = await
                        // truckyApi.isOnline(playerInfo.truckersMPProfileInfo.id);
                    } else {
                        playerInfo.found = false;
                    }

                }

                break;
            case 'steamid':
            case 'truckersmpid':

                var apiResponse = await this.player(searchTerm);

                if (!apiResponse.error) {
                    playerInfo.truckersMPProfileInfo = apiResponse.response;
                    var steamProfileInfo = await this.getPlayerSummaries(playerInfo.truckersMPProfileInfo.steamID64);
                    playerInfo.steamProfileInfo = steamProfileInfo.playerInfo;
                    playerInfo.bans = await this.bans(playerInfo.truckersMPProfileInfo.id);
                    // playerInfo.onlineStatus = await
                    // truckyApi.isOnline(playerInfo.truckersMPProfileInfo.id);
                    playerInfo.found = true;
                }

                break;
        }

        return playerInfo;
    }

    async traffic(server, game)
    {
        var response = await this.executeRequest('/v2/traffic?server=' + server + '&game=' + game);
        return response;
    }

    async traffic_servers()
    {
        var response = await this.executeRequest('/v2/traffic/servers');
        return response;
    }
}

module.exports = TruckyAPIClient;