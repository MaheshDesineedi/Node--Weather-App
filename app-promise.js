const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to get Latitude and Longitude',
			string: true
		}
	})
	.help()
	.argv;


var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argv.address)}`;

axios.get(geocodeUrl).then((response) => {
	if(response.data.status === 'ZERO_RESULTS'){
		throw new Error('Unable to find address');//*** rest of the code does not run ****
	}

	var lat = response.data.results[0].geometry.location.lat;
	var lng = response.data.results[0].geometry.location.lng;
	var weatherUrl = `https://api.darksky.net/forecast/5a9e935686cd1ebfc2e5ac8463a70c27/${lat},${lng}`;
	console.log(response.data.results[0].formatted_address);
	return axios.get(weatherUrl);

	//console.log(response.data);
}).then((response) =>{

	var temp = response.data.currently.temperature;
	var summary = response.data.currently.summary;
	console.log('Temperature: ',temp);
	console.log('Apparent Temperature: ',response.data.currently.apparentTemperature)
	console.log('Summary: ',summary);

}).catch((e) => {

	if(e.code === 'ENOTFOUND'){
		console.log('Cannot connect to severs');
	}else{
		console.log(e.message);
	}

});

console.log('Finish');// Asynchronous

//const request = require('request');








