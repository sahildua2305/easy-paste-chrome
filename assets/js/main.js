/*
* @Author: sahildua2305
* @Date:   2016-05-01 07:26:20
* @Last Modified by:   Sahil Dua
* @Last Modified time: 2016-05-03 01:34:24
*/


var element;

document.addEventListener("contextmenu", function(e){
	console.log(e);
	console.log(e.target.selectionStart);
	element = e.target;
});

function getCaretPosition(field){
	// initialize
	var caretPos = 0;

	if('selectionStart' in field){
		// Standard-compliant browsers
		caretPos = field.selectionStart;
	}
	else if(document.selection){
		// IE support

		// set focus on the element
		field.focus();

		// to get cursor position, get empty selection range
		var sel = document.selection.createRange();

		// move selection start to 0 position
		sel.moveStart('character', -field.value.length);

		// the caret position is selection length
		caretPos = sel.text.length;
	}

	return caretPos;
}

$(document).on('ready', function(){
	console.log("loaded");

	chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
		console.log(message);
		console.log(element);
		if(message.status == "success" && message.type == "string"){
			var caretPos = getCaretPosition(element);
			var initialValue = element.value;
			if(caretPos == initialValue.length){
				// this means caret is at the end of the string,
				// so simply append the link
				element.value = initialValue + message.link;
			}
			else{
				// split the string into 2 parts at the caretPos
				// and add the link in between
				var firstPart = initialValue.substr(0, caretPos);
				var lastPart = initialValue.substr(caretPos);
				element.value = firstPart + message.link + lastPart;
			}
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
