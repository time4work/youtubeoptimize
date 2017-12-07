(function () {
	var YOUTUBE_API_KEY = "AIzaSyDOMIdZODkA7HNv6iczjn6Zh_f2jmM7_1U"; 

	[].forEach.call(document.getElementsByTagName('iframe'), function(e) {
		var id = e.src.match(/embed\/(\w+)/i)[1];
		var url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+id+"&key="+YOUTUBE_API_KEY;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var responseObject = JSON.parse(this.response);
				console.log(responseObject)
				var video = responseObject.items[0].snippet;
				var jsonld = {
					"@context": "http://schema.org",
					"@type": "VideoObject",
					"name": video.title,
					"description": video.description,
					"thumbnailUrl": [
						video.thumbnails.default.url,
						video.thumbnails.medium.url,
						video.thumbnails.high.url,
						video.thumbnails.maxres.url,
					],
					"uploadDate": video.publishedAt,
					"contentUrl": "https://www.youtube.com/watch?v="+responseObject.items[0].id,
					"embedUrl": "https://www.youtube.com/embed/"+responseObject.items[0].id,
				}
				var el = document.createElement('script');
				el.type = 'application/ld+json';
				el.text = JSON.stringify(jsonld);
				document.querySelector('head').appendChild(el);
			}
		};
		xhttp.open("GET", url, true);
		xhttp.send();
	});
})();