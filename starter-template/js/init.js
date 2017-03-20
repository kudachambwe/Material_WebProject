(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.carousel').carousel({
      padding:300
    });
    $('#modal1').modal();

    $(document).ready(function(){

     $('#search').focus(function(){
       console.log('Search');
        var full = $("#finfo").has("img").length ? true : false;
        if(full === false){
          console.log('Something wong hia!');
           $('#finfo').empty();
        }
     });

     var getFilmInfo = function(){

          var film = $('#search').val();

           if(film === ''){

              $('#finfo').html("<h2 class='loading'> Please enter something.... </h2>");

              console.log('Here1');

           } else {

              $('#finfo').html("<h2 class='loading'>Series info loading... </h2>");


              $.getJSON("http://www.omdbapi.com/?t=" + film + "&type=series", function(json) {
                 if (json !== "Nothing found."){
                    console.log(json);
                       $('#finfo').html('<h2 class="loading">Well, gee whiz! We found you a series!</h2><img id="filmInfo" src=' + json.Poster + ' />');
                    } else {
                       $.getJSON("http://api.themoviedb.org/2.1/Movie.search/en/json/23afca60ebf72f8d88cdcae2c4f31866/goonies?callback=?", function(json) {
                          console.log(json);
                          $('#finfo').html('<h2 class="loading">Were afraid nothing was found for that search. Perhaps you were looking for The Goonies?</h2><img id="thePoster" src=' + json[0].posters[0].image.url + ' />');
                       });
                    }
               });

            }

          return false;
     }

     // $('#search').click(getFilmInfo);
     $('#search').keyup(function(event){
       console.log(event.keyCode);
         if(event.keyCode === 13){
             getFilmInfo();
         }
     });

  });

  }); // end of document ready
})(jQuery); // end of jQuery name space
