const mongoose = require("mongoose");

// Membuat Schema
const Mesin = mongoose.model("engine", {
  namaUnit: {
    type: String,
  },
  merk: {
    type: String,
  },
  tipeMesin: {
    type: String,
  },
  serialNumber: {
    type: String,
  },
  tahunOperasi: {
    type: String,
  },
  dayaMampu: {
    type: String,
  },
  dayaTerpasang: {
    type: String,
  },
});

// const mesin1 = new Mesin({
//   namaUnit: "ULPLTD Kotamobagu #6",
//   merk: "MAK",
//   tipeMesin: "8M 453 AK",
//   serialNumber: "26878",
//   tahunOperasi: "1987",
//   dayaTerpasang: 2500,
//   dayaMampu: 1700,
// });

// mesin1.save().then((mesin1) => console.log(mesin1));

module.exports = Mesin;
