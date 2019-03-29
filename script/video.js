$('.recipe').parent().click(function () {
    if($(this).children(".recipe").get(0).paused){ 
        $(this).children(".recipe").get(0).play();   
        $(this).children(".playpause").fadeOut();
    }
    else{$(this).children("..recipe").get(0).pause();
        $(this).children(".playpause").fadeIn();
      }
  });