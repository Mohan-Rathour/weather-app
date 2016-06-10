var request = require('request');
var Q= require('q');

/*
 *  Get weather information from yahoo api
 *  @param
 */
exports.getForecastData = function(cityName) {
  //crete promise
  var deferred = Q.defer();
  //exec yahoo  query on the basis of city name but the country name is static currently.
  var sql = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='+'"'+cityName + ', in"';
  var url = 'https://query.yahooapis.com/v1/public/yql?q='+sql + ')&format=json&env=store://datatables.org/alltableswithkeys';
  request(url, function (err, response, body) {
    if(err){
      deferred.reject(err);
    }else{
      var resData  =  JSON.parse(body);
      //Location value only for condition check we can remove 'location' value it's only for
      deferred.resolve({
        temp:resData.query.results.channel.item.condition.temp,
        location:resData.query.results.channel.location.city //To BE Remove, only for test purpose for checking city condition
      });
    }
  });
  return deferred.promise;
};

