var version = '1.2';

chrome.storage.sync.get(function(items) {
	if (items.firstrun === undefined) {
		chrome.storage.sync.set({
			firstrun: 0,
			version: version
		});
	} else if (items.version !== version) {
		chrome.storage.sync.set({
			version: version
		});
	}

	var engine = items.searchEngine || 'http://www.google.com/search?&q=';

	chrome.storage.onChanged.addListener(function(changes) {
		if (changes.hasOwnProperty('searchEngine')) {
			engine = changes.searchEngine.newValue;
		}
	});

	chrome.extension.onConnect.addListener(function(port) {
		port.onMessage.addListener(function(data) {
			if (data.message === 'tab') {
				chrome.tabs.getSelected(null, function(tab) {
					var fg = (data.x_dir === 1);
					var re = /https?:\/\/([-\w\.]+)+(:\d+)?(\/([-\w\/_~\.,#%=]*(\?\S+)?)?)?/;
					var re2 = /www\.[-\w\.]+(\/[\S]*)*/;
					var matches = data.values.match(re);
					var link;
					if (matches) {
						link = matches[0];
					} else {
						matches = data.values.match(re2);
						link = matches ? ('http://' + matches[0]) : (engine + data.values);
		    		}
		    		chrome.tabs.create({'url' : link, 'selected' : fg});
		    	});
			}
	  	});
	});
});
