/*
* @Author: sahildua2305
* @Date:   2016-05-01 07:26:20
* @Last Modified by:   sahildua2305
* @Last Modified time: 2016-05-01 08:18:18
*/

console.log("before loading");

$(document).on('ready', function(){
	console.log("loaded");

	// focussing on inputs as of now
	// ignoring textareas
	var textAcceptingInputTypes = [
		"text",
		"password",
		"number",
		"email",
		"url",
		"range",
		"date",
		"month",
		"week",
		"time",
		"datetime",
		"datetime-local",
		"search",
		"color",
		"tel"
	];

	$(document).keydown(function(e){
		if(e.which == 76 && e.shiftKey){
			if(event.target.nodeName == "INPUT" && $.inArray(event.target.type, textAcceptingInputTypes) > -1){
				console.log("LinkedIn.");
				chrome.runtime.sendMessage({method: "getKeyValue", key: "linkedin"}, function(response){
					console.log(response);
					console.log(response.data);
				});
			}
		}
		else if(e.which == 71 && e.shiftKey){
			console.log("GitHub.");
		}
		else if(e.which == 84 && e.shiftKey){
			console.log("Twitter.");
		}
		else if(e.which == 70 && e.shiftKey){
			console.log("Facebook.");
		}
		else if(e.which == 80 && e.shiftKey){
			console.log("Personal.");
		}
	});
});
