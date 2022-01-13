const chartEAFU = document.addEventListener("DOMContentLoaded", () => {
  new Chart(document.querySelector("#chartEAFU"), {
    type: "bar",
    data: {
      labels: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6"],
      datasets: [
        {
          label: "EAF 2021",
          data: eafu,
          fill: false,
          backgroundColor: ["rgba(155, 93, 229, 0.8)", "rgba(241, 91, 181, 0.8)", "rgba(254, 228, 64, 0.8)", "rgba(155, 93, 229, 0.8)", "rgba(0, 187, 249, 0.8)", "rgba(0, 245, 212, 0.8)"],
          borderColor: ["rgba(155, 93, 229)", "rgba(241, 91, 181)", "rgba(254, 228, 64)", "rgba(155, 93, 229)", "rgba(0, 187, 249)", "rgba(0, 245, 212)"],
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
