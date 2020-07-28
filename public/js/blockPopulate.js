var last = 0

$(function(){
  $(window).scroll(function(){
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    console.log(docViewTop)
    alert("???");
    if($(this).scrollTop()>=aTop){
       
        // instead of alert you can use to show your ad
        // something like $('#footAd').slideup();
    }
  });
});