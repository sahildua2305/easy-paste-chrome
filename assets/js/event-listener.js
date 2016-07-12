/*
* @Author: sahildua2305
* @Date:   2016-05-02 02:10:18
* @Last Modified by:   Prabhakar Gupta
* @Last Modified time: 2016-07-11 00:36:38
*/

$(document).on('ready', function(){

	var list_keys = ['linkedin', 'github', 'twitter', 'facebook', 'personal'];
	var custom_count = localStorage.getItem('custom_count');
	//First run will return null for custom count, hence initialised to 0.
	if(custom_count === null) 
		custom_count = 0;
	// updateUI show saved links when popup page is opened by clicking on browser icon
	function updateUI(flag){
		//If not called from saved_links, we probably need to add html for the custom fields already in storage.
		if(flag == true) {
			for(var i = 0 ; i < custom_count ; i++) 
				$('#custom').append('<div class="form-group"><label for="custom" class="col-md-2 col-sm-2 control-label">Custom Link</label><div class="col-md-8 col-sm-8"><input type="text" class="form-control" id="custom' + i.toString() + '" placeholder="Custom Link"></div></div>')
			for(var i = 0 ; i < custom_count ; i++)
				list_keys.push('custom' + i.toString());
		}
		console.log(list_keys);
		// chrome.runtime.sendMessage({method:"createContextMenu", key:list_keys.toString()}, function(response){});
		for(var i in list_keys){
			var key = list_keys[i];
			var link = localStorage.getItem(key);
			if(typeof link == "string"){
				document.getElementById(key).value = link;
			}
			else{
				document.getElementById(key).value = "";
			}
		}
		console.log('Updating UI');
	}

	$("#save_links").on('click', function(e){

		document.getElementById("save_links").innerHTML = "Saving..";

		for(var i in list_keys){
			var key = list_keys[i];
			var newValue = document.getElementById(key).value;
			localStorage.setItem(key, newValue);
		}

		// trigger to show the saved links
		updateUI();

		document.getElementById("save_links").innerHTML = "Save links";
	});

	/**
	 * Called on Add Custom Link Button
	 * TextBox added to the div with id 'custom' 
	 * Currently once you press add link, it will thus be appended and even if empty will show up in the list again.
	 */
	$("#add_link").on('click', function(e) {
		/*
		<div class="form-group">
					<div class="col-md-8 col-sm-8">
						<div class="input-group">
							<div class="input-group-addon"><i class="fa fa-globe"></i></div>
							<input type="text" class="form-control" id="personal" placeholder="Personal website link">
						</div>
					</div>
				</div>
		*/
		$('#custom').append('<div class="form-group"><div class="col-md-8 col-sm-8"><div class="input-group"><div class="input-group-addon"><i class="fa fa-external-link-square"></i></div><input type="text" class="form-control" id="' + custom_count.toString() + '" placeholder="Custom link"></div></div></div>')
		list_keys.push('custom' + custom_count.toString());
		custom_count += 1;
		localStorage.setItem('custom_count', custom_count);
	});
	
	// trigger to show the saved links
	updateUI(true);

});