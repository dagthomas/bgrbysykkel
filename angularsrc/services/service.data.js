angular.module('GetData', [])
    .service('DataHandler', ['$http', '$q', function ($http, $q) {
        var umbraco = "umbraco/api/JSON/";
        var surface = "umbraco/surface/";
        var deferObject,
            FromOslobysykkel = {
                
                getStations: function (id, place) {
                    var url = '';
                    if(place && place.toLowerCase() !== 'oslo'){
                        url = '/api/v1/'+place+'/stasjoner/' + id
                    }else{
                        url = '/api/v1/stasjoner/' + id
                    }

                    var promise = $http.get(url, { cache: false }, { headers: { 'Content-Encoding': 'br, gzip'} }),
                        deferObject = deferObject || $q.defer();

                    promise.then(function (answer) { deferObject.resolve(answer); }, function (reason) { deferObject.reject(reason); });
                    return deferObject.promise;
                },
                getAllStations: function (place) {
                    var url = '';
                    if(place && place.toLowerCase() !== 'oslo'){
                        url = '/api/v1/'+place+'/allestasjoner/'
                    }else{
                        url = '/api/v1/allestasjoner'
                    }
                    var promise = $http.get(url, { cache: false }, { headers: { 'Content-Encoding': 'br, gzip'} }),
                        deferObject = deferObject || $q.defer();

                    promise.then(function (answer) { deferObject.resolve(answer); }, function (reason) { deferObject.reject(reason); });
                    return deferObject.promise;
                },
                getStationsStatus: function () {
                    var promise = $http.get('/api/v1/status', { cache: false }, { headers: { 'Content-Encoding': 'br, gzip'} }),
                        deferObject = deferObject || $q.defer();

                    promise.then(function (answer) { deferObject.resolve(answer); }, function (reason) { deferObject.reject(reason); });
                    return deferObject.promise;
                },
                getUpdatedFiles: function (place) {
                    var url = '';
                    if(place && place.toLowerCase() !== 'oslo'){
                        url = '/api/v1/'+place+'/updatefiles'
                    }else{
                        url = '/api/v1/updatefiles'
                    }
                    var promise = $http.get(url, { cache: false }, { headers: { 'Content-Encoding': 'br, gzip'} }),
                        deferObject = deferObject || $q.defer();

                    promise.then(function (answer) { deferObject.resolve(answer); }, function (reason) { deferObject.reject(reason); });
                    return deferObject.promise;
                }                      
            };
        return FromOslobysykkel;
    }]);

