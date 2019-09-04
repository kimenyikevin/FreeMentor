window.onscroll = function() {
  scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    document.getElementById("navigator").style.padding = "20px 100px";
    document.getElementById("logo").style.fontSize = "1.3em";
  } else {
    document.getElementById("navigator").style.padding = "15px 80px";
    document.getElementById("logo").style.fontSize = "1.6em";
  }
}
var menuBox = document.getElementById('navbar-left'); 
function toggleMenu() {
  if (x.matches && menuBox.style.display == "none"){ 
    menuBox.style.display= "block";
    console.log(menuBox); 
  } else {
    menuBox.style.display = "none";
  }
}
var x = window.matchMedia("(max-width: 450px");
 toggleMenu(x);
x.addListener(toggleMenu);
// End of navigator

var myIndex = 0;
carousel();
function carousel() {
  var i;
  var x = document.getElementsByClassName("switch");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 10000); // Change image every 10 seconds
}
// section for personal review 
const slideshowImages = document.querySelectorAll(".review-slideshow li");
const nextImageDelay = 10000;
let currentImageCounter = 0; 
slideshowImages[currentImageCounter].style.opacity = 1;
setInterval(nextImage, nextImageDelay);
function nextImage() {
  slideshowImages[currentImageCounter].style.opacity = 0;
  currentImageCounter = (currentImageCounter+1) % slideshowImages.length;
  slideshowImages[currentImageCounter].style.opacity = 1;
}

// Admin dashboard , user and mentor dashoard
function ShowChange(evt, mentorName) {
  var i, tabcontent, tablinks; 
  tabcontent = document.getElementsByClassName("main-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("left-links");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  document.getElementById(mentorName).style.display = "block";
  evt.currentTarget.className += " active";
}
function check(form) {

 if(form.userid.value == "user@gmail.com" && form.pswrd.value == "user")
  { 
    window.open('../pages/user.html');
    window.close();
  } else if( form.userid.value == "mentor@gmail.com" && form.pswrd.value == "mentor"){
  window.open('../pages/mentor.html');
  window.close();
}else if(form.userid.value == "admin@gmail.com" && form.pswrd.value == "admin"){
  window.open('../pages/admin.html');
  window.close();
} else{
  document.getElementById("wrong").innerHTML = 'Email or password is wrong';
} 
}
///  feedback form
function popup(evt, mentorName) {
  document.getElementById(mentorName).style.display = "block";
  evt.currentTarget.className += " active";
  var span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
    mov.style.display = "none";
  }
  var mov = document.getElementById('feedBack');
     window.onclick = function(event) {
   if (event.target == mov) {
    mov.style.display = "none";
  }
}
}



