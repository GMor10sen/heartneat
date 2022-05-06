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
	// variable to read the range from HomePage
	var rangeslider = document.getElementById("BPM_Range");

	handleInformationDisplay();

	// if statement to set vibration on/off depending on device uses for application
	if (!("vibrate" in navigator) || !isMobile()) {
		document.getElementById('vibration_switch').checked = true;
		//heartbeat_audio.play();
	}
	else {
		startVibrate(false);
	}
	
	//Variable to read HTML collection of animations to display on the HomePage
	var images = document.getElementById("sliderImages");
	
	
	var oldRange = 'human range';
	//Calling handleInfo function depending on the radio buttons from the menu
	document.getElementById('info_switch').addEventListener('change', (event) => {
		if (document.getElementById('info_switch').checked) {
			changeSliderVal(true);
			handleInformationDisplay();
		}
		else {
			changeSliderVal(false);
			handleInformationDisplay();
		}
	});
	this.document.getElementById('Little').addEventListener('change', (event) => {
		handleInformationDisplay();
	});
	this.document.getElementById('Medium').addEventListener('change', (event) => {
		handleInformationDisplay();
	});
	this.document.getElementById('Lot').addEventListener('change', (event) => {
		handleInformationDisplay();
	});

	//Handling the animations to show depending on the slider range
	this.document.getElementById('amimation_switch').addEventListener('change', (event) => {
	  	if (rangeslider.value < 2) {
			handleAnimationChange(images.children[0], 'tomb_animation');
	  	} else if ((rangeslider.value >= 2) && (rangeslider.value <= 35)) {
			handleAnimationChange(images.children[4], 'whale_animation');
	  	} else if ((rangeslider.value > 35) && (rangeslider.value <= 45)) {
			handleAnimationChange(images.children[1], 'ants_animation');
		} else if ((rangeslider.value > 45) && (rangeslider.value <= 55)) {
			handleAnimationChange(images.children[7], 'ants_animation_sleep');
	  	}
	  	else if((rangeslider.value > 55) && (rangeslider.value <= 100)) {
			handleAnimationChange(images.children[2], 'heart');
	  	} else if((rangeslider.value > 100) && (rangeslider.value <= 180)) {
			handleAnimationChange(images.children[3], 'weight_animation');
	  	} else if((rangeslider.value > 750) && (rangeslider.value <= 1200)) {
			handleAnimationChange(images.children[5], 'shrew_animation');
        }
	});

	rangeslider.addEventListener('input', function(event) {
	

		//If the animal info button unchecked make a 
		//boolean that will negate all animal changes 
		if (!document.getElementById('info_switch').checked) 	
			Animal_Display = false;  
		else
			Animal_Display = true; 


	  	//information handling, only change if a change is needed
	  	for (var i = 0; i < images.children.length; i++) {
			images.children[i].style.display = 'none';
	  	}
	  	i = Number(this.value) - 1;
	  	if (rangeslider.value < 2) {
			//tombstone animation
			if (oldRange != 'tomb range') {-
				handleInformationDisplay();
			}
			images.children[0].style.display = 'block';
			handleAnimationChange(images.children[0], 'tomb_animation');
			oldRange = 'tomb range';
	  	} else if ((rangeslider.value >= 2) && (rangeslider.value <= 35) && Animal_Display == true) {
			//whale animation
			if (oldRange != 'whale range') {
				handleInformationDisplay();
			}
			images.children[4].style.display = 'block';
			handleAnimationChange(images.children[4], 'whale_animation');
			oldRange = 'whale range';
	  	} 

		else if ((rangeslider.value > 35) && (rangeslider.value <= 54) && Animal_Display == false) {
			//sleep only
			if (oldRange != 'sleep range') {
				handleInformationDisplay();
			}
		  	images.children[6].style.display = 'block';
			handleAnimationChange(images.children[6], 'ZZZ_animation');
			oldRange = 'sleep range';
	  	}
	    else if ((rangeslider.value > 35) && (rangeslider.value <= 54) && Animal_Display == true) {
			//ant animation
			if (oldRange != 'ants sleep range') {
				handleInformationDisplay();
			}
		  	images.children[7].style.display = 'block';
			handleAnimationChange(images.children[7], 'ants_animation_sleep');
			oldRange = 'ants sleep range';
	  	}
	  	else if((rangeslider.value > 55) && (rangeslider.value <= 100)){
			//resting human heart
			if (oldRange != 'human range') {
				handleInformationDisplay();
			}
			images.children[2].style.display = 'block';
			handleAnimationChange(images.children[2], 'heart');
			oldRange = 'human range';
	  	} else if((rangeslider.value > 100) && (rangeslider.value <= 180)){
			//exercising human
			if (oldRange != 'exercise range') {
				handleInformationDisplay();
			}
			images.children[3].style.display = 'block';
			handleAnimationChange(images.children[3], 'weight_animation');
			oldRange = 'exercise range';
	  	}
		   else if((rangeslider.value > 750) && (rangeslider.value <= 1200) && Animal_Display == true){
			//pigmy shrew will go here
			if (oldRange != 'shrew range') {
				handleInformationDisplay();
			}
			images.children[5].style.display = 'block';
			handleAnimationChange(images.children[5], 'shrew_animation');
			oldRange = 'shrew range';
	  	} else {
			for (var i = 0; i < images.children.length; i++) {
				images.children[i].style.display = 'none';
			}
	  	}
	});
});	

