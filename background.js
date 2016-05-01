/*
* @Author: sahildua2305
* @Date:   2016-05-01 07:29:02
* @Last Modified by:   sahildua2305
* @Last Modified time: 2016-05-01 08:27:11
*/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.method && request.key){
		if(request.method == "getKeyValue"){
			sendResponse({data: "linkedin value from extension localstorage"});
			console.log("s");
		}
	}
	else{
		// snub them
		sendResponse({});
		console.log("a");
	}
});
