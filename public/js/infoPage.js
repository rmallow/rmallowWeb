
var logoBoxList = []

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    if(elem.attr("id") == "intro") {
    console.log(elemBottom)
    console.log(docViewBottom)
}
    return ((elemBottom <= docViewBottom * 1.2) && (elemTop >= docViewTop));
}

function isMostlyOutOfView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom >= (docViewBottom * 1.1)) && (elemTop >= docViewTop)); //|| ((elemBottom >= docViewBottom) && (elemTop >= (docViewTop * 1.1)))
}

function allInView(value) {
    var left = $(value).hasClass('left')
    if (isScrolledIntoView($(value))) {
        if(left) {
            $(value).addClass('leftLogoBoxOnScreen')
            }
        else {
             $(value).addClass('rightLogoBoxOnScreen')
        }
    }
    else {
        if(isMostlyOutOfView($(value))) {
            if(left) {
                $(value).removeClass('leftLogoBoxOnScreen')
            }
            else {
                 $(value).removeClass('rightLogoBoxOnScreen')
            }
        }
    }
}


function getLogoBoxes() {
    var elemList = $("#logos").children();
    for (i = 0; i < elemList.length; i++) {
        if($(elemList[i]).hasClass("logoBox")) {
            logoBoxList.push("#" + $(elemList[i]).attr("id"));
        } 
    }
    console.log(logoBoxList)
}

function viewLoop() {
    logoBoxList.forEach(allInView)
    setTimeout(viewLoop, 250);
}

function startLogoPage() {
    getLogoBoxes();
    viewLoop();
}
