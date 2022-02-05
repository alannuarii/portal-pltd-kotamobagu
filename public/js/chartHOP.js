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
          backgroundColor: ["#dda15e", "rgba(255, 0, 0, 0)"],
          borderColor: ["#dda15e", "rgba(255, 0, 0, 0)"],
          tension: 0.1,
          borderWidth: 2.5,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {},
      },
    },
  });
});
