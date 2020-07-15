var i = 0;
var speed = 100; /* The speed/duration of the effect in milliseconds */
var txt = "click an option on the left to find out more /n < /n < /m <"
var resume = false


function changeScreenText(itemClicked) {
	document.getElementById("screenText").innerHTML = ""
	i = 0
	resume = false
	switch(String(itemClicked)) {
		case "location":
			txt = "residence: /n/tst. louis, missouri"
			break;
		case "major":
			txt = "college: /n/tuniversity of alabama /nmajor: /n/t computer science and finance"
			break;
		case "career":
			txt = "company: /n/t boeing /n role: /n/t software engineer"
			break;
		case "projects":
			txt = "active personal projects: /n/t - this website /n/t- algo: a data management system"
			break;
		case "resume":
			txt = "click HERE to open resume"
			resume = true
			break;
	}
	typeWriter()
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
		window.open('Resume_Robert_Mallow.pdf')
	}
}
