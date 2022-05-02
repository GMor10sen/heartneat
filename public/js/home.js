// const { set } = require("express/lib/application");

var slider = document.getElementById("BPM_Range");
var slider_output = document.getElementById("BPM_Val");
var custom_bpm = document.getElementById("BPM_Custom"); 
var checkBox = document.getElementById("vibration_switch");
var heartbeat_audio = new Audio('/sound/heartbeat-04.mp3');
heartbeat_audio.playbackRate=2;
let vibrateIntervalId = 0;
let soundIntervalId = 0;

slider_output.innerHTML = slider.value;

window.addEventListener('load', function() {

	var rangeslider = document.getElementById("BPM_Range");

	if (!("vibrate" in navigator) || !isMobile()) {
		document.getElementById('vibration_switch').checked = true;
		//heartbeat_audio.play();
	}
	else {
		startVibrate(false);
	}
	var images = document.getElementById("sliderImages");

	rangeslider.addEventListener('input', function() {
	  for (var i = 0; i < images.children.length; i++) {
		images.children[i].style.display = 'none';
	  }
	  i = Number(this.value) - 1;
	  if (rangeslider.value < 2) {
		//tombstone animation
		images.children[0].style.display = 'block';
		handleAnimationChange(images.children[0], 'tomb_animation');
	  } else if ((rangeslider.value >= 2) && (rangeslider.value <= 35)) {
		//whale animation
		images.children[4].style.display = 'block';
		handleAnimationChange(images.children[4], 'whale_animation');
	  } else if ((rangeslider.value > 35) && (rangeslider.value <= 55)) {
		//ant animation
	  	images.children[1].style.display = 'block';
		handleAnimationChange(images.children[1], 'ants_animation');
	  }
	  else if((rangeslider.value > 55) && (rangeslider.value <= 100)){
		//resting human heart
		images.children[2].style.display = 'block';
		handleAnimationChange(images.children[2], 'heart');
	  } else if((rangeslider.value > 100) && (rangeslider.value <= 180)){
		//exercising human
		images.children[3].style.display = 'block';
		handleAnimationChange(images.children[3], 'weight_animation');
	  } else if((rangeslider.value > 750) && (rangeslider.value <= 1200)){
		  //pigmy shrew will go here
		  images.children[5].style.display = 'block';
		handleAnimationChange(images.children[5], 'shrew_animation');
	  } else {
		for (var i = 0; i < images.children.length; i++) {
			images.children[i].style.display = 'none';
		}
	  }

	});
});

function handleAnimationChange(element, changingClass) {
	if (document.getElementById('amimation_switch').checked) {
		element.classList.remove(changingClass);
	}
	else {
		element.classList.add(changingClass);
	}
}

slider.oninput = function() {
	slider_output.innerHTML = this.value;
	var canVibrate = !document.getElementById('vibration_switch').checked;
	if (canVibrate) { 
		changeVibrate(this.value, false);
	}
	else {
		changeVibrate(this.value, true);
	}
	
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
		if (changed_value < 1200)
			slider.value = changed_value;
		console.log('Cusom bpm event with value: ' + changed_value);
	});
}


const startVibrate = (isSound) => {
	clearInterval(vibrateIntervalId);
	clearInterval(soundIntervalId);
	var value = Math.floor(1000 / (slider.value / 60));
	console.log("Vibrating at: " + slider.value + " BPM");
	if (isSound){
		navigator.vibrate(0);
		heartbeat_audio.playbackRate = Math.floor(slider.value / 60) > 16 ? 16 : Math.floor(slider.value / 60);
		soundIntervalId = setInterval(() => heartbeat_audio.play(), value);
	}
	else {
		vibrateIntervalId = setInterval(() => navigator.vibrate(50), value);
	}
};
const stopVibrate = () => {
    clearInterval(vibrateIntervalId);
	clearInterval(soundIntervalId);
	var value = Math.floor(1000 / (slider.value / 60));
	console.log("Stopping Vibrating");
    navigator.vibrate(0);
	soundIntervalId = setInterval(() => heartbeat_audio.play(), value);
};

const changeVibrate = (val, isSound) => {
	clearInterval(vibrateIntervalId);
	clearInterval(soundIntervalId);
	var value = Math.floor(1000 / (val / 60));
	console.log("Changing vibration to: " + val + " BPM");
	if (isSound){
		navigator.vibrate(0);
		heartbeat_audio.playbackRate = Math.floor(val / 60) > 16 ? 16 : Math.floor(val / 60);
		soundIntervalId = setInterval(() => heartbeat_audio.play(), value);
	}
	else {
		vibrateIntervalId = setInterval(() => navigator.vibrate(50), value);
	}

};
document.getElementById('vibration_switch').addEventListener('change', (event) => {
	//event
	var doNotVibrate = event.currentTarget.checked;

	//Cancel event if vibration is not supported
	if (!("vibrate" in navigator) || !isMobile()) {
		if (doNotVibrate === false) {
			//Only alert if they are trying to turn "on" vibrate
			alert("Vibrate not supported!");
			event.currentTarget.checked = true;
			startVibrate(true);
		}
		return;
	}

	if (doNotVibrate === false) {
		startVibrate(false);
	}
	else {
		startVibrate(true);
	}
	console.log("Change event: " + event.currentTarget.checked);
});

