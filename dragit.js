var ignoreInput = true;

function cancel(e) {
    if (!targetIsInput(e)) {
        if (e.preventDefault) e.preventDefault();
        return false;
    }
}

function dragStart(e) {
	start_x = e.screenX;
}

function targetIsInput(e) {
    if (ignoreInput === false) return false;

    var nodeName = String(e.target.nodeName).toLowerCase();
    var type = e.target.type;
    if (nodeName === 'textarea' ||
        (nodeName === 'input' &&
         (type === 'text' || type === 'number'))) {
        return true;
    }
    return false;
}

document.addEventListener('dragstart', dragStart, false);
document.addEventListener('dragover', cancel, false);
document.addEventListener('drop', function (e) {
    if (targetIsInput(e)) return;

	if (e.preventDefault) e.preventDefault();

    var x_dir = (e.screenX < start_x) ? -1 : 1;
	var data = e.dataTransfer.getData('URL') || e.dataTransfer.getData('Text');

	if (data) {
		chrome.extension.connect().postMessage({
			message: 'tab',
            values: data,
            x_dir: x_dir
		});
		return false;
	}
});

chrome.storage.sync.get(function(items) {
    ignoreInput = items.ignoreInput;
});

chrome.storage.onChanged.addListener(function(changes) {
    if (changes.hasOwnProperty('ignoreInput')) {
        ignoreInput = changes.ignoreInput.newValue;
    }
});
