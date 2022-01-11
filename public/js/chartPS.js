const chartPS = document.addEventListener("DOMContentLoaded", () => {
  new Chart(document.querySelector("#chartPS"), {
    type: "bar",
    data: {
      labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
      datasets: [
        {
          label: "PS 2020",
          data: ps,
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
