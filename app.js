//const request = require('request');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');
const yargs = require('yargs');

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

//console.log(encodeURIComponent(argv.a));

// 5a9e935686cd1ebfc2e5ac8463a70c27
geocode.geocodeAddress(argv.address, (errorMsg,results) =>{
	if(errorMsg){
		console.log(errorMsg);
	}
	else{
    		//console.log(JSON.stringify(results, undefined, 2));
    	weather.weatherCode(results, (errormsg, res) =>{
            if(errormsg){
                        console.log(errorMsg);
            }
            else{
                        console.log(JSON.stringify(res,undefined,2));
            }
        });
    }
});

console.log('Finish');// Asynchronous

//const request = require('request');








