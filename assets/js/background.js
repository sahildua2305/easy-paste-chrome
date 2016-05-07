/*
* @Author: sahildua2305
* @Date:   2016-05-01 07:29:02
* @Last Modified by:   Sahil Dua
* @Last Modified time: 2016-05-08 04:21:43
*/


var parent = chrome.contextMenus.create({
	"title": "Paste easy link here",
	"contexts": ["editable"],
	"onclick": pasteLink
});

var linkedin = chrome.contextMenus.create({
	"title": "LinkedIn",
	"parentId": parent,
	"contexts": ["editable"],
	"onclick": pasteLink
});

var github = chrome.contextMenus.create({
	"title": "GitHub",
	"parentId": parent,
	"contexts": ["editable"],
	"onclick": pasteLink
});

var twitter = chrome.contextMenus.create({
	"title": "Twitter",
	"parentId": parent,
	"contexts": ["editable"],
	"onclick": pasteLink
});

var facebook = chrome.contextMenus.create({
	"title": "Facebook",
	"parentId": parent,
	"contexts": ["editable"],
	"onclick": pasteLink
});

var personal = chrome.contextMenus.create({
	"title": "Personal Website",
	"parentId": parent,
	"contexts": ["editable"],
	"onclick": pasteLink
});

function pasteLink(info, tab){

	var requested_key, requested_link, status;

	if(info.menuItemId == linkedin){
		requested_key = "linkedin";
	}
	else if(info.menuItemId == github){
		requested_key = "github";
	}
	else if(info.menuItemId == twitter){
		requested_key = "twitter";
	}
	else if(info.menuItemId == facebook){
		requested_key = "facebook";
	}
	else if(info.menuItemId == personal){
		requested_key = "personal";
	}

	//Add all you functional Logic here
	chrome.tabs.query({
		"active": true,
		"currentWindow": true
	}, function (tabs) {
		requested_link = localStorage.getItem(requested_key);
		status = "success";
		if(typeof requested_link == "object" || requested_link == ""){
			status = "fail";
		}

		// send message to the current tab
		chrome.tabs.sendMessage(tabs[0].id, {
			status: status,
			link: requested_link,
			type: typeof requested_link
		});
	});
}
