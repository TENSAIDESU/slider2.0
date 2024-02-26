let images = [{
    url:"./images./slide1.png",
     title: "slide1"
   }, {
     url: "./images./slide2.png",
     title: "slide2"
   }, {
     url: "./images./slide3.png",
     title: "slide3"
   }];

   function initSlider(images, options) {
    if (!images || !images.length) return;
    
    
    const sliderWrapper = document.querySelector(".slider");
    const sliderImages = sliderWrapper.querySelector(".slider__images");
    const sliderArrows = sliderWrapper.querySelector(".slider__arrows");
    initImages();
    initArrows();
    
    if (options.dots) {
      initDots();
    }
    
    if (options.titles) {
      initTitles();
    }
    
    function initImages() {
      images.forEach((image, index) => {
        let imageElement = document.createElement("div");
        imageElement.className = `image n${index} ${index? "" : "active"}`;
        imageElement.dataset.index = index;
        imageElement.style.backgroundImage = `url(${image.url})`;
        sliderImages.appendChild(imageElement);
      });
    }
    
    function initArrows() {
      let lastIndex = images.length - 1;
      sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
        arrow.addEventListener("click", function() {
          let curNumber = +sliderImages.querySelector(".active").dataset.index;
          let nextNumber;
          if (arrow.classList.contains("left")) {
            nextNumber = curNumber === 0? lastIndex : curNumber - 1;
          } else {
            nextNumber = curNumber === lastIndex? 0 : curNumber + 1;
          }
          moveSlider(nextNumber);
        });

      });
    }
    function moveSlider(num) {
      sliderImages.querySelector(".active").classList.remove("active");
      sliderImages.querySelector(`.n${num}`).classList.add("active");
      
      if (options.titles) {
        let title = sliderImages.querySelector(".slider__images-title");
        if (images[num].title) {
          title.innerText = images[num].title;
          title.style.display = "block";
        } else {
          title.style.display = "none";
        }
      }
    }
    function initTitles() {
      let titleHTML = `<div class="slider__images-title">${images[0].title}</div>`;
      sliderImages.innerHTML += titleHTML;
    }
   }
   document.addEventListener("DOMContentLoaded", () => {
    let sliderOptions = {
      dots: true,
      titles: false}
    initSlider(images, sliderOptions);
  });
  const dots = document.querySelectorAll('.dot');
const links = document.querySelectorAll('.links a');
let currentIndex = 0;
prevArrow.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.children.length) % slides.children.length;
  updateSlider();
});

nextArrow.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.children.length;
  updateSlider();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateSlider();
  });
});

links.forEach((link, index) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = index;
    updateSlider();
  });
});

function updateSlider() {
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
  links.forEach((link, index) => {
    link.classList.toggle('active', index === currentIndex);
  });
}