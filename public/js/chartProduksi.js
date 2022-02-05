const chartProduksi = document.addEventListener("DOMContentLoaded", () => {
  new Chart(document.querySelector("#chartProduksi"), {
    type: "bar",
    data: {
      labels: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6"],
      datasets: [
        {
          label: "Produksi (kWh)",
          data: produksi,
          fill: false,
          backgroundColor: ["rgba(1,174,240, 0.8)", "rgba(1,174,240, 0.8)", "rgba(1,174,240, 0.8)", "rgba(1,174,240, 0.8)", "rgba(1,174,240, 0.8)", "rgba(1,174,240, 0.8)"],
          borderColor: ["rgba(1,174,240)", "rgba(1,174,240)", "rgba(1,174,240)", "rgba(1,174,240)", "rgba(1,174,240)", "rgba(1,174,240)"],
          tension: 0.1,
          borderWidth: 2,
          borderRadius: 50,
          borderSkipped: false,
        },
      ],
    },
    plugins: [ChartDataLabels],
    options: {
      responsive: true,
      indexAxis: "x",
      scales: {
        x: {
          grid: {
            drawBorder: false,
            display: false,
          },
        },
        y: {
          display: false,
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
        },
        datalabels: {
          labels: {
            value: {
              color: "#444444",
            },
          },
        },
      },
    },
  });
});
