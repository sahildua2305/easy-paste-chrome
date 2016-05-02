/*
* @Author: sahildua2305
* @Date:   2016-05-01 07:26:20
* @Last Modified by:   Sahil Dua
* @Last Modified time: 2016-05-03 02:39:40
*/


var element;

document.addEventListener("contextmenu", function(e){
	console.log(e);
	element = e.target;
});

var textAcceptingInputTypes = [
	"text",
	"url",
	"search",
	"tel",
	"password"
];

var forbiddenTextAcceptingInputTypes = [
	"number",
	"email",
	"range",
	"date",
	"month",
	"week",
	"time",
	"datetime",
	"datetime-local",
	"color"
];

function getCaretPosition(field){
	// initialize
	var caretPos = 0;

	if($.inArray(field.type, textAcceptingInputTypes) > -1){
		// Standard-compliant browsers
		caretPos = field.selectionStart;
	}
	else if('selectionStart' in field && $.inArray(field.type, forbiddenTextAcceptingInputTypes) == -1){
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
});