const isMobile = () => {
    const nav = navigator.userAgent.toLowerCase();
    return (
        nav.match(/iphone/i) || nav.match(/ipod/i) || nav.match(/ipad/i) || nav.match(/android/i)
    );
};

function yesnoCheck() {

    if (document.getElementById('Little').checked) {

        document.getElementById('littleInfo1').style.display = 'block';
		document.getElementById('littleInfo2').style.display = 'none';
		document.getElementById('littleInfo3').style.display = 'block';
		document.getElementById('littleInfo4').style.display = 'none';
		document.getElementById('littleInfo01').style.display = 'none';

		document.getElementById('littleInfo5').style.display = 'block';
		document.getElementById('littleInfo6').style.display = 'none';
		document.getElementById('littleInfo7').style.display = 'block';
		document.getElementById('littleInfo8').style.display = 'none';
		document.getElementById('littleInfo02').style.display = 'none';

		document.getElementById('littleInfo9').style.display = 'block';
		document.getElementById('littleInfo10').style.display = 'none';
		document.getElementById('littleInfo11').style.display = 'block';
		document.getElementById('littleInfo12').style.display = 'none';
		document.getElementById('littleInfo03').style.display = 'none';

		document.getElementById('littleInfo13').style.display = 'block';
		document.getElementById('littleInfo14').style.display = 'none';
		document.getElementById('littleInfo15').style.display = 'block';
		document.getElementById('littleInfo16').style.display = 'none';
		document.getElementById('littleInfo04').style.display = 'none';
		document.getElementById('littleInfo05').style.display = 'none';

		document.getElementById('littleInfo17').style.display = 'block';
		document.getElementById('littleInfo18').style.display = 'none';
		document.getElementById('littleInfo19').style.display = 'block';
		document.getElementById('littleInfo20').style.display = 'none';
		document.getElementById('littleInfo06').style.display = 'none';
		document.getElementById('littleInfo07').style.display = 'none';

		document.getElementById('littleInfo21').style.display = 'block';
		document.getElementById('littleInfo22').style.display = 'none';
		document.getElementById('littleInfo23').style.display = 'block';
		document.getElementById('littleInfo24').style.display = 'none';
		document.getElementById('littleInfo08').style.display = 'none';
		document.getElementById('littleInfo09').style.display = 'none';

		document.getElementById('littleInfo25').style.display = 'block';
		document.getElementById('littleInfo26').style.display = 'none';
		document.getElementById('littleInfo27').style.display = 'block';
		document.getElementById('littleInfo28').style.display = 'none';
		document.getElementById('littleInfo010').style.display = 'none';

    } else if(document.getElementById('Medium').checked){
        
		document.getElementById('littleInfo1').style.display = 'block';
		document.getElementById('littleInfo2').style.display = 'none';
		document.getElementById('littleInfo3').style.display = 'block';
		document.getElementById('littleInfo4').style.display = 'block';
		document.getElementById('littleInfo01').style.display = 'none';

		document.getElementById('littleInfo5').style.display = 'block';
		document.getElementById('littleInfo6').style.display = 'none';
		document.getElementById('littleInfo7').style.display = 'block';
		document.getElementById('littleInfo8').style.display = 'block';
		document.getElementById('littleInfo02').style.display = 'none';

		document.getElementById('littleInfo9').style.display = 'block';
		document.getElementById('littleInfo10').style.display = 'none';
		document.getElementById('littleInfo11').style.display = 'block';
		document.getElementById('littleInfo12').style.display = 'block';
		document.getElementById('littleInfo03').style.display = 'none';

		document.getElementById('littleInfo13').style.display = 'block';
		document.getElementById('littleInfo14').style.display = 'none';
		document.getElementById('littleInfo15').style.display = 'block';
		document.getElementById('littleInfo16').style.display = 'block';
		document.getElementById('littleInfo04').style.display = 'none';
		document.getElementById('littleInfo05').style.display = 'none';

		document.getElementById('littleInfo17').style.display = 'block';
		document.getElementById('littleInfo18').style.display = 'none';
		document.getElementById('littleInfo19').style.display = 'block';
		document.getElementById('littleInfo20').style.display = 'block';
		document.getElementById('littleInfo06').style.display = 'none';
		document.getElementById('littleInfo07').style.display = 'none';

		document.getElementById('littleInfo21').style.display = 'block';
		document.getElementById('littleInfo22').style.display = 'none';
		document.getElementById('littleInfo23').style.display = 'block';
		document.getElementById('littleInfo24').style.display = 'block';
		document.getElementById('littleInfo08').style.display = 'none';
		document.getElementById('littleInfo09').style.display = 'none';

		document.getElementById('littleInfo25').style.display = 'block';
		document.getElementById('littleInfo26').style.display = 'none';
		document.getElementById('littleInfo27').style.display = 'block';
		document.getElementById('littleInfo28').style.display = 'block';
		document.getElementById('littleInfo010').style.display = 'none';

	} else if(document.getElementById('Lot').checked) {
        
		document.getElementById('littleInfo1').style.display = 'block';
		document.getElementById('littleInfo2').style.display = 'block';
		document.getElementById('littleInfo3').style.display = 'block';
		document.getElementById('littleInfo4').style.display = 'block';
		document.getElementById('littleInfo01').style.display = 'block';

		document.getElementById('littleInfo5').style.display = 'block';
		document.getElementById('littleInfo6').style.display = 'block';
		document.getElementById('littleInfo7').style.display = 'block';
		document.getElementById('littleInfo8').style.display = 'block';
		document.getElementById('littleInfo02').style.display = 'block';

		document.getElementById('littleInfo9').style.display = 'block';
		document.getElementById('littleInfo10').style.display = 'block';
		document.getElementById('littleInfo11').style.display = 'block';
		document.getElementById('littleInfo12').style.display = 'block';
		document.getElementById('littleInfo03').style.display = 'block';

		document.getElementById('littleInfo13').style.display = 'block';
		document.getElementById('littleInfo14').style.display = 'block';
		document.getElementById('littleInfo15').style.display = 'block';
		document.getElementById('littleInfo16').style.display = 'block';
		document.getElementById('littleInfo04').style.display = 'block';
		document.getElementById('littleInfo05').style.display = 'block';

		document.getElementById('littleInfo17').style.display = 'block';
		document.getElementById('littleInfo18').style.display = 'block';
		document.getElementById('littleInfo19').style.display = 'block';
		document.getElementById('littleInfo20').style.display = 'block';
		document.getElementById('littleInfo06').style.display = 'block';
		document.getElementById('littleInfo07').style.display = 'block';

		document.getElementById('littleInfo21').style.display = 'block';
		document.getElementById('littleInfo22').style.display = 'block';
		document.getElementById('littleInfo23').style.display = 'block';
		document.getElementById('littleInfo24').style.display = 'block';
		document.getElementById('littleInfo08').style.display = 'block';
		document.getElementById('littleInfo09').style.display = 'block';

		document.getElementById('littleInfo25').style.display = 'block';
		document.getElementById('littleInfo26').style.display = 'block';
		document.getElementById('littleInfo27').style.display = 'block';
		document.getElementById('littleInfo28').style.display = 'block';
		document.getElementById('littleInfo010').style.display = 'block';

	} else {
		document.getElementById('littleInfo1').style.display = 'none';
		document.getElementById('littleInfo2').style.display = 'none';
		document.getElementById('littleInfo3').style.display = 'none';
		document.getElementById('littleInfo4').style.display = 'none';
		document.getElementById('littleInfo01').style.display = 'none';

		document.getElementById('littleInfo5').style.display = 'none';
		document.getElementById('littleInfo6').style.display = 'none';
		document.getElementById('littleInfo7').style.display = 'none';
		document.getElementById('littleInfo8').style.display = 'none';
		document.getElementById('littleInfo02').style.display = 'none';

		document.getElementById('littleInfo9').style.display = 'none';
		document.getElementById('littleInfo10').style.display = 'none';
		document.getElementById('littleInfo11').style.display = 'none';
		document.getElementById('littleInfo12').style.display = 'none';
		document.getElementById('littleInfo03').style.display = 'none';

		document.getElementById('littleInfo13').style.display = 'none';
		document.getElementById('littleInfo14').style.display = 'none';
		document.getElementById('littleInfo15').style.display = 'none';
		document.getElementById('littleInfo16').style.display = 'none';
		document.getElementById('littleInfo04').style.display = 'none';
		document.getElementById('littleInfo05').style.display = 'none';

		document.getElementById('littleInfo17').style.display = 'none';
		document.getElementById('littleInfo18').style.display = 'none';
		document.getElementById('littleInfo19').style.display = 'none';
		document.getElementById('littleInfo20').style.display = 'none';
		document.getElementById('littleInfo06').style.display = 'none';
		document.getElementById('littleInfo07').style.display = 'none';

		document.getElementById('littleInfo21').style.display = 'none';
		document.getElementById('littleInfo22').style.display = 'none';
		document.getElementById('littleInfo23').style.display = 'none';
		document.getElementById('littleInfo24').style.display = 'none';
		document.getElementById('littleInfo08').style.display = 'none';
		document.getElementById('littleInfo09').style.display = 'none';

		document.getElementById('littleInfo25').style.display = 'none';
		document.getElementById('littleInfo26').style.display = 'none';
		document.getElementById('littleInfo27').style.display = 'none';
		document.getElementById('littleInfo28').style.display = 'none';
		document.getElementById('littleInfo010').style.display = 'none';
	}
};