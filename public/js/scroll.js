var viewBoxes = [];
var effects = null;
var curViewBoxIndex = 0;

function vBObj(box, s, x, y) {
    this.vB = box;
    this.scroll = s;
    this.scrollFinished = false;
    this.xLast = x;
    this.yLast = y;
}

function scrollSetup() {
    let vB = $(".viewBox")
    vB.first().addClass("currentView")
    vB.eq(1).addClass("nextView");
    effects = $(".effects");

    console.log(vB)
    for(let i = 0; i < vB.length; i ++) {
        let scroll = vB.eq(i).hasClass('scroll');
        viewBoxes.push(new vBObj(vB.eq(i),scroll,0,0));
    }

    setNextPosition();

}

var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

document.addEventListener(wheelEvent, customScroll, { passive: false}) 

/*
forwardVert = 0
forwardHoriz = 1
backwardVert = 2
backwardHoriz = 3
*/
function getScrollDirection(element, scroll) {
    if(scroll) {
        if(element.hasClass("scrollForwardVert")) {
            return 0;
        }
        else if(element.hasClass("scrollForwardHoriz")) {
            return 1;
        }
        else if(hasClass("scrollBackwardVert")) {
            return 2;
        }
        else if(element.hasClass("scrollBackwardHoriz")) {
            return 3;
        }
        else {
            //this should cause a crash so the error can be noticed
            return null;
        }
    }
    else {
        if(element.hasClass("forwardVert")) {
            return 0;
        }
        else if(element.hasClass("forwardHoriz")) {
            return 1;
        }
        else if(element.hasClass("backwardVert")) {
            return 2;
        }
        else if(element.hasClass("backwardHoriz")) {
            return 3;
        }
        else {
            //this should cause a crash so the error can be noticed
            return null;
        }
    }

}

function lastView() {
    if(curViewBoxIndex - 1 >= 0) {
        if(curViewBoxIndex - 2 >= 0) {
           viewBoxes[curViewBoxIndex-2].vB.addClass("beforeView");
        }
        viewBoxes[curViewBoxIndex-1].vB.removeClass("beforeView");
        viewBoxes[curViewBoxIndex-1].vB.addClass("currentView");
        viewBoxes[curViewBoxIndex].vB.removeClass("currentView");
        viewBoxes[curViewBoxIndex].vB.addClass("nextView");
        if(curViewBoxIndex + 1 < viewBoxes.length) {
            viewBoxes[curViewBoxIndex+1].vB.removeClass("nextView");
        }
        curViewBoxIndex -= 1;
    }
}

function nextView() {
    if(curViewBoxIndex + 1 < viewBoxes.length) {
        if(curViewBoxIndex != 0) {
            viewBoxes[curViewBoxIndex-1].vB.removeClass("beforeView");
        }
        viewBoxes[curViewBoxIndex].vB.removeClass("currentView");
        viewBoxes[curViewBoxIndex].vB.addClass("beforeView");
        viewBoxes[curViewBoxIndex+1].vB.removeClass("nextView");
        viewBoxes[curViewBoxIndex+1].vB.addClass("currentView");
        if(curViewBoxIndex + 2 < viewBoxes.length) {
            viewBoxes[curViewBoxIndex+2].vB.addClass("nextView");
        }
        curViewBoxIndex += 1;
    }
    setNextPosition();
}

function setNextPosition() {
    let winWidth = $(window).width();
    let winHeight = $(window).height();
    let cssNext = {};
    let scrollDir = getScrollDirection(viewBoxes[curViewBoxIndex].vB, false)

    if(curViewBoxIndex < viewBoxes.length - 1) {
        holderVB = viewBoxes[curViewBoxIndex+1].vB;
        switch(scrollDir) {
            case 0:
                holderVB.offset({top:winHeight,left:0});
                break;
            case 1:
                holderVB.offset({top:0, left:winWidth});
                break;
            case 2:
                holderVB.offset({top:-1*winHeight,left:0});
                break;
            case 3:
                holderVB.offset({top:0, left:winWidth*-1})
        }
    }
}


