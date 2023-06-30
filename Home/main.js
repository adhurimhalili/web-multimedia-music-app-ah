document.addEventListener("DOMContentLoaded", function() {
    var sliderImages = document.querySelectorAll(".slider img");
    var currentImage = 0;
    var slideInterval;
  
    function startSlide() {
      sliderImages[currentImage].className = "active";
      slideInterval = setInterval(nextSlide, 3000); // Change slide duration here (in milliseconds)
    }
  
    function nextSlide() {
      sliderImages[currentImage].className = "";
      currentImage = (currentImage + 1) % sliderImages.length;
      sliderImages[currentImage].className = "active";
    }
  
    var sliderNav = document.createElement("div");
    sliderNav.className = "slider-nav";
  
    for (var i = 0; i < sliderImages.length; i++) {
      var button = document.createElement("button");
      button.innerHTML = "&#9679;";
      button.addEventListener("click", goToSlide.bind(null, i));
      sliderNav.appendChild(button);
    }
  
    document.querySelector(".slider").appendChild(sliderNav);
  
    function goToSlide(index) {
      clearInterval(slideInterval);
      currentImage = index;
      for (var i = 0; i < sliderImages.length; i++) {
        sliderImages[i].className = "";
      }
      sliderImages[currentImage].className = "active";
      startSlide();
    }
  
    startSlide();
  });
  