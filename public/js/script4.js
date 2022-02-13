const sideLink = document.querySelectorAll(".sidebar-nav .nav-link");
sideLink.forEach((el) => {
  el.addEventListener("click", function () {
    el.style.backgroundColor = "#c0cfec5d";
  });
});

const input = document.querySelectorAll(".detail-pers input");

input.forEach((el) => {
  el.addEventListener("dblclick", function () {
    el.removeAttribute("readonly");
  });
});

// input.forEach((el) => {
//   el.addEventListener("dblclick", function () {
//     if ((el.readonly = true)) {
//       el.removeAttribute("readonly");
//     }
//     else if ((el.readonly = false)) {
//       el.setAttribute("readonly", true);
//     }
//   });
// });


