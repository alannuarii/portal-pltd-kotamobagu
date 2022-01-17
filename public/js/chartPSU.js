const chartPSU = document.addEventListener("DOMContentLoaded", () => {
  new Chart(document.querySelector("#chartPSU"), {
    type: "bar",
    data: {
      labels: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6"],
      datasets: [
        {
          label: "PS",
          data: psu,
          fill: false,
          backgroundColor: ["rgba(241, 91, 181, 0.8)", "rgba(241, 91, 181, 0.8)", "rgba(241, 91, 181, 0.8)", "rgba(241, 91, 181, 0.8)", "rgba(241, 91, 181, 0.8)", "rgba(241, 91, 181, 0.8)"],
          borderColor: ["rgba(241, 91, 181)", "rgba(241, 91, 181)", "rgba(241, 91, 181)", "rgba(241, 91, 181)", "rgba(241, 91, 181)", "rgba(241, 91, 181)"],
          tension: 0.1,
          borderWidth: 2.5,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
});
