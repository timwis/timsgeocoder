module.exports = {
    providers: {
        mapquest: {
            apiHost: "http://open.mapquestapi.com"
            ,apiPath: "/geocoding/v1/address"
            ,apiKey: "Fmjtd%7Cluub2g61n9%2C25%3Do5-9uas5w"
            ,url: function(address) {
                return this.apiHost + this.apiPath + "?key=" + this.apiKey + "&location=" + encodeURIComponent(address);
            }
            ,parse: function(response, successCallback, errorCallback) {
                if(response.info !== undefined && response.info.statuscode === 0 && response.results.length && response.results[0].locations.length) {
                    return {
                         lat: response.results[0].locations[0].latLng.lat,
                         lng: response.results[0].locations[0].latLng.lng
                    };
                }
            }
        }
        ,google: {
            apiHost: "http://maps.googleapis.com"
            ,apiPath: "/maps/api/geocode/json"
            ,url: function(address) {
                return this.apiHost + this.apiPath + "?sensor=false&address=" + encodeURIComponent(address);
            }
            ,parse: function(response) {
                if(response.status !== undefined && response.status === "OK" && response.results.length) {
                    return {
                         lat: response.results[0].geometry.location.lat,
                         lng: response.results[0].geometry.location.lng,
                         location_type: response.results[0].geometry.location_type
                    };
                }
            }
        }
    }
};