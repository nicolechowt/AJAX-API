var taylorSwiftsLovers=[ "Joe Jonas", "Taylor Lautner", "John Mayer", "Jake Gyllenhaal", "Conor Kennedy", "Harry Styles", "Calvin Harris", "Tom Hiddleston"];

// create buttons of all of her exes
createButtons();

function createButtons(){
	$.each(taylorSwiftsLovers, function (index, value) {

		var button = $("<button>");
		button.addClass("lover btn btn-danger");
		button.attr("name", value);
		button.text(value);
		$(".allButtons").append( button );

	});

}

function addAButton(){
	var newBoyFriend=taylorSwiftsLovers[taylorSwiftsLovers.length-1];
	var button = $("<button>");
		button.addClass("lover btn btn-danger");
		button.attr("name",newBoyFriend);
		button.text(newBoyFriend);
		$(".allButtons").append( button );

}

// when any of the buttons is clicked, make an ajax call and retrive 5 gifs of that ex

	$(".allButtons").on ("click", ".lover", function () {
		var loversName = $(this).attr("name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        loversName + "&api_key=dc6zaTOxFJmzC&limit=10";
		
		
		$.ajax({
			url: queryURL,
			method: "GET"
		})

		.done(function(response){

			for (var i=0; i<response.data.length; i++) {
				var imageUrl= response.data[i].images.fixed_width_still.url;
				var imageUrlStill = response.data[i].images.fixed_width_still.url;
				var imageUrlAnimated = response.data[i].images.fixed_width.url;
		      	var bfImage = $("<img>"+"<br>"+response.data[i].rating+"<br>");

		      	bfImage.attr("src", imageUrl);
		      	bfImage.attr("data-still", imageUrlStill);
		      	bfImage.attr("data-animate", imageUrlAnimated);
		      	bfImage.attr("class", "gif");
		      	bfImage.attr("alt", "taylorsBF image");
		      	bfImage.attr("animate-state", "still");


		      	$("#images").prepend(bfImage);

		    }
		});

	});




// when submit is clicked, get user's input and push that into taylorSwiftsLovers Array
// then add the corresponding button

	$(":submit").on ("click", function (){
		event.preventDefault();
		var userInput = $( "input" ).val();
		taylorSwiftsLovers.push(userInput);
		if (userInput.trim().length>0) {
			addAButton();
			$('input[type="text"], textarea').val('');
		};
	})

// when a gif is clicked, animate gif

	$("#images").on ("click", ".gif", function () {
		var state = $(this).attr("animate-state");
		if ( state === "still" ){
		 $(this).attr("src", $(this).attr("data-animate"));
		 $(this).attr("animate-state", "animate");

		} else {
		 $(this).attr("src", $(this).attr("data-still"));
		 $(this).attr("animate-state", "still");
		}
	});






