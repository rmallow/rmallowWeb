var i = 0;
var speed = 100; /* The speed/duration of the effect in milliseconds */
var txt = "welcome to my website, click and scroll to find out more";
var resume = false;
screenText = false;

var startScreen ="<img src = \"https://imgur.com/ydRCc3V.gif\">";


function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

async function eventLoop() {
	console.log("start event Loop")
	await sleep(5000);
	await delayedChange();
	console.log("end event Loop")
	eventLoop()
}

function screenStart() {
	screenText = false;
	document.getElementById("screen"). innerHTML = startScreen;
	eventLoop();
}

async function delayedChange() {
	console.log("start delay change")
	var fullGif = "<img src = \"https://imgur.com/yVw7OJP.gif\">";
	if(screenText) {
		return;
	}
	document.getElementById("screen").innerHTML = ""
	var image = new Image()
	image.src = "https://imgur.com/yVw7OJP.gif"
	document.getElementById("screen").appendChild(image)
	await sleep(35000);
	if(screenText) {
		return;
	}
	document.getElementById("screen").innerHTML = startScreen
	console.log("end delay change")
	return;
}


async function changeScreenText(itemClicked) {
	screenText = true
	document.getElementById("screen").innerHTML = "<p id = \"screenText\"> </p>"
	document.getElementById("screenText").innerHTML = ""
	i = 0
	resume = false
	switch(String(itemClicked)) {
		case "location":
			txt = "residence: /n/t- st. louis, missouri"
			break;
		case "major":
			txt = "college: /n/t - university of alabama /nmajor: /n/t - computer science and finance"
			break;
		case "career":
			txt = "company: /n/t - boeing /n role: /n/t - software engineer"
			break;
		case "projects":
			txt = "active personal projects: /n/t - this website /n/t- algo: a data management system"
			break;
		case "resume":
			txt = "click HERE to open resume"
			resume = true
			break;
	}
	typeWriter();
	await sleep(20000);
	screenText = false;
	console.log("end type after wait")

}

function typeWriter() {
	if (i < txt.length) {
		var screenTextElem = document.getElementById("screenText");
		var char = txt.charAt(i);
		if(char == "/" && i + 1 < txt.length) {
			i++;
			char = txt.charAt(i)
			if(char == "t") {
				screenTextElem.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
			}
			else if (char == "n") {
				screenTextElem.innerHTML += "</br>"
			}
		}
		else {
			screenTextElem.innerHTML += char;
		}
		i++;
		setTimeout(typeWriter, speed);
	}
}

function resumeCheck() {
	if(resume == true) {
		window.open('/Users/rmallow/Documents/testWeb/public/Resume_Robert_Mallow.pdf')
	}
}
