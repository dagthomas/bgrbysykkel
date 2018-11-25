angular.module('GetData', [])
    .service('DataHandler', ['$http', '$q', function ($http, $q) {
        var umbraco = "umbraco/api/JSON/";
        var surface = "umbraco/surface/";
        var deferObject,
            FromOslobysykkel = {
                
                getStations: function (id) {
                    var promise = $http.get('/api/v1/stasjoner/' + id, { cache: false }, { headers: { 'Content-Encoding': 'br, gzip'} }),
                        deferObject = deferObject || $q.defer();

                    promise.then(function (answer) { deferObject.resolve(answer); }, function (reason) { deferObject.reject(reason); });
                    return deferObject.promise;
                },
                getAllStations: function () {
                    var promise = $http.get('/api/v1/allestasjoner', { cache: false }, { headers: { 'Content-Encoding': 'br, gzip'} }),
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
                getUpdatedFiles: function () {
                    var promise = $http.get('/api/v1/updatefiles ', { cache: false }, { headers: { 'Content-Encoding': 'br, gzip'} }),
                        deferObject = deferObject || $q.defer();

                    promise.then(function (answer) { deferObject.resolve(answer); }, function (reason) { deferObject.reject(reason); });
                    return deferObject.promise;
                }                      
            };
        return FromOslobysykkel;
    }]);

