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
