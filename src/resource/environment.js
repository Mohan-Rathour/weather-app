//creating logger module.
var winston = require('../logger');
var async = require("async");
var _ = require('underscore');
var yahooService = require("../service/yahooService");

/**
 * Content-Type ->application/json
 * @api {GET} /http://localhost:9000/getWeatherReport?cityNames=delhi&cityNames=gurgaon
 *


 * @apiName Fetch Current weather on the basis of cityNames only in india we can also set country name dynamic
 *  but now we are using hardcoded country code
 * @apiGroup GET-APIs
 * @apiQueryParams  array
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200
     {
      “Delhi” : 37,
      “Gurgaon”: 35
     }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404
 * @apiDescription
 *   Accessed through 'GET'
 *  '/getWeatherReport.
 *  This API fetches the weather information on the basis of the query parameter and returns as a response.
 */

module.exports = function(req, res) {
  winston.info("File Name >[environment]");
  var cityNames=  req.query.cityNames;
  var temp = [];
  var resData ={};
  async.each(cityNames,
    function(city, callback){
      yahooService.getForecastData(city).then(function(response) {
        //To BE Remove,if condition only for test purpose for checking city yahoo response and query parameter.
        if(response.location.toUpperCase() === city.toUpperCase()){
          var celTemp = (response.temp - 32) * 5/9;
          temp.push(Math.floor(celTemp));
          //temp.push(celTemp);
        }
        callback();
      });
    },
    function(err){
      if(err){
        sendError(res);
      }
      else{
        if(cityNames.length === temp.length){
          _.each(cityNames, function(city, index){
            resData[city] = temp[index];
          })
        }
        res.status(200).send(resData);
        res.end();
      }
    });
};

//Error handler.
var sendError = function(res, err) {
  var err = err ? err : 'Please send an appropriate query or body data';
  res.status(status).send({error:err});
  res.end();
};