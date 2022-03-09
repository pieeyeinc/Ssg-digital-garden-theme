	window.onload = function() {
		var id = document.querySelector("input[name=dsr_req_id]").value;
		if (id != null) {
			document.title += " " + id;
			document.getElementById('sa').append(
					document.createTextNode(id));
		}
	};