function customScroll(event) {
    let curViewObj = viewBoxes[curViewBoxIndex];
    let transformX = 0;
    let transformY = 0;
    if(curViewBoxIndex == 2) {
        console.log(curViewObj)
        console.log(curViewObj.vB.offset().top)
    }
    if(curViewObj.scroll && !(curViewObj.scrollFinished)) {
        let curOffset = curViewObj.vB.offset();
        let scrollDir = getScrollDirection(viewBoxes[curViewBoxIndex].vB, true);
        switch(scrollDir) {
            case 0:
                if(curViewObj.yLast + event.deltaY < 0) {
                    curViewObj.yLast += event.deltaY - curViewObj.xLast;
                    curViewObj.xLast = 0;
                    lastView();
                }
                else {
                    if(curViewObj.yLast + event.deltaY < curViewObj.vB.height() - $(window).height()) {
                        curViewObj.yLast += event.deltaY;
                    }
                    else {
                        curViewObj.yLast = curViewObj.vB.height() - $(window).height();
                        curViewObj.scrollFinished = true;
                    }
                }
                transformX = curViewObj.xLast * -1;
                transformY = curViewObj.yLast * -1;
                break;
            case 1:
                if(curViewObj.xLast + event.deltaY < 0) {
                    curViewObj.yLast += event.deltaY - curViewObj.xLast;
                    curViewObj.xLast = 0;
                    lastView();
                }
                else {
                    if(curViewObj.xLast + event.deltaY < curViewObj.vB.width() - $(window).width()) {
                        curViewObj.xLast += event.deltaY;
                    }
                    else {
                        curViewObj.xLast = curViewObj.vB.width() - $(window).width();
                        curViewObj.scrollFinished = true;
                    }
                }
                transformX = curViewObj.xLast*-1;
                transformY = curViewObj.yLast*-1;
                break;
        }
        translate(curViewObj.vB,transformX,transformY);
    }
    else {
        let next = (curViewBoxIndex + 1 < viewBoxes.length)
        let nextElem = null;
        let nextOffset = null
        if(next) {
            nextElem = viewBoxes[curViewBoxIndex+1];
            nextOffset = nextElem.vB.offset();
        }
        let scrollDir = getScrollDirection(viewBoxes[curViewBoxIndex].vB, false);
        switch(scrollDir) {
            case 0:
                if(nextElem.yLast + event.deltaY < 0) {
                    nextElem.yLast += event.deltaY;
                    lastView();
                }
                else if(next &&(nextOffset.top == 0 || nextOffset.top - event.deltaY < 0)) {
                    nextElem.yLast += nextOffset.top
                    nextView();
                }
                else if(next){
                    if(nextElem.yLast > 0 || event.deltaY > 0) {
                        nextElem.yLast += event.deltaY;
                    }
                }
                transformX = nextElem.xLast;
                transformY = nextElem.yLast * -1;
                break;
            }
            translate(nextElem.vB,transformX,transformY);
        }



    /*
    if(inTable != true) {
        if((elemTop == 0 || elemTop - event.deltaY < 0)) {
            yLast += elemTop
            inTable = true;
            xLast = 0
        }
        else {
            if(yLast > 0 || event.deltaY > 0) {
                yLast += event.deltaY;
            }
        }
        translate("#blockPageBox",0,yLast*-1);
    }
    else{
        if(xLast + event.deltaY < 0) {
            inTable = false;
            yLast += event.deltaY;
        }
        else {
            if(xLast + event.deltaY < rowEnd) {
                xLast += event.deltaY;
            }
            else {
                xLast = rowEnd;
            }
        }
        translate("#blockPageBox", xLast*-1, yLast*-1);
    }
    */

    /*
    effects.each(function(index) {
        checkEffects($(this),index,event)
    });
    */
}

function checkEffects(element,index,event) {
    let effectWidth = $(window).width();
    let viewBox = element.parents(".viewBox");
    if(viewBox.hasClass("currentView") || viewBox.hasClass("nextView")) {
        if(element.hasClass("halfWindow")) {
            effectWidth /= 2;
        }

        if(element.hasClass("fadeIn")) {
            if(xLast + event.deltaY + effectWidth > element.offset().left) {
                
            }
        }
    }

}

function pxFormat(num) {
    return num.toString() + "px";
}

//pass in jquery string thing, x, and y for transform: translate(x,y) in px
function translate(element, x, y) {
    element.css("transform", "translate(" + pxFormat(x) + "," + pxFormat(y) + ")");
}


// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;

// call this to Disable
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener('wheel', preventDefault, wheelOpt); // modern desktop
    window.addEventListener('mousewheel', preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener('wheel', preventDefault, wheelOpt);
    window.removeEventListener('mousewheel', preventDefault, wheelOpt); 
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}