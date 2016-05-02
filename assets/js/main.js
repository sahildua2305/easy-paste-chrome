/*
* @Author: sahildua2305
* @Date:   2016-05-01 07:26:20
* @Last Modified by:   Sahil Dua
* @Last Modified time: 2016-05-02 21:46:56
*/


var element;

document.addEventListener("contextmenu", function(e){
	console.log(e);
	element = e.target;
});

$(document).on('ready', function(){
	console.log("loaded");

	chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
		console.log(message);
		console.log(element);
		if(message.status == "success" && message.type == "string"){
			element.value = element.value + message.link;
		}
	});


	// // focussing on inputs as of now
	// // ignoring textareas
	// var textAcceptingInputTypes = [
	// 	"text",
	// 	"password",
	// 	"number",
	// 	"email",
	// 	"url",
	// 	"range",
	// 	"date",
	// 	"month",
	// 	"week",
	// 	"time",
	// 	"datetime",
	// 	"datetime-local",
	// 	"search",
	// 	"color",
	// 	"tel"
	// ];

	// $(document).keydown(function(e){
	// 	if(e.which == 76 && e.shiftKey && e.altKey){ // 'L'
	// 		if(event.target.nodeName == "INPUT" && $.inArray(event.target.type, textAcceptingInputTypes) > -1){
	// 			console.log("LinkedIn.");
	// 			chrome.runtime.sendMessage({method: "getKeyValue", key: "linkedin"}, function(response){
	// 				console.log(response);
	// 				if(response.status == "success" && response.type == "string"){
	// 					e.target.value = response.link;
	// 				}
	// 			});
	// 		}
	// 	}
	// 	else if(e.which == 71 && e.shiftKey && e.altKey){ // 'G'
	// 		if(event.target.nodeName == "INPUT" && $.inArray(event.target.type, textAcceptingInputTypes) > -1){
	// 			console.log("GitHub.");
	// 			chrome.runtime.sendMessage({method: "getKeyValue", key: "github"}, function(response){
	// 				console.log(response);
	// 				if(response.status == "success" && response.type == "string"){
	// 					e.target.value = response.link;
	// 				}
	// 			});
	// 		}
	// 	}
	// 	else if(e.which == 84 && e.shiftKey && e.altKey){ // 'T'
	// 		if(event.target.nodeName == "INPUT" && $.inArray(event.target.type, textAcceptingInputTypes) > -1){
	// 			console.log("Twitter.");
	// 			chrome.runtime.sendMessage({method: "getKeyValue", key: "twitter"}, function(response){
	// 				console.log(response);
	// 				if(response.status == "success" && response.type == "string"){
	// 					e.target.value = response.link;
	// 				}
	// 			});
	// 		}
	// 	}
	// 	else if(e.which == 70 && e.shiftKey && e.altKey){ // 'F'
	// 		if(event.target.nodeName == "INPUT" && $.inArray(event.target.type, textAcceptingInputTypes) > -1){
	// 			console.log("Facebook.");
	// 			chrome.runtime.sendMessage({method: "getKeyValue", key: "facebook"}, function(response){
	// 				console.log(response);
	// 				if(response.status == "success" && response.type == "string"){
	// 					e.target.value = response.link;
	// 				}
	// 			});
	// 		}
	// 	}
	// 	else if(e.which == 80 && e.shiftKey && e.altKey){ // 'P'
	// 		if(event.target.nodeName == "INPUT" && $.inArray(event.target.type, textAcceptingInputTypes) > -1){
	// 			console.log("Personal.");
	// 			chrome.runtime.sendMessage({method: "getKeyValue", key: "personal"}, function(response){
	// 				console.log(response);
	// 				if(response.status == "success" && response.type == "string"){
	// 					e.target.value = response.link;
	// 				}
	// 			});
	// 		}
	// 	}
	// });
});
