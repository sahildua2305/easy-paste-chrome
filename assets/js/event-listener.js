/*
* @Author: sahildua2305
* @Date:   2016-05-02 02:10:18
* @Last Modified by:   Prabhakar Gupta
* @Last Modified time: 2016-07-19 01:20:44
*/

var list_keys = ['linkedin', 'github', 'twitter', 'facebook', 'personal', 'email'];
var custom_count = localStorage.getItem('custom_count');
//First run will return null for custom count, hence initialised to 0.
if(custom_count === null) 
	custom_count = 0;
function updateUI(flag){
		//If not called from saved_links, we probably need to add html for the custom fields already in storage.
	var temp = localStorage.getItem('custom_count');
	if(temp === null)
		temp = 0;
	if(flag == true) {
		console.log(temp);
		for(var i = 0 ; i < temp ; i++) {
			var id = 'custom' + i.toString();
			var html = "<div class=\"form-group\"><div class=\"col-md-8 col-sm-8\"><div class=\"input-group\"><div class=\"input-group-addon\"><i class=\"fa fa-external-link-square\"></i></div><input type=\"text\" class=\"form-control\" id=" + id + " placeholder=\"Custom link\"></div></div></div>"
			$('#custom').append(html);			
		}
		console.log(list_keys.toString());
		for(var i = 0 ; i < temp ; i++)
			list_keys.push('custom' + i.toString());
		console.log(list_keys.toString());
	}
	console.log(list_keys);
	// chrome.runtime.sendMessage({method:"createContextMenu", key:list_keys.toString()}, function(response){});
	for(var i in list_keys){
		var key = list_keys[i];
		var link = localStorage.getItem(key);
		// console.log(key + " : " + typeof link);
		if(typeof link == "string"){
			document.getElementById(key).value = link;
		}
		else{
			document.getElementById(key).value = "";
		}
	}
	console.log('Updating UI');
}

function animate_text(id){
	var text_div = $(id)
	
	text_div.show();
	text_div.fadeOut(2000);
}

$(document).on('ready', function(){

	$("#save_links").on('click', function(e){
		document.getElementById("save_links").innerHTML = "Saving..";
		for(var i in list_keys){
			var key = list_keys[i];
			var newValue = document.getElementById(key).value;
			localStorage.setItem(key, newValue);
		}
		// trigger to show the saved links
		updateUI();
		animate_text("#success_text");

		document.getElementById("save_links").innerHTML = "Save links";
	});

	$("#remove").on("click", function(){
		localStorage.clear();
		localStorage.setItem('custom_count', 0);
		updateUI(true);
		animate_text("#remove_text")
	});
	$("#add_link").on('click', function(e) {
		temp = localStorage.getItem('custom_count');
		if(temp === null)
			temp = 0;
		var id = 'custom' + temp.toString()
		var html = "<div class=\"form-group\"><div class=\"col-md-8 col-sm-8\"><div class=\"input-group\"><div class=\"input-group-addon\"><i class=\"fa fa-external-link-square\"></i></div><input type=\"text\" class=\"form-control\" id=" + id + " placeholder=\"Custom link\"></div></div></div>"
		$('#custom').append(html);
		list_keys.push("custom" + temp.toString());
		console.log(list_keys.toString());
		temp = parseInt(temp) + 1;
		localStorage.setItem('custom_count', temp);
		console.log(temp);
	});

	// trigger to show the saved links
	updateUI(true);

});