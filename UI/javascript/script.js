// // When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function() {
  scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    document.getElementById("navigator").style.padding = "20px 100px";
    document.getElementById("logo").style.fontSize = "30px";
  } else {
    document.getElementById("navigator").style.padding = "15px 80px";
    document.getElementById("logo").style.fontSize = "35px";
  }
}
function toggleMenu() {
  var menuBox = document.getElementById('navbar-left'); 
  if(menuBox.style.display == "block")
  {
      menuBox.style.display = "none";
  } else{
      menuBox.style.display = "block";
  }
}

var myIndex = 0;
carousel();
function carousel() {
  var i;
  // var x = document.querySelectorAll('.mySlides');
  var x = document.getElementsByClassName("switch");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 5000); // Change image every 2 seconds
}