const setupDivisor = 300;
const numCells = 20;
const cellsPerGradient = 6;
var rows = 3;
var rowEnd = 0;


function setupTable() {

    setupLayout(rows, numCells);
    var table = document.getElementById("blockTable");

    var numRows = Math.round($(window).height()/setupDivisor);
    numRows = rows;
    var rowHeight = Math.round(($(window).height())/numRows);

    var cellsPerPage = Math.round($(window).width()/setupDivisor);
    var cellWidth = Math.round($(window).width()/cellsPerPage);
    console.log($(window).width())
    console.log(cellsPerPage);
    console.log(cellWidth);
    console.log(rowHeight);

    let cellWidthString = cellWidth.toString() + "px";
    let rowHeightString = rowHeight.toString() + "px";

    $("head").append('<style type="text/css"></style>');
    var newStyleElement = $("head").children(':last');
    newStyleElement.html(".innerDiv{height:" + rowHeightString + ";width:" + cellWidthString + "}");
    
    for(let i = 0; i < numRows; i++) {
        let row = table.insertRow(i)
        row.style.height = rowHeight.toString() + "px";
        //row.style.width = (cellWidth*numCells).toString() + "px";
        for(let x = 0; x < numCells; x++) {
            let cellId = "cell:" + i.toString() + "-" + x.toString();
            let cell = row.insertCell(x);
            cell.id = cellId;

            holder = checkLayout(i,x);

            let show = holder[0];
            let inner = holder[1];
            let extraClasses = holder[2];
            let css = holder[3]
            
            extraClasses.push("innerDiv");
            if(show == true) {
                extraClasses.push("showTableDiv")
            }

            divChild = $("<div>");
            divChild.css(css)
            divChild.addClass(extraClasses);
            divChild.append(inner);
            cell.style.width = cellWidthString;
            cell.style.height = rowHeightString;
            cell.appendChild(divChild.get(0));
            cell.classList.add("tableCell");
        } 
    }
    $("#blockPageBox").css('width',$("#blockTable").width().toString() + "px")
    rowEnd = $("#blockTable").width() - $(window).width();
    gradientSetup();
}

/*background: linear-gradient(45deg, #6300a6 15%, 35%, transparent 65%), linear-gradient(135deg, #40a9ff 15%, 35%, transparent 70%),linear-gradient(225deg, red 15%, 35%, orange 55%);
    */
var colors = ["#9536d6", "#4d91ff", "#ff6969", "#ff8b2b", "#fff766", "#fd94ff", "#69e6ff"]
function gradientSetup() {
    let numGradient = Math.round(numCells/cellsPerGradient);
    let gradientWidth = $("#blockTable").width()/numGradient;

    backgroundBox = $("#tableBackgroundBox")
    backgroundBox.css({'width': 'auto', 'height': $("#blockTable").height()});
    shuffleArray(colors);
    alternate = true;
    for(let i = 0; i < numGradient; i++) {
        backDivElem = addBackgroundDiv("#tableBackgroundBox");

        let loopText = getLinearText();
        startPx = gradientWidth * i;
        gradInc = gradientWidth/4;
        loopText += "217deg, " + hexToRGB(colors[0],1) + " 15%, 35%, transparent 65%), ";
        loopText += getLinearText();
        loopText += "127deg, "+ hexToRGB(colors[1],1) + " 15%, 35%, transparent 65%), "; 
        loopText += getLinearText();
        loopText += "336deg, "+ hexToRGB(colors[2],1) + " 15%, 35%," + colors[3] + " 65%)";

        

        let transformDegree = 180;
        if(alternate) {
            transformDegree = 0
            alternate = false;
        }
        else {
            alternate = true;
        }
        backDivElem.css({"background-image" : loopText, "width": gradientWidth.toString() + "px",
            "left": startPx.toString() + "px", "transform" : "rotateY(" + transformDegree.toString() + "deg)"});
    }
}

function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (true) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}



function getLinearText() {
    return "linear-gradient("
}

function addBackgroundDiv(elemID, gradientWidth) {
    var backDiv = $("<div></div>");
    backDiv.addClass("backDiv")
    $(elemID).append(backDiv);
    return backDiv;
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}