//Function to enable animations from the user's selection
function handleAnimationChange(element, changingClass) {
	if (changingClass == 'ants_animation_sleep') {
		if (document.getElementById('amimation_switch').checked) {
			element.children[0].classList.remove('ants_animation');
			element.children[1].classList.remove('ZZZ_animation');
		}
		else {
			element.children[0].classList.add('ants_animation');
			element.children[1].classList.add('ZZZ_animation');
		}
	}
	if (document.getElementById('amimation_switch').checked) {
		element.classList.remove(changingClass);
	}
	else {
		element.classList.add(changingClass);
	}
}

//Setting up Vibration only depending on toggle switch from Menu
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
		if (!document.getElementById('info_switch').checked) {
			changed_value = event.target.value;
			if (event.target.value > 200) {
				changed_value = 200;
				custom_bpm.value = 200;
				slider.value = changed_value;
			}
			else {
				slider.value = changed_value;
			}
			slider_output.innerHTML = changed_value;
			return;
		}
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

//setting up the sound frequency of the heartbeat
const startVibrate = (isSound) => {
	clearInterval(vibrateIntervalId);
	clearInterval(soundIntervalId);
	var value = Math.floor(1000 / (slider.value / 60));
	if (isSound){
		navigator.vibrate(0);
		if (slider.value > 180) {
			return;
		}
		heartbeat_audio.playbackRate = Math.floor(slider.value / 60) > 16 ? 16 : Math.floor(slider.value / 60);
		soundIntervalId = setInterval(() => heartbeat_audio.play(), value);
	}
	else {
		vibrateIntervalId = setInterval(() => navigator.vibrate(50), value);
	}
};
//at a certain range the mobile device will stop vibrating
const stopVibrate = () => {
    clearInterval(vibrateIntervalId);
	clearInterval(soundIntervalId);
	var value = Math.floor(1000 / (slider.value / 60));
	console.log("Stopping Vibrating");
    navigator.vibrate(0);
	if (slider.value > 180) {
		return;
	}
	soundIntervalId = setInterval(() => heartbeat_audio.play(), value);
};

