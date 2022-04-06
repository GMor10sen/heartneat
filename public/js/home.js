var slider = document.getElementById("BPM_Range");
var slider_output = document.getElementById("BPM_Val");
slider_output.innerHTML = slider.value;

slider.oninput = function() {
	slider_output.innerHTML = this.value;
	console.log("Heartbeat value: " + this.value);
}