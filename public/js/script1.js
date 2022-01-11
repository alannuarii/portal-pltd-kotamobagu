const inputGroupSelect04 = document.getElementById("inputGroupSelect04");

inputGroupSelect04.onchange = function isiUnit(event) {
  if (event.target.value === "PLTD Kotamobagu #1") {
    document.getElementById("dayaTerpasang").value = 500;
    document.getElementById("dayaMampu").value = 300;
  } else if (event.target.value === "PLTD Kotamobagu #2") {
    document.getElementById("dayaTerpasang").value = 500;
    document.getElementById("dayaMampu").value = 300;
  } else if (event.target.value === "PLTD Kotamobagu #3") {
    document.getElementById("dayaTerpasang").value = 1000;
    document.getElementById("dayaMampu").value = 650;
  } else if (event.target.value === "PLTD Kotamobagu #4") {
    document.getElementById("dayaTerpasang").value = 1000;
    document.getElementById("dayaMampu").value = 0;
  } else if (event.target.value === "PLTD Kotamobagu #5") {
    document.getElementById("dayaTerpasang").value = 2500;
    document.getElementById("dayaMampu").value = 1700;
  } else if (event.target.value === "PLTD Kotamobagu #6") {
    document.getElementById("dayaTerpasang").value = 2500;
    document.getElementById("dayaMampu").value = 1700;
  }
};
