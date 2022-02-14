const year = new Date().getFullYear();
const chartEAF = document.addEventListener("DOMContentLoaded", () => {
  new Chart(document.querySelector("#chartEAF"), {
    type: "line",
    data: {
      labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
      datasets: [
        {
          label: `${kpi} ${year}`,
          data: eaf,
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
            text: satuan,
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
