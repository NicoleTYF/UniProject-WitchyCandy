/* 5 unique interactions implemented with jQuery/JavaScript */

/**
 1. Open search bar screen when user clicks search button
	 type in word to search for the location of the contents
	(Dynamic navigation within a page or between pages in response to the user)
	References: w3school. (n.d.). JavaScript String search() Method. Retrived from 
				https://www.w3schools.com/jsref/jsref_search.asp
				w3school. (n.d.). How TO - Full screen Overlay Navigation. Retrived from
				https://www.w3schools.com/howto/howto_js_fullscreen_overlay.asp
*/
function openSearch() {
	// The divider of search window slides down 
	document.getElementById("searchWindow").style.height = "100%";
	document.getElementById("websearchField").classList.add("expand");
	docmuent.getElementById("websearchbtn").style.backgroundColor = "#f35e22";
	
}
function closeSearch() {
	// The divider of search window slides up
	document.getElementById("searchWindow").style.height = "0%";
	document.getElementById("websearchField").classList.remove("expand");
	docmuent.getElementById("websearchbtn").style.backgroundColor = "#e0220d";
}
function wordSearch(isWord) {
	// Declare variables
	var input, filter, searchList, output, i, list, 
		searchArea, items, contentTxt, noResult;
	input = document.getElementById('websearchField');
	filter = input.value.toUpperCase();
	searchList = document.getElementById("searchList");
	if(isWord == true) {
	  items = document.getElementsByTagName('article');  
	} else {
	  items = document.getElementsByClassName('popUpText');  
	}
	
	output = searchList.getElementsByTagName('li');		
	contentTxt = document.getElementsByClassName('searchListContent'); 
	noResult = document.getElementById('noResult')

	// Loop through all list items, and hide those who don't 
	// match the search query
	var hasResult = false;
	for (i = 0; i < items.length; i++) {
		var txtValue = "";
		if(isWord == true) {
			searchArea = items[i].getElementsByTagName("p")[0];
			txtValue = searchArea.innerText;	
		} else {
			for (list = 0; list < items[i].getElementsByTagName(
				"li", "p").length; list++) {
				searchArea = items[i].getElementsByTagName("li")[list]; 
				txtValue += searchArea.innerText;	
			}
		}
		
		var hr = document.getElementsByTagName('hr'); 
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
		  output[i].style.display = "";
		  hr[i].style.display = "";  
		  contentTxt[i].innerHTML = "... " + input.value + " ...";
		  hasResult = true;
		 
		} else {
		  output[i].style.display = "none";
		  hr[i].style.display = "none";
		  contentTxt[i].innerHTML = "... content ...";
		}
	}
	
	if (hasResult == false) {
		noResult.style.display = "block"; 
	} else {
		noResult.style.display = "none";
	}
}

/** 
2. "Like" a dessert when user clicks like button
	page transition when user click on "next" or "previous" 
	arrow button
 	(Manipulation of presentation in response to the user)
*/
$(document).ready(function(){
	$(".likeBtn").click(function(){
		// "Like" button changes background image
		$(this).toggleClass("liked");
	});
	
	$("#next").click(function(){
		// next button disappear, previous button appear
		// the first candy window disappear, second one appears
		$(this).css("display", "none");
		$("#previous").css("display", "block");
		$("#c1").css("z-index", "2");
		$("#c2").css("z-index", "4");
	});
	
	$("#previous").click(function(){
		// previous button disappear, next button appear
		// the second candy window disappear, first one appears
		$(this).css("display", "none");
		$("#next").css("display", "block");
		$("#c1").css("z-index", "4");
		$("#c2").css("z-index", "2");
	});	
});


/** 
3. Open popup box to show extra information of the 
	desserts/recipes(Stylistic integration of simple jQuery plugins)
	Reference:	W3School. (n.d.). How To Create a Modal Box. Retrieved from
				https://www.w3schools.com/howto/howto_css_modals.asp
*/
function openBox(number) {
	// The divider of search window slides down 
	document.getElementById("popUp" + number).style.
	display = "block";
}
function closeBox(number) {
	// The divider of search window slides down 
	document.getElementById("popUp" + number).style.
	display = "none";
}

/**
4. Scroll to position of the respective tip when user 
	click on navigation button
*/
function scrollToTips(type, number, offset){
	switch(type) {
		case "tip":
			window.scroll(0, document.querySelector("#tip"+ 
			number).offsetTop - offset);
			break;
		case "dessert":
			window.scroll(0, document.querySelector("#cell"+ 
			number).offsetTop - offset);
			break;
	}
}

