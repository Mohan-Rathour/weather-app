# Weather information app
Get Temp on the basis of city names.
Go to the app dir from terminal 
First you need to install node on your system after installing node follow the below step to run the application on local.
1-Go to the app dir from terminal 
2-Press command + space(On Mac) .It will open terminal,Then run the below commands
     npm install
     node app.js
4- Open the browser or any rest client
5- Hit the below url on browser
    http://localhost:9000/getWeatherReport?cityNames=Delhi&cityNames=Gurgaon
6-Now you can see expected result.
Example- 
  {
    Delhi:38,
    Gurgaon:37
  }