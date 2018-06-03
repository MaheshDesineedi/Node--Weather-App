const request = require('request');


var weatherCode = (results,callback) =>{

	request({
    	   url: `https://api.darksky.net/forecast/5a9e935686cd1ebfc2e5ac8463a70c27/${results.Latitude},${results.Longitude}`,
    	   json: true
        },(error,response,body) => {
    	   if(!error && response.statusCode === 200)
    		{
    			callback(undefined, {
        			Address: results.Address,
    				Latitude: body.latitude,
		    		Longitude: body.longitude,
		    		Summary: body.currently.summary,
		    		Temperature: body.currently.temperature
	        	});
    		}
        	else{
            	console.log('Unable to connect');
    	   }
    });

};


module.exports = {
	weatherCode
};