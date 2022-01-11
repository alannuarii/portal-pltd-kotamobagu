const tombolSLO = document.querySelectorAll(".button-slo");
tombolSLO.forEach((slo, i) => {
  slo.addEventListener("click", function () {
    const modalslo = showmodalslo(i);
    const modalbody = document.querySelector(".modal-body");
    modalbody.innerHTML = modalslo;
  });
});

const showmodalslo = (i) => {
  return `<div class="container-fluid">
    <div class="row">
      <div class="col-md">
        <img src="img/slo${i + 1}.png" class="img-fluid" />
        </div>
    </div>
  </div>`;
};
