const updateHOP = document.querySelector(".update-hop");

updateHOP.addEventListener("click", function () {
  const formUpdate = showFormUpdate();
  const formInputBBM = document.querySelector(".form-inputBBM");
  formInputBBM.innerHTML = formUpdate;
});

const showFormUpdate = () => {
  return `<div class="col-md-6">
  <label class="form-label">Pemakaian (Liter)</label>
  <input type="number" id="pemakaian" class="form-control" name="pemakaian" value = ${pemakaian} />
</div>

<div class="col-md-6">
  <label class="form-label">Penambahan (Liter)</label>
  <input type="number" class="form-control" id="penambahan" name="penambahan" value = ${penambahan} />
  <input type="hidden" name="idFuel" value = ${idFuel} />
</div>
<div class="text-center mt-2">
  <button type="submit" class="btn btn-primary col-9">Update</button>
  <button class="btn btn-danger col-2 close-btn"><i class="bi-x-lg"></i></button>
</div>`;
};

const persenKapasitas = document.getElementById("persen-kapasitas").value;

if (persenKapasitas < 50 && persenKapasitas >= 20) {
  document.getElementById("ubah-icon").src = "img/warning.png";
  document.getElementById("ubah-icon").title = "HATI-HATI";
} else if (persenKapasitas < 20) {
  document.getElementById("ubah-icon").src = "img/danger.png";
  document.getElementById("ubah-icon").title = "BAHAYA";
}
