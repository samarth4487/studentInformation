var http = require('http');

// print message function
function printMessage(username, badgeCount, points){
	var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in Javascript ";
	console.log(message);
}

// print error function
function printError(error){
	console.error(error.message);
}

function get(username){
	var request = http.get("http://teamtreehouse.com/" + username + ".json", function(response){

		var body = "";

		response.on("data", function(chunk){
			body += chunk;
		});

		response.on("end", function(){
			if(response.statusCode === 200){
			try{
			var profile = JSON.parse(body);
			printMessage(username, profile.badges.length, profile.points.JavaScript);
		}
		catch(error){
			printError(error);
		}
	}
	else{
		printError({message: "There was an error getting profile for " + username + "."})
	}
		});
	});

	// Connection Error
	request.on("error", printError);
}



module.exports.get = get;