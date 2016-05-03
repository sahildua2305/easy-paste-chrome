/*
* @Author: sahildua2305
* @Date:   2016-05-01 07:29:02
* @Last Modified by:   Sahil Dua
* @Last Modified time: 2016-05-04 03:21:49
*/


alert("err");

var linkedin = 0, github = 0, twitter = 0, facebook = 0, personal = 0;

var parent = chrome.contextMenus.create({
	"title": "Paste easy link here",
	"contexts": ["editable"],
	"onclick": pasteLink
});

var linkedin_link = localStorage.getItem("linkedin");
if(typeof linkedin_link != "object" && linkedin_link != ""){
	linkedin = chrome.contextMenus.create({
		"title": "LinkedIn",
		"parentId": parent,
		"contexts": ["editable"],
		"onclick": pasteLink
	});
}

var github_link = localStorage.getItem("github");
if(typeof github_link != "object" && github_link != ""){
	github = chrome.contextMenus.create({
		"title": "GitHub",
		"parentId": parent,
		"contexts": ["editable"],
		"onclick": pasteLink
	});
}

var twitter_link = localStorage.getItem("twitter");
if(typeof twitter_link != "object" && twitter_link != ""){
	twitter = chrome.contextMenus.create({
		"title": "Twitter",
		"parentId": parent,
		"contexts": ["editable"],
		"onclick": pasteLink
	});
}

var facebook_link = localStorage.getItem("facebook");
if(typeof facebook_link != "object" && facebook_link != ""){
	facebook = chrome.contextMenus.create({
		"title": "Facebook",
		"parentId": parent,
		"contexts": ["editable"],
		"onclick": pasteLink
	});
}

var personal_link = localStorage.getItem("personal");
if(typeof personal_link != "object" && personal_link != ""){
	personal = chrome.contextMenus.create({
		"title": "Personal Website",
		"parentId": parent,
		"contexts": ["editable"],
		"onclick": pasteLink
	});
}

function pasteLink(info, tab){
	console.log("item " + info.menuItemId + " was clicked");
	console.log("info: " + JSON.stringify(info));
	console.log("tab: " + JSON.stringify(tab));

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
