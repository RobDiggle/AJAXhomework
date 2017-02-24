$(document).on('ready', function() {
	var fighters = ['Conor McGregor','Demetrious Johnson','Dominick Cruz','Rashad Evans','Kazushi Sakuraba','Shinya Aoki','Donald Cerrone','Doo Ho Choi','Georges St. Pierre','Khabib Nurmagomedov'];
	var stillPic = [];
	var gifPic = [];

	function mmaFighters()
    {
		    $('#mmaFighterButton').empty();
		    for (var i=0; i<fighters.length; i++) 
      {
			   var $but = $('<button>').attr('datfight',fighters[i]).text(fighters[i]);
			   $('#mmaFighterButton').append($but);
		  }
	   }  

	$(document).on('click', 'button', function() 
  {
		var $div = $('#fighters')
		$div.empty();
		stillPic = [];
		gifPic = [];
    var p = $(this).attr('datfight');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: 'GET'
      })
      .done(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $('<div class="item">')
          var rating = results[i].rating;
          var p = $('<p>').text("Rating: " + rating);
          var personImage = $('<img>').attr('data-num',i);
          var stillURL = results[i].images.fixed_height_still.url;
          var movingURL = results[i].images.fixed_height.url;
          stillPic.push(stillURL);
          gifPic.push(movingURL);
          personImage.attr('src', stillURL);
          gifDiv.append(p);
          gifDiv.append(personImage);
          $div.prepend(gifDiv);
        }

      });
  });

  $(document).on('click', 'img', function() {
  	var num = $(this).attr('data-num');
  	var currentURL = $(this).attr('src');
  	if (currentURL == stillPic[num]) {
  		$(this).attr('src', gifPic[num]);
  	} else {
  		$(this).attr('src', stillPic[num]);
  	}
  });

	$('#addFighter').on('click', function() {
		var userInput = $('#fighter-input').val();
		fighters.push(userInput);
		mmaFighters();
		return false;
	});

	mmaFighters();
});