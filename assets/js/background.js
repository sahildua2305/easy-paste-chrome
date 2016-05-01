/*
* @Author: sahildua2305
* @Date:   2016-05-01 07:29:02
* @Last Modified by:   Sahil Dua
* @Last Modified time: 2016-05-02 02:21:12
*/


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.method && request.key){
		if(request.method == "getKeyValue"){
			var requested_link = localStorage.getItem(request.key);
			var status = "success";
			if(typeof requested_link == "object"){
				status = "fail";
			}
			sendResponse({
				status: status,
				link: requested_link,
				type: typeof requested_link
			});
		}
	}
	else{
		// snub them
		sendResponse({});
		console.log("a");
	}
});
