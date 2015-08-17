var version = "1.2"

if (localStorage.firstrun == undefined) {
	localStorage.firstrun = 0;
	localStorage.version = version;
}
if (localStorage.version !== version) {
	localStorage.version = version;
}

var engine = localStorage["search_engine"];
if (!engine) {
	localStorage["search_engine"] = "http://www.google.com/search?&q=";
}

chrome.extension.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(data) {
		if (data.message == 'tab') {
			chrome.tabs.getSelected(null, function(tab){
				var fg = (data.x_dir == 1);
				var re = /https?:\/\/([-\w\.]+)+(:\d+)?(\/([-\w\/_~\.,#%=]*(\?\S+)?)?)?/;
				var re2 = /www\.[-\w\.]+(\/[\S]*)*/;
				var matches = data.values.match(re);
				var link;
				if (matches) {
					link = matches[0];	    
				} else {
					matches = data.values.match(re2);
					if (matches) {
						link = "http://" + matches[0];
					} else {
						var engine = localStorage["search_engine"];
						link = engine + data.values;
					}
	      }
	      chrome.tabs.create({'url' : link, 'selected' : fg});});
	}
  });
});