//changing vibration of the device depending the slider value
const changeVibrate = (val, isSound) => {
	clearInterval(vibrateIntervalId);
	clearInterval(soundIntervalId);
	var value = Math.floor(1000 / (val / 60));
	console.log("Changing vibration to: " + val + " BPM");
	if (isSound){
		navigator.vibrate(0);
		if (slider.value > 180) {
			return;
		}
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

//matching the type of device/navigator used
const isMobile = () => {
    const nav = navigator.userAgent.toLowerCase();
    return (
        nav.match(/iphone/i) || nav.match(/ipod/i) || nav.match(/ipad/i) || nav.match(/android/i)
    );
};

//Assigning names to the different slider values on the HomePage
function getInformationID () {
	switch (true) {
		case (slider.value < 2):
			return 'deathInfo';
		case (slider.value >= 2) && (slider.value <= 35):
			return 'whaleInfo';
		case (slider.value > 35) && (slider.value <= 45):
			return 'antInfo';
		case (slider.value > 45) && (slider.value <= 55):
			return 'sleepInfo';
		case (slider.value > 55) && (slider.value <= 100):
			return 'humanInfo';
		case (slider.value > 100) && (slider.value <= 200):
			return 'maxHumanInfo';
		case (slider.value > 750) && (slider.value <= 1200):
			return 'shrewInfo';
		default:
			return 'humanInfo';
	}
}

function handleInformationDisplay() {
	
	console.log("Information ID selected: " + getInformationID());
	
	//terminate info for Animal display if switch is unchecked by returning early 
	if (!document.getElementById('info_switch').checked && (getInformationID() == "whaleInfo" || getInformationID() == "shrewInfo")){
			return;
	}	


	const documentElementContainers = document.querySelectorAll('.info_background');
	//clear all info_background containers
	documentElementContainers.forEach(element => {
		element.style.display = 'none';
	});



	var elementInQuestion = document.getElementById(getInformationID());
	
	if (getInformationID() == 'antInfo'){
		var elementInQuestion2 = document.getElementById("sleepInfo");
	}
	if (getInformationID() == 'sleepInfo'){
		var elementInQuestion2 = document.getElementById("antInfo");
	}

	if (!document.getElementById('info_switch').checked && (getInformationID() == 'antInfo')) {
		elementInQuestion = document.getElementById('sleepInfo');
	}
	
	elementInQuestion.style.display = 'block';
	if (document.getElementById('Little').checked) {
		//little display
		elementInQuestion.querySelector('#mediumInfo').style.display = 'none';
		elementInQuestion.querySelector('#videoInfo').style.display = 'none';

		//If animal display on then show both sleeping and ant 	
		if (document.getElementById('info_switch').checked && (getInformationID() == 'sleepInfo' || getInformationID() == 'antInfo')){
			elementInQuestion2.style.display = 'block';
			elementInQuestion2.querySelector('#mediumInfo').style.display = 'none';
			elementInQuestion2.querySelector('#videoInfo').style.display = 'none';
		}
	}
	else if (document.getElementById('Medium').checked) {
		//medium display
		elementInQuestion.querySelector('#videoInfo').style.display = 'none';
		elementInQuestion.querySelector('#mediumInfo').style.display = 'block';

		//If animal display on then show both sleeping and ant 		
		if (document.getElementById('info_switch').checked && (getInformationID() == 'sleepInfo' || getInformationID() == 'antInfo')){
			elementInQuestion2.style.display = 'block';
			elementInQuestion2.querySelector('#videoInfo').style.display = 'none';
			elementInQuestion2.querySelector('#mediumInfo').style.display = 'block';
		}
	}
	else if  (document.getElementById('Lot').checked) {
		//lot display
		elementInQuestion.querySelector('#videoInfo').style.display = 'block';
		elementInQuestion.querySelector('#mediumInfo').style.display = 'block';

		if (document.getElementById('info_switch').checked && (getInformationID() == 'sleepInfo' || getInformationID() == 'antInfo')){
			elementInQuestion2.style.display = 'block';
			elementInQuestion2.querySelector('#videoInfo').style.display = 'block';
			elementInQuestion2.querySelector('#mediumInfo').style.display = 'block';
		}

	}

};

//"Include Animal Info" toggle button is on/off change slider range
function changeSliderVal(includeAnimals) {
	if (includeAnimals) {
		slider.value = 60;
		slider.max = 1200;
		slider_output.innerHTML = 60
	}
	else {
		slider.value = 60;
		slider.max = 200;
		slider_output.innerHTML = 60
	}
}