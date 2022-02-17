new Swiper(".clients-slider", {
  speed: 400,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  slidesPerView: "auto",
  breakpoints: {
    992: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});

// * Initiate glightbox
const glightbox = GLightbox({
  selector: ".glightbox",
});

// Initiate AOS
function aos_init() {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });
}
window.addEventListener("load", () => {
  aos_init();
});
