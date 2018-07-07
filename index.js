const fetch = require('node-fetch');

/**
 * Trucky API client class
 * @class
 */
class TruckyAPIClient
{

    /**
     * Creates an instance of TruckyAPIClient.
     *
     * @memberOf TruckyAPIClient
     */
    constructor()
    {
        /** @access private */
        this.config = {
            serviceUrl: 'https://api.truckyapp.com'
        }
    }

    /**
     *
     *
     * @access private
     * @param {string} url
     * @ignore
     * @async
     * @returns {Promise}
     *
     * @memberOf TruckyAPIClient
     */
    async executeRequest(url, method = "GET", payload)
    {
        try
        {
            var promise = new Promise((resolve, reject) => {

                fetch(this.config.serviceUrl + url, {method: method}).then((response) => {
                    return response.json()
                }).then((json) => {
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
     * Resolve Steam Vanity Url returning Steam player data if found
     *
     * @param {string} username Steam user vanity url
     * @async
     * @returns {Promise<TruckyAPIResponse>}
     *
     * @memberOf TruckyAPIClient
     */
    async resolveVanityUrl(username)
    {
        var response = await this.executeRequest('/v2/steam/resolveVanityUrl?username=' + username);
        return response;
    }

    /**
     * Returns Steam Player data if found
     *
     * @param {string} steamid Steam User ID
     * @async
     * @returns {Promise<TruckyAPIResponse>}
     *
     * @memberOf TruckyServices
     */
    async getPlayerSummaries(steamid)
    {
        var response = await this.executeRequest('/v2/steam/getPlayerSummaries?steamid=' + steamid);
        return response;
    }

    /**
     * Get ETS2Map Points of interest
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @async
     * @memberof TruckyAPIClient
     */
    async pois()
    {
        var response = await this.executeRequest('/v2/map/pois');
        return response;
    }

    /**
     * Check TruckersMP player online status
     *
     * @param {number} playerID TruckersMP User ID
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async isOnline(playerID)
    {
        var response = await this.executeRequest('/v2/map/online?playerID=' + playerID);
        return response;
    }

    /**
     * Check TruckersMP player online status - With improved informations, mapped map server and calculated location
     *
     * @param {number} playerID TruckersMP User ID
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async isOnlineImproved(playerID)
    {
        var response = await this.executeRequest('/v3/map/online?playerID=' + playerID);
        return response;
    }

    /**
     * Get Steam Friends
     *
     * @param {string} steamID Steam User ID
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async getFriends(steamID)
    {
        var response = await this.executeRequest('/v2/steam/getFriendsData?steamid=' + steamID);
        return response;
    }

    /**
     * Get TruckersMP news feed from Steam RSS
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async news()
    {
        var response = await this.executeRequest('/v2/rss/truckersMP');
        return response;
    }

    /**
     * Get ETS2 News feed from Steam RSS
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async ets2News()
    {
        var response = await this.executeRequest('/v2/rss/ets2');
        return response;
    }

    /**
     * Get ATS News feed from Steam RSS
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async atsNews()
    {
        var response = await this.executeRequest('/v2/rss/ats');
        return response;
    }

    /**
     * Get TruckersMP current update info and current plugin version
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async update_info()
    {
        var response = await this.executeRequest('/v2/truckersmp/update_info');
        return response;
    }

    /**
     * Get events and meetup from ETS2.com and truckers.events
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async events()
    {
        var response = await this.executeRequest('/v2/events/upcoming');
        return response;
    }

    /**
     * Get TruckersMP servers
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async servers()
    {
        var response = await this.executeRequest('/v2/truckersmp/servers');
        return response;

    }

    /**
     * Get TruckersMP game version info
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async game_version()
    {
        var response = await this.executeRequest('/v2/truckersmp/version');
        return response;
    }

    /**
     * Get TruckersMP game time
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async game_time()
    {
        var response = await this.executeRequest('/v2/truckersmp/time');
        return response;
    }

    /**
     * Get TruckersMP rules
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async rules()
    {
        var response = await this.executeRequest('/v2/truckersmp/rules');
        return response;
    }

    /**
     * Get TruckersMP player data
     *
     * @param {number} id TruckersMP User ID
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async player(id)
    {
        var response = await this.executeRequest('/v2/truckersmp/player?playerID=' + id);
        return response;
    }

    /**
     * Get TruckersMP player bans data
     *
     * @param {number} id TruckersMP User ID
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async bans(id)
    {
        var response = await this.executeRequest('/v2/truckersmp/bans?playerID=' + id);
        return response;
    }

    /**
     * Search player by Steam ID, Steam Username or TruckersMP ID based on searchType parameter
     *
     * @param {string} searchTerm Search Term, can be TruckersMP User ID, Steam User ID or Steam Vanity url
     * @param {string} searchType Can be "steamid", "truckersmpid", "steamusername"
     * @async
     * @returns {Promise<TruckyAPIResponse>}
     *
     * @memberOf TruckyAPIClient
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

    /**
     * Get TruckersMP traffic data from traffic.krashnz.com
     *
     * @param {string} server TruckersMP Server short name
     * @param {string} game Can be "ETS2" or "ATS"
     * @async
    * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     */
    async traffic(server, game)
    {
        var response = await this.executeRequest('/v2/traffic?server=' + server + '&game=' + game);
        return response;
    }

    async topTraffic(server, game)
    {
        var response = await this.executeRequest('/v2/traffic/top?server=' + server + '&game=' + game);
        return response;
    }

    /**
     * Get TruckersMP get traffic servers data from traffic.krashnz.com
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async traffic_servers()
    {
        var response = await this.executeRequest('/v2/traffic/servers');
        return response;
    }

    /**
     * Get World Of Trucks Random Gallery
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async wot_gallery_random()
    {
        var response = await this.executeRequest('/v2/wot/gallery/random');
        return response;
    }
    
    /**
     * Get World Of Trucks Editor's pick
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async wot_gallery_editorspick()
    {
        var response = await this.executeRequest('/v2/wot/gallery/editorspick');
        return response;
    }

    /**
     * Get World Of Trucks Best rated
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async wot_gallery_bestrated()
    {
        var response = await this.executeRequest('/v2/wot/gallery/bestrated');
        return response;
    }

    /**
     * Get World Of Trucks most viewed
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async wot_gallery_mostviewed()
    {
        var response = await this.executeRequest('/v2/wot/gallery/mostviewed');
        return response;
    }

    /**
     * Get current Twitch streams for ETS2
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async streams_twitch_ets2()
    {
        var response = await this.executeRequest('/v2/streams/twitch/ets2');
        return response;
    }

    /**
     * Get current Twitch streams for ATS
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async streams_twitch_ats()
    {
        var response = await this.executeRequest('/v2/streams/twitch/ats');
        return response;
    }

    /**
     * Get TruckersFM current listeners
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async truckersfm_listeners()
    {
        var response = await this.executeRequest('/v2/truckersfm/listeners');
        return response;
    }

    /**
     * Get TruckersFM current show
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async truckersfm_shows()
    {
        var response = await this.executeRequest('/v2/truckersfm/shows');
        return response;
    }

    /**
     * Get TruckersFM last played song 
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async truckersfm_lastPlayed()
    {
        var response = await this.executeRequest('/v2/truckersfm/lastPlayed');
        return response;
    }

    /**
     * Get players online state by TruckersMP ids array
     * Search TruckersMP player by username
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async onlineList(ids)
    {
        var response = await this.executeRequest('/v2/map/onlineList?ids=' + ids.join(','));
        return response;
    }

    /**
     * Search TruckersMP Player by username
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async searchPlayerByTruckersMPUsername(query)
    {
        var response = await this.executeRequest('/v2/truckersmp/searchPlayer?query=' + query);
        return response;
    }

    /**
     * Get TruckersMP player complete information with online state and Steam profile data
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async getPlayerInfoComplete(query)
    {
        var response = await this.executeRequest('/v2/trucky/player?query=' + query);
        return response;
    }

     /**
     * Get list of ETS2 cities, with coordinates and country
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async ets2_cities()
    {
        var response = await this.executeRequest('/v2/map/cities/ets2');
        return response;
    }

    /**
     * Get list of ATS cities, with coordinates and country
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async ats_cities()
    {
        var response = await this.executeRequest('/v2/map/cities/ats');
        return response;
    }

    /**
     * Get list of all cities, with coordinates, country and game
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async cities_all()
    {
        var response = await this.executeRequest('/v2/map/cities/all');
        return response;
    }

    /**
     * Get Map servers list, mapped on API servers
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async map_servers()
    {
        var response = await this.executeRequest('/v2/map/servers');
        return response;
    }

    /**
     * Search player online on map
     *
     * @returns {Promise<TruckyAPIResponse>}
     * @memberof TruckyAPIClient
     * @async
     */
    async searchPlayerOnMap(query)
    {
        var response = await this.executeRequest('/v2/map/searchPlayer?query=' + query);
        return response;
    }

}

/**
 * Trucky API client response prototype
 * @property {object} response
 * @typedef {object} TruckyAPIResponse
 * @class
 */
var TruckyAPIResponse = {
    response: {}
}

module.exports = TruckyAPIClient;