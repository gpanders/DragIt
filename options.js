// Saves options to localStorage.
function save_options() {
  var search_engine = document.getElementById("search_engine").value;
  localStorage["search_engine"] = search_engine;
  confirm_save()
}

function reset_options() {
  localStorage["search_engine"] = "http://www.google.com/search?&q=";
  var search_engine = localStorage["search_engine"];
  document.getElementById("search_engine").value = search_engine;
  confirm_save()
}

// Update status to let user know options were saved.
function confirm_save() {
  var status = document.getElementById("status");
  status.innerHTML = "Search Engine Saved";
  setTimeout(function() {
    status.innerHTML = "<br>";
  }, 1500);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var search_engine = localStorage["search_engine"];
  if (!search_engine) {
    reset_options();
  }
  document.getElementById("search_engine").value = search_engine;
  document.getElementById("save").addEventListener('click', save_options);
  document.getElementById("reset").addEventListener('click', reset_options);
}
document.addEventListener('DOMContentLoaded', restore_options);
