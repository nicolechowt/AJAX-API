# Taylor Swift's Boyfriend Hall of Fame - APIs & AJAX

## Live Link 
 - https://nicolechowt.github.io/AJAX-API/index.html

## Description on how to use the app
- When the page first loads, a set of buttons are shown on top. 
- When a user clicks on a button, the page will grab 10 static, non-animated gif images related to the name of the button. 
- When a user clicks on a GIPHY image, the gif will animate. If the user clicks on the gif again, it will stop playing.
- To create a new button, user can enter a keyword in the input field and click the “boyfriend generator” button. All user-generated buttons can also be clicked to populate related gif images.


## Requirements
- The final app should dynamically create a set of buttons on page load and allow user to add to the set.
- The gif images should change its animate-state with a user click.
- The gif images are from the GIPHY API.
- Under every gif, it will display its rating (PG, G, etc) provided by the GIPHY API.


## Technologies Used
- Bootstrap for styling
- Jquery for Dom Manipulation
- AJAX for API GET requests

-------------

## Code Explanation

### Creating buttons dynamically
Using jQuery, I created a createButtons function to dynamically create buttons for each element in an array. I then assigned each button with a class of “lover”, along with two other bootstrap button classes. Finally, I appended every button to a allButtons class to wrap everything in one container.

### AJAX Request to Giphy 
I created an event listener for all the buttons created by the createButtons function. Each time a button with the class of lover is clicked, the code will set its name attribute to a variable called loverName. This is important because I am using this variable to concatenate my query URL. 

Once I have the query URL, I will make an AJAX request to the GIPHY API. When using the built-in done function, I can pass the response as a parameter in the function. Based on the GIPHY API doc, we know that the response returns an object, and by parsing through the object, we are able to get the data we need and use them to manipulate our DOM.

```
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
