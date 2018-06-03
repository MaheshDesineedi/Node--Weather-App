
const request = require('request');

var geocodeAddress = (address, callback) =>{
//console.log(address);

		request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
			json: true
		},(error,response,body) => {
			//console.log(error);
			//console.log(JSON.stringify(response, undefined , 2));
			
			if(error){
				callback('cannot connect to Google maps servers.',undefined);
			}
			else if(body.status === 'ZERO_RESULTS'){
				callback(`Unable to find the address ${address}`);
			}
			else if(body.status === 'OK'){
				callback(undefined, {
					Address: body.results[0].formatted_address,
					Latitude: body.results[0].geometry.location.lat,
					Longitude: body.results[0].geometry.location.lng
				});
			}
			else if(body.status === 'OVER_QUERY_LIMIT'){
				callback('query limits exceeded . Try Again');
			}
		});

};



module.exports = {
	geocodeAddress
};