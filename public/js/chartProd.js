const chartProd = document.addEventListener("DOMContentLoaded", () => {
  new Chart(document.querySelector("#chartProd"), {
    type: "doughnut",
    data: {
      // labels: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6"],
      datasets: [
        {
          label: "Produksi",
          data: prod,
          fill: false,
          backgroundColor: ["#7D70B7", "rgba(4, 139, 168)", "rgba(22, 219, 147)", "rgba(131, 227, 119)", "rgba(239, 234, 90)", "rgba(242, 158, 76)"],
          borderColor: ["#7D70B7", "rgba(4, 139, 168)", "rgba(22, 219, 147)", "rgba(131, 227, 119)", "rgba(239, 234, 90)", "rgba(242, 158, 76)"],
          tension: 0.1,
          borderWidth: 2.5,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
      },
    },
  });
});
