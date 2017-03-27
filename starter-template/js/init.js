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
        var full = $("#finfo").has("img").length ? true : false;
        if(full === false){
          $('#finfo').empty();
        }
      });

      var getFilmInfo = function(){

        var film = $('#search').val();

        if(film === ''){

          $('#finfo').html('<h6 class="center white-text">Plese enter something...</h6>');

        } else {

          $('#finfo').html('<h6 class="center white-text"> Series info loading... </h6>');


          $.getJSON("http://api.tvmaze.com/search/shows?q=" + film, function(json) {
              console.log(json);
              if (json.length !== 0) {
                 // window.location.replace("search_res.html");
                  $('#finfo').html('<img style="max-height: 400px" id="filmInfo" src=' + json[0].show.image.original + ' />');
                    getRecommended(json);
              } else {
                console.log('Nothing found :(');
                $.getJSON("http://api.tvmaze.com/search/shows?q=game+of+thrones", function (json) {
                    console.log(json[0].show.image.original);
                    $('#finfo').html('<h5 class="center light white-text"> Found nothing. Maybe you meant...? ' +
                        '<br></h5><img id="filmInfo" src='
                        + json[0].show.image.original + ' />');
                });
              }
          });

        }

        return false;

      }


     var getRecommended = function(json) {

          console.log("getRecommended");

          var films = [];
          var filmsLen = 10;
          var cnt = 0;
          //the array containing the recommended films

          /* Criteria declarations for finding new films */

          var score = json[0].show.rating.average;
          var sgenre = json[0].show.genres[0];
          var sid = json[0].show.id;

         //console.log("Score >> " + score + " Genre >> " + sgenre + " ID >> " + sid);


         $.getJSON("http://api.tvmaze.com/shows", function(json) {
             console.log(json);
             while (cnt < filmsLen) {
                 for (var i = 0; i < 240; i++) {
                     if ((json[i].genres[0] === sgenre) && (json[i].rating.average >= score)) {
                         console.log(json[i].name + " " + json[i].genres[0] + " " + json[i].rating.average + "\n");
                         films.push(json[i]);
                         console.log(json[i]);
                         cnt++;
                     }
                 }
             }

             console.log("Better: \n");
             console.log(films);

             //for(var i = 0; i< 10; i++){
             //    console.log(films[i]);
                 //$('#results').load("search_res.html").html('<a class="carousel-item" href="#modal1"><img src=' + films[i] + ' ></a>');
             //}
         });
      }


        $('#showthem').click(getFilmInfo);
        $('#search').keyup(function(event){
          if(event.keyCode === 13){
            getFilmInfo();
          }
        });

    }); //end of API-fetch




  }); // end of document ready
})(jQuery); // end of jQuery name space
