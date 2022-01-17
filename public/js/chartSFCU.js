const chartSFCU = document.addEventListener("DOMContentLoaded", () => {
  new Chart(document.querySelector("#chartSFCU"), {
    type: "bar",
    data: {
      labels: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6"],
      datasets: [
        {
          label: "SFC",
          data: sfcu,
          fill: false,
          backgroundColor: ["rgba(155, 93, 229, 0.8)", "rgba(155, 93, 229, 0.8)", "rgba(155, 93, 229, 0.8)", "rgba(155, 93, 229, 0.8)", "rgba(155, 93, 229, 0.8)", "rgba(155, 93, 229, 0.8)"],
          borderColor: ["rgba(155, 93, 229)", "rgba(155, 93, 229)", "rgba(155, 93, 229)", "rgba(155, 93, 229)", "rgba(155, 93, 229)", "rgba(155, 93, 229)"],
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
