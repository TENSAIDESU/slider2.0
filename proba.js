let images = [{
    url:"./images./slide1.png",
     title: "slide1",
     city:"Rostov-on-Don LCD admiral",
     time:"3.5 months",
     area:"81 m2",
   }, {
     url: "./images./slide2.png",
     title: "slide2",
     city:"Sochi Thieves",
     time:"4 months",
     area:"105 m2",
   }, {
     url: "./images./slide3.png",
     title: "slide3",
      city:"Rostov-on-Don Patriotic",
      time:"3 months",
      area:"93 m2",
   }];
function updateTextInfo(num){
  document.querySelector('.item-city').innerHTML = images[num].city;
  document.querySelector('.item-time').innerHTML = images[num].time;
  document.querySelector('.item-area').innerHTML = images[num].area;
}
function updateSelectElement(num){
  document.querySelector('.dot.active').classList.remove('active');
  document.querySelector(`.dot.n${num}`).classList.add('active');
  document.querySelector('.hav.active').classList.remove('active');
  document.querySelector(`.hav.n${num}`).classList.add('active');
}


   function initSlider(images, options) {
    if (!images || !images.length) return;
    const sliderWrapper = document.querySelector(".slider");
    const sliderImages = sliderWrapper.querySelector(".slider__images");
    const sliderArrows = sliderWrapper.querySelector(".slider__arrows");

    const parentDots = sliderWrapper.querySelector(".dots");
    const parentLinks = document.querySelector(".links");
    initImages();
    initArrows();
    
   
    
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
parentDots.innerHTML += `<div class="dot n${index} ${index === 0 ? 'active' : ''}"></div>`;
parentLinks.innerHTML += `<div class="hav n${index} ${index === 0 ? 'active' : ''}"></div>`;
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
      updateTextInfo(num);
      updateSelectElement(num);
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
