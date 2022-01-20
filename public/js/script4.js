const persenKapasitas = document.getElementById("persen-kapasitas").value;

if (persenKapasitas < 50 && persenKapasitas >= 20) {
  document.getElementById("ubah-icon").src = "img/warning.png";
  document.getElementById("ubah-icon").title = "HATI-HATI";
} else if (persenKapasitas < 20) {
  document.getElementById("ubah-icon").src = "img/danger.png";
  document.getElementById("ubah-icon").title = "BAHAYA";
}

