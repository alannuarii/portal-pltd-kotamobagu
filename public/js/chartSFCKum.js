const chartSFCKum = document.addEventListener("DOMContentLoaded", () => {
  new Chart(document.querySelector("#chartSFCKum"), {
    type: "bar",
    data: {
      labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
      datasets: [
        {
          label: "SFC Kumulatif 2021",
          data: sfcKum,
          fill: false,
          backgroundColor: ["rgba(255, 242, 0, 0.8)"],
          borderColor: ["rgb(255, 242, 0)"],
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
