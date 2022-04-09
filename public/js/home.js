var slider = document.getElementById("BPM_Range");
var slider_output = document.getElementById("BPM_Val");
var custom_bpm = document.getElementById("BPM_Custom"); 
var checkBox = document.getElementById("vibration_switch");

slider_output.innerHTML = slider.value;

slider.oninput = function() {
	slider_output.innerHTML = this.value;
}
if (custom_bpm) {
	custom_bpm.addEventListener('change', (event) => {
		changed_value = event.target.value;
		//adding a max of 3000 for the custom bpm becasue of limits of the phone vibration
		if (changed_value > 3000) {
			changed_value = 3000;
			custom_bpm.value = 3000;
		}

		slider_output.innerHTML = changed_value;
		//change the slider value only if the custom value is within the range of the slider
		if (changed_value > 1200)
			slider.value = changed_value;
		console.log('Cusom bpm event with value: ' + changed_value);
	});
}
let vibrateIntervalId = 0;

const startVibrate = () => {
	clearInterval(vibrateIntervalId);
	console.log("Vibrating");
	vibrateIntervalId = setInterval(() => navigator.vibrate(1000), 1000);
};
const stopVibrate = () => {
    clearInterval(vibrateIntervalId);
	console.log("Stopping Vibrating");
    navigator.vibrate(0);
};

document.getElementById('vibration_switch').addEventListener('change', (event) => {
	//event
	var doVibrate = event.currentTarget.checked;

	//Cancel event if vibration is not supported
	//Only alert if they are trying to turn "on" vibrate
	if (!("vibrate" in navigator)) {
		if (doVibrate === 'true') {
			alert("Vibrate not supported!");
		}
		return;
	}

	if (doVibrate === true) {
		startVibrate();
	}
	else {
		stopVibrate();
	}
	console.log("Change event: " + event.currentTarget.checked);
});
