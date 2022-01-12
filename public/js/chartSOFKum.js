const chartSOFKum = document.addEventListener("DOMContentLoaded", () => {
  new Chart(document.querySelector("#chartSOFKum"), {
    type: "bar",
    data: {
      labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
      datasets: [
        {
          label: "SOF Kumulatif 2021",
          data: sofKum,
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
