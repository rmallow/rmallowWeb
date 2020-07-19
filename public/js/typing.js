var i = 0;
var speed = 100; /* The speed/duration of the effect in milliseconds */
var txt = "welcome to my website, click and scroll to find out more";
var resume = false;
var screenText = false;
var block = "&#9612;"
var everyOther = true;

var timeoutHolder = null

var startScreen ="<img src = \"https://imgur.com/ydRCc3V.gif\">";


function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

function changeScreen() {
	document.getElementById("screen").innerHTML = ""
	var image = new Image()
	image.src = "https://imgur.com/yVw7OJP.gif"
	document.getElementById("screen").appendChild(image)
	timeoutHolder = setTimeout(screenStart, 35000);
}

function screenStart() {
	document.getElementById("screen"). innerHTML = startScreen;
	timeoutHolder = setTimeout(changeScreen, 5000);
}

async function changeScreenText(itemClicked) {
	if(timeoutHolder != null) {
		clearTimeout(timeoutHolder)
	}
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
	timeoutHolder = setTimeout(screenStart, 20000)

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
