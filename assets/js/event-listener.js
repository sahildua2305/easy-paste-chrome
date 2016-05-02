/*
* @Author: sahildua2305
* @Date:   2016-05-02 02:10:18
* @Last Modified by:   Sahil Dua
* @Last Modified time: 2016-05-02 21:37:26
*/


$("#save_links").on('click', function(e){
	console.log("Request for saving links in storage");

	localStorage.setItem("linkedin", "https://linkedin.com/in/sahildua2305");
	localStorage.setItem("github", "https://github.com/sahildua2305");
	localStorage.setItem("twitter", "https://twitter.com/sahildua2305");
	localStorage.setItem("facebook", "http://fb.me/iamsahildua");
	localStorage.setItem("personal", "http://sahildua.com");

	console.log(localStorage.getItem("linkedin"));
	console.log(localStorage.getItem("github"));
	console.log(localStorage.getItem("twitter"));
	console.log(localStorage.getItem("facebook"));
	console.log(localStorage.getItem("personal"));
});
