const chartSFC = document.addEventListener("DOMContentLoaded", () => {
  new Chart(document.querySelector("#chartSFC"), {
    type: "line",
    data: {
      labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
      datasets: [
        {
          label: "SFC 2021",
          data: sfc,
          fill: false,
          backgroundColor: ["rgba(0, 174, 239, 0.8)"],
          borderColor: ["rgb(0, 174, 239)"],
          tension: 0.1,
          borderWidth: 2.5,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: "true",
            text: "Liter/kWh",
          },
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
