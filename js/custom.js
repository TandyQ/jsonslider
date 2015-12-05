function getSlides() {
  $.getJSON('data/data.json')
  .done( function(data){                                 // SERVER RETURNS DATA
    $("#individualNavDiv").append("<ul id='individualNav'>");
  	$.each(data.slides, function(key, val) {
  		
      $("#individualNav").append("<li><div id='button" + key + "' class=\"button\">" + (key+1) + "</div></li>");
     
      $("#button" + key).on('click', function () {
        $(".content").hide(500);
        $("#content" + key).show(500);
      });

  		msg = "<div id='content" + key + "' class='content'>";
  		msg += "<img src=\"" + val.image + "\"></div>";

  		$('#wrapper').append(msg); 

      $('#content' + key).hide();

      if (key === 0) {
        $('#content0').show();
      };
	  });
      $("#individualNavDiv").append("</ul></div>");
      
      var result = document.getElementById("individualNav").innerHTML;
console.log(result);
     
    $('#prevNextNav').append("<ul><li><div id=\"previousButton\" class=\"button\">&#9664;</div></li><li><div id=\"nextButton\" class=\"button\">&#9654;</div></li></ul>"); 
     

    $("#previousButton").on ('click', function () {
      
        var i = $(".content:visible").index();
        
        if (i < 1) {
            $(".content:visible").animate({
                width: ["toggle", "easeOutExpo"],
                opacity: "toggle"
            }, 700, function() {
                //animation complete
            });
            $(".content:last").animate({
                width: ["toggle", "easeInExpo"],
                opacity: "toggle"
            }, 700, function() {
                //animation complete
            });        
        } else {
            $(".content:visible").animate({
                width: ["toggle", "easeOutExpo"],
                opacity: "toggle"
            }, 700, function() {
                //animation complete
            }).prev(".content").animate({
                width: ["toggle", "easeInExpo"],
                opacity: "toggle"
            }, 700, function() {
                //animation complete
            });
        };
        
    });    
    
    $("#nextButton").on ('click', function () {

        var i = $(".content:visible").index();
        var len = $(".content").length - 1;
        
        if (i < len) {
            $(".content:visible").animate({
                height: ["toggle", "easeOutExpo"],
                opacity: "toggle"
            }, 700, function() {
                //animation complete
            }).next(".content").animate({
                height: ["toggle", "easeInExpo"],
                opacity: "toggle"
            }, 700, function() {
                //animation complete
            });
        } else {
            $(".content:visible").animate({
                height: ["toggle", "easeOutExpo"],
                opacity: "toggle"
            }, 700, function() {
                //animation complete
            });
            $(".content:first").animate({
                height: ["toggle", "easeInExpo"],
                opacity: "toggle"
            }, 700, function() {
                //animation complete
            });
        };
    });                           
  }).fail( function() {     
                               // THERE IS AN ERROR
    $('#wrapper').text('Sorry, we cannot load data.'); 
      // Show error message 
  }).always( function() {                                // ALWAYS RUNS
     var reload = '<a id="refresh" href="#">';           // Add refresh link
     reload += 'Reload</a>';
     $('#reload').html(reload);                          // Add refresh link
     $('#refresh').on('click', function(e) {             // Add click handler
       e.preventDefault();                               // Stop link
       getSlides();                                      
     });
  }); 
}

$(document).ready(function() {

	getSlides();  
    
});

