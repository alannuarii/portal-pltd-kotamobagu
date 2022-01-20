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
  <input type="hidden" name="_id" value = 61e96cf34d4657477befe267 />
</div>
<div class="text-center mt-2">
  <button type="submit" class="btn btn-primary col-12">Simpan</button>
</div>`;
};

const tombolRemoveForm = document.querySelector(".del-btn");
const removeForm = document.querySelectorAll(".del-form");

tombolRemoveForm.addEventListener("click", function () {
  tombolRemoveForm.removeChild(removeForm);
});

const persenKapasitas = document.getElementById("persen-kapasitas").value;

if (persenKapasitas < 50 && persenKapasitas >= 20) {
  document.getElementById("ubah-icon").src = "img/warning.png";
  document.getElementById("ubah-icon").title = "HATI-HATI";
} else if (persenKapasitas < 20) {
  document.getElementById("ubah-icon").src = "img/danger.png";
  document.getElementById("ubah-icon").title = "BAHAYA";
}
