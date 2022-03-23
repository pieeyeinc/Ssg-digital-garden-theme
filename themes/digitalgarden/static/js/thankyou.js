	window.onload = function() {
	    const urlParams = new URLSearchParams(window.location.search);
	    const id = urlParams.get("id");
	    if (id != null) {
	        document.title += " " + id;
	        document.getElementById('sa').append(
	            document.createTextNode(id));
	    }
	};