const sideLink = document.querySelectorAll(".sidebar-nav .nav-link");
sideLink.forEach((el) => {
  el.addEventListener("click", function () {
    el.style.backgroundColor = "#c0cfec5d";
  });
});
