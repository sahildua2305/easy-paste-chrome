/*
* @Author: sahildua2305
* @Date:   2016-05-01 07:26:20
* @Last Modified by:   Sahil Dua
* @Last Modified time: 2016-05-02 02:24:24
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
		if(e.which == 76 && e.shiftKey){ // 'L'
			if(event.target.nodeName == "INPUT" && $.inArray(event.target.type, textAcceptingInputTypes) > -1){
				console.log("LinkedIn.");
				chrome.runtime.sendMessage({method: "getKeyValue", key: "linkedin"}, function(response){
					console.log(response);
					if(response.status == "success" && response.type == "string"){
						e.target.value = response.link;
					}
				});
			}
		}
		else if(e.which == 71 && e.shiftKey){ // 'G'
			if(event.target.nodeName == "INPUT" && $.inArray(event.target.type, textAcceptingInputTypes) > -1){
				console.log("GitHub.");
				chrome.runtime.sendMessage({method: "getKeyValue", key: "github"}, function(response){
					console.log(response);
					if(response.status == "success" && response.type == "string"){
						e.target.value = response.link;
					}
				});
			}
		}
		else if(e.which == 84 && e.shiftKey){ // 'T'
			if(event.target.nodeName == "INPUT" && $.inArray(event.target.type, textAcceptingInputTypes) > -1){
				console.log("Twitter.");
				chrome.runtime.sendMessage({method: "getKeyValue", key: "twitter"}, function(response){
					console.log(response);
					if(response.status == "success" && response.type == "string"){
						e.target.value = response.link;
					}
				});
			}
		}
		else if(e.which == 70 && e.shiftKey){ // 'F'
			if(event.target.nodeName == "INPUT" && $.inArray(event.target.type, textAcceptingInputTypes) > -1){
				console.log("Facebook.");
				chrome.runtime.sendMessage({method: "getKeyValue", key: "facebook"}, function(response){
					console.log(response);
					if(response.status == "success" && response.type == "string"){
						e.target.value = response.link;
					}
				});
			}
		}
		else if(e.which == 80 && e.shiftKey){ // 'P'
			if(event.target.nodeName == "INPUT" && $.inArray(event.target.type, textAcceptingInputTypes) > -1){
				console.log("Personal.");
				chrome.runtime.sendMessage({method: "getKeyValue", key: "personal"}, function(response){
					console.log(response);
					if(response.status == "success" && response.type == "string"){
						e.target.value = response.link;
					}
				});
			}
		}
	});
});
