const chartHOP = document.addEventListener("DOMContentLoaded", () => {
  new Chart(document.querySelector("#chartHOP"), {
    type: "doughnut",
    data: {
      // labels: ["Persediaan"],
      datasets: [
        {
          label: "HOP",
          data: hop,
          fill: false,
          backgroundColor: ["#7D70B7", "rgba(255, 0, 0, 0)"],
          borderColor: ["#7D70B7", "rgba(255, 0, 0, 0)"],
          tension: 0.1,
          borderWidth: 2.5,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {},
      },
    },
  });
});