/**
5. Finding Candy throughout the website
*/
var candyName = ["salad", "bowl", "limeCheeseCake", 
				 "honey", "chocolate", "custard"];

window.addEventListener('load', function() {
	
	if (localStorage.length != 0) {
		
		var hiddenItem = document.getElementsByClassName("candy");
		document.getElementById("count").innerHTML = 
			Number(localStorage.getItem("candyCount"));
		
		var i;
		for(i=0; i< hiddenItem.length; i++) {
			if(localStorage.getItem("item"+ candyName.indexOf
				(hiddenItem[i].id)) == "true") {
				hiddenItem[i].classList.remove("hiddenItem");
			}
		}
		
		if(Number(localStorage.getItem("candyCount")) >= 6) {
			document.getElementById("count").innerHTML = 6;
			document.getElementById("count").style.color = "green";
			document.getElementById("count").style.fontSize = "23px";
		}// end if
		
	} else {
		// First time setup.
		var candyList = [false, false, false, false, false, false];
		var candyCount = 0;
		localStorage.setItem("candyCount", 0);
		for(i=0; i< candyList.length; i++) {
			localStorage.setItem("item"+ i, candyList[i]);
		}			
	}
});

function updateCandyList(candyID) {
	if (localStorage.length != 0) {		// Check whether it's a new game.
		
		var i;
		// count the no.of candies collected.
		var candyCount = Number(localStorage.getItem("candyCount"));  
		// get the hidden item's candy name.
		var hiddenItem = document.getElementById(candyName[candyID]); 
		
		// Reload every candy's status (Collected = true, NOT collected = false)
		var candyList = [localStorage.getItem("item0"), 
						localStorage.getItem("item1"),
						localStorage.getItem("item2"),
						localStorage.getItem("item3"),
						localStorage.getItem("item4"),
						localStorage.getItem("item5")];

		// If the user haven't collected all six candies, go into the loop.
		if(candyCount < 6 && localStorage.getItem("item" + candyID) == "false") {	
			candyCount = Number(localStorage.getItem("candyCount")) + 1;
			localStorage.setItem("candyCount", candyCount);
			candyList[candyID] = true;
			localStorage.setItem("item"+candyID, true);
			
			hiddenItem.classList.remove('hiddenItem');
			document.getElementById("count").innerHTML = candyCount;
			document.getElementById("countPopup").classList.add("slide");
			window.setTimeout(removeSlide, 4000);
			
			for(i=0; i< candyList.length; i++) {
				if(candyList[i]== false) {
					hasCollectedAll = false;
					localStorage.setItem("CA", false);
				}// end if 
			}// end for loop
			
			if(candyCount >= 6) {
				document.getElementById("count").innerHTML = 6;
				document.getElementById("count").style.color = "green";
				document.getElementById("count").style.fontSize = "23px";
			}// end if
		}// end if 
		
	} else {
		var candyList = [false, false, false, false, false, false];
		var candyCount = 0;
		localStorage.setItem("candyCount", 0);
		for(i=0; i< candyList.length; i++) {
			localStorage.setItem("item"+(i+1), candyList[i]);
		}// end for	loop		
	}// end if 
}
function removeSlide() {
	document.getElementById("countPopup").classList.remove("slide");
}

/**
6. Drag and drop items
	Reference: 
	jQuery user interface. (n.d.).Draggable. Retrieved from https://jqueryui.com/draggable/
	Sweet Web design. (2012). Detecting Browser Window Size/ Resize with jQuery. Retrived from 
	http://www.sweet-web-design.com/wordpress/detecting-browser-window-size-resize-with-jquery/1614/
*/
$( function() {
	var i, windowSize;
	for (i = 0; i <= 13; i++) {
		$("#dragItem" + i).draggable();
	}
	
	$("#finishBox").click(function(){
		// previous button disappear, next button appear
		// the second candy window disappear, first one appears
		$(this).css("background-color", "#8fe637");
		windowSize = $(window).width();
		if(windowSize = 500) {
			$(this).css("min-width", "100%");
			$(this).css("padding", "8px 0%");
		} else {
			$(this).css("padding", "8px 280px");
		}
		
		$("#finishBtn").css("margin-left", "0px");
		$("#finishBtn").html("CONGRADULATIONS!");
		$(this).attr("disabled", true);
		
		for (i=0; i<= 13; i++) {
			$("#dragItem" + i).draggable("disable");
		}
	});	
});



