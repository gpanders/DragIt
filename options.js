var defaults = {
    searchEngine: 'http://www.google.com/search?&q=',
    ignoreInput: true
}

function fadeOut(elem, time) {
    if (elem.style.opacity === '') elem.style.opacity = '1';
    var f = function() {
        if (elem.style.opacity <= 0) {
            elem.className += 'hidden';
            elem.style.opacity = '1';
            return;
        }
        elem.style.opacity -= 0.01;
        setTimeout(f, time / 100);
    };
    f();
}

function updateDOM(opts) {
    document.getElementById('search-engine').value = opts.searchEngine;
    document.getElementById('ignore-input').checked = opts.ignoreInput;
}

function saveSearchEngine() {
    var searchEngine = document.getElementById('search-engine').value;
    chrome.storage.sync.set({
        searchEngine: searchEngine
    }, function() {
        var status = document.getElementById('status');
        status.className = '';
        setTimeout(function() {
            fadeOut(status, 750);
        }, 1500);
    });
}

function saveIgnoreInput() {
    var ignoreInput = document.getElementById('ignore-input').checked;
    chrome.storage.sync.set({
        ignoreInput: ignoreInput
    });
}

function resetOptions() {
    var opts = {
        searchEngine: defaults.searchEngine,
        ignoreInput: defaults.ignoreInput
    };
    updateDOM(opts);
    chrome.storage.sync.set(opts, confirmSave);
}

// Update status to let user know options were saved.
function confirmSave() {
    var status = document.getElementById('status');
    status.innerHTML = "Search Engine Saved";
    setTimeout(function() {
        status.innerHTML = "<br />";
    }, 1500);
}

// Restores select box state to saved value from localStorage.
function restoreOptions() {
    chrome.storage.sync.get({
        searchEngine: defaults.searchEngine,
        ignoreInput: defaults.ignoreInput
    }, updateDOM);
}

document.getElementById('save-search-engine').addEventListener('click', saveSearchEngine);
document.getElementById('ignore-input').addEventListener('change', saveIgnoreInput);

document.addEventListener('DOMContentLoaded', restoreOptions);