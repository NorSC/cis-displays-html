var slideIndex = 0;
const default_len = 20000;
showSlides();
// checkForImages();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";

  // console.log(slides[slideIndex - 1]);

  if (slides[slideIndex - 1].hasAttribute("data-length")) {
    var len = slides[slideIndex - 1].getAttribute("data-length");
    // console.log(len);
    setTimeout(showSlides, len * 1000);
  } else {
    setTimeout(showSlides, default_len); // Change image every default_len milliseconds seconds
  }
}

function checkForImages() {
  var query = window.parent.location.href;
  var myDir = query.substring(0, query.lastIndexOf("/") + 1);

  for (i = 0; i < 20; i++) {
    if (ifFileExist(myDir + "images/image_" + i + ".jpg")) {
      insertImageSlide(src);
    }
  }

  for (i = 0; i < 20; i++) {
    if (ifFileExist(myDir + "videos/video" + i + ".jpg")) {
      insertVideoSlide(src);
    }
  }
}

function ifFileExist(src) {
  var xhr = new XMLHttpRequest();
  xhr.open("HEAD", src, false);
  xhr.send();
  return xhr.status != 404;
}

function insertImageSlide(URL) {
  var slideshow = document.getElementsByClassName("slideshow-container");
  var html = '<div class="mySlides fade">';
  html += '<img src="' + URL + '">';
  html += "</div>";
  slideshow.appendChild(html);
}

function insertVideoSlide(URL) {
  var slideshow = document.getElementsByClassName("slideshow-container");
  var html = '<div class="mySlides fade">';
  html +=
    '<video class="vid center" playsinline muted autoplay loop><source src="' +
    URL +
    '" type="video/mp4"></video>';
  html += "</div>";
  var node = slideshow.appendChild(html);

  var vid = node.getElementsByClassName(vid);
  if (vid.duration > 0) {
    node.setAttribute("data-length", vid.duration);
  }
}
