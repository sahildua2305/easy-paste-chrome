/*
* @Author: sahildua2305
* @Date:   2016-05-01 07:29:02
* @Last Modified by:   Sahil Dua
* @Last Modified time: 2016-05-02 01:59:11
*/


$("#save_links").on('click', function(e){
	console.log("Request for saving links in storage");

	var user_links = {};
	user_links['linkedin'] = "https://linkedin.com/in/sahildua2305";
	user_links['github'] = "https://github.com/sahildua2305";
	user_links['personal'] = "http://sahildua.com";
	chrome.storage.local.set(user_links);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.method && request.key){
		if(request.method == "getKeyValue"){
			chrome.storage.local.get(request.key, function(links){
				sendResponse({
					data: "value from extension localstorage",
					link: links[request.key]
				});
			});
		}
	}
	else{
		// snub them
		sendResponse({});
		console.log("a");
	}
});
