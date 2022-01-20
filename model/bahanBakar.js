const mongoose = require("mongoose");

// Membuat Schema
const Fuel = mongoose.model("fuel", {
  kapasitas: {
    type: Number,
    default: 849000,
  },
  pemakaian: {
    type: Number,
  },
  penambahan: {
    type: Number,
    default: 0,
  },
  persediaan: {
    type: Number,
    default: function () {
      return this.kapasitas - this.pemakaian;
    },
  },
  hop: {
    type: Number,
    default: function () {
      return this.persediaan / 60000;
    },
  },
  persenKap: {
    type: Number,
    default: function () {
      return ((this.kapasitas - (this.kapasitas - this.persediaan)) / this.kapasitas) * 100;
    },
  },

  //   tglDaftar: {
  //     type: Date,
  //     default: Date.now,
  //   },
});

// const fuel1 = new Fuel({
//   pemakaian: 20000,
//   penambahan: 0,
// });

// fuel1.save().then((data) => console.log(data));

module.exports = Fuel;
