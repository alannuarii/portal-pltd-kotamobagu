const chartSOF = document.addEventListener("DOMContentLoaded", () => {
  new Chart(document.querySelector("#chartSOF"), {
    type: "bar",
    data: {
      labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
      datasets: [
        {
          label: "SOF 2021",
          data: sof,
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
