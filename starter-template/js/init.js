(function($){
  $(function(){

    $('.button-collapse').sideNav();

    $('.parallax').parallax();

    $('.carousel').carousel({
      padding:300
    });

    $('#modal1').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5// Opacity of modal background
    });

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

          var text = film;


          $.getJSON("http://api.tvmaze.com/search/shows?q=" + film, function(json) {
              console.log(json);

              if (json.length !== 0) {
                  $('#finfo').html('<img style="max-height: 400px" id="filmInfo" src=' + json[0].show.image.original + ' />');
                  //window.location.href = "search_res.html";

                  window.location.href = 'search_res.html' + '#' + text;

                  //text = 'search_res.html' + '#' + text;
                  //console.log(text);

                  //var text = window.location.hash.substring(1)

                  //getRecommended(json);
                    //return json;

              } else {
                console.log('Nothing found :(');
                $.getJSON("http://api.tvmaze.com/search/shows?q=game+of+thrones", function(json) {
                    console.log(json[0].show.image.original);

                    $('#finfo').html('<h5 class="center light white-text"> Found nothing. Maybe you meant...? ' +
                        '<br></h5><img id="filmInfo" src='
                        + json[0].show.image.original + ' />');

                    window.location.href = 'search_res.html' + '#' + 'game+of+thrones';

                });
              }
          });

        }

        return false;

      }

        $('#showthem').click(getFilmInfo);
        $('#search').keyup(function(event){
          if(event.keyCode === 13){
            getFilmInfo();
          }
        });


    }); //end of API-fetch


      $(window).load(function(){

            var film = window.location.hash.substring(1);
            console.log("This is the passed value >> ");
            console.log(film);

            $.getJSON("http://api.tvmaze.com/search/shows?q=" + film, function(json){


               // $('#finfo').html('<img style="max-height: 400px" id="filmInfo" src=' + json[0].show.image.original + ' />');

              console.log("GETTING Recommended");


              //var json = getFilmInfo();
              var films = []; //the array containing the recommended films
              //var filmsLen = 10;
              var cnt = 0;


              /* Criteria declarations for finding new films */

              var score = json[0].show.rating.average;
              var sgenre = json[0].show.genres[0];
              var sid = json[0].show.id;
              var name = json[0].show.name;

              //console.log("Score >> " + score + " Genre >> " + sgenre + " ID >> " + sid);
                $('#finfo').html('<div> <h6 class="center-align yellow-text">' + name + ' -- ' + sgenre + ' -- '+ score +'</h6> </div>');



              $.getJSON("http://api.tvmaze.com/shows", function(json) {
                  console.log(json);
                  //while (cnt < filmsLen) {
                  var randNm = Math.floor((Math.random() * 100) + 1);
                  //var randNm_show = randNm_page + Math.floor((Math.random() * 100) + 1);
                  console.log(randNm);
                  //$('#finfo').html('<div> <h6 class="center-align yellow-text"> ' + random_page + '</h6> </div>');

                  for (var i = randNm; i < 240; i++) {
                      if ((json[i].genres[0] === sgenre) && (json[i].rating.average >= score)) {
                          //console.log(json[i].name + " " + json[i].genres[0] + " " + json[i].rating.average + "\n");
                          films.push(json[i]);
                          console.log(json[i]);
                          cnt++;
                          //if (length(films) < 10) randNm = Math.floor((Math.random() * 240) + 1);
                      }
                      //  }
                  }

                  // Providing findings to the Search results site! ***********

                  $('#first').html('<img src='+ films[0].image.original +'>');
                  //$('#first_poster').html('<img src='+ json[0].image.original +'>');
                  //$('#first_title').html('<img src='+ json[0].name +'>');
                  //$('#first_genre1').html('<img src='+ json[0].genres[0] +'>');

                  //var year = (json[0].premiered).substring(0,4);

                  $('#modal1_stuff').html('<h4 class="center yellow-text">' + films[0].name +' ('+ (films[0].premiered).substring(0,4) +')</h4> <div class="row">' +
                     '<div class=" col s6"> ' +
                        '<div class="thumbnail"> <img src='+ films[0].image.original +'> </div>' +
                        '</div>' +
                        '<div class="col s6">' +
                            '<div class=" chip  yellow lighten-1 blue-grey-text">'+films[0].rating.average +' </div>' +
                            '<div class=" chip  yellow lighten-1 blue-grey-text">'+films[0].genres[0] +' </div>' +
                            '<p>' + films[0].summary + '</p>' +
                        '</div>' +
                  '</div>');




                  $('#second').html('<img src='+ films[1].image.original +'>');
                  $('#third').html('<img src='+ films[2].image.original +'>');
                  $('#fourth').html('<img src='+ films[3].image.original +'>');
                  $('#fifth').html('<img src='+ films[4].image.original +'>');
                  $('#sixth').html('<img src='+ films[5].image.original +'>');
                  $('#seventh').html('<img src='+ films[6].image.original +'>');
                  $('#eigth').html('<img src='+ films[7].image.original +'>');
                  $('#nineth').html('<img src='+ films[8].image.original +'>');
                  $('#tenth').html('<img src='+ films[9].image.original +'>');


                  //console.log("Better: \n");
                  //console.log(films);
                  return films;


              });
            });
      });



  }); // end of document ready
})(jQuery); // end of jQuery name space
