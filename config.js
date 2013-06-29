module.exports = {
    providers: {
        mapquest: {
            apiHost: "http://open.mapquestapi.com"
            ,apiPath: "/geocoding/v1/address"
            ,apiKey: "Fmjtd%7Cluub2g61n9%2C25%3Do5-9uas5w"
            ,url: function(address, city) {
                return this.apiHost + this.apiPath + "?key=" + this.apiKey + "&location=" + encodeURIComponent(address + ", " + city);
            }
            ,parse: function(response, successCallback, errorCallback) {
                if(response.info !== undefined && response.info.statuscode === 0 && response.results.length && response.results[0].locations.length) {
                    return [response.results[0].locations[0].latLng.lat, response.results[0].locations[0].latLng.lng];
                }
            }
        }
        ,google: {
            apiHost: "http://maps.googleapis.com"
            ,apiPath: "/maps/api/geocode/json"
            ,url: function(address, city) {
                return this.apiHost + this.apiPath + "?sensor=false&address=" + encodeURIComponent(address) + (city ? "&components=locality:" + encodeURIComponent(city) : "");
            }
            ,parse: function(response) {
                if(response.status !== undefined && response.status === "OK" && response.results.length) {
                    return [response.results[0].geometry.location.lat, response.results[0].geometry.location.lng];
                }
            }
        }
    }
};