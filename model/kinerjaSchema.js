const mongoose = require("mongoose");

// Membuat Schema
const Kinerja = mongoose.model("kinerja", {
  tahunData: {
    type: Number,
  },
  bulanData: {
    type: Number,
  },
  namaUnit: {
    type: String,
  },
  dayaTerpasang: {
    type: Number,
    default: 0,
  },
  dayaMampu: {
    type: Number,
    default: 0,
  },
  produksi: {
    type: Number,
    default: 0,
  },
  psSentral: {
    type: Number,
    default: 0,
  },
  psTrafo: {
    type: Number,
    default: 0,
  },
  psTotal: {
    type: Number,
    default: function () {
      return this.psSentral + this.psTrafo;
    },
  },
  pemakaianBBM: {
    type: Number,
    default: 0,
  },
  nilaiKalorHSD: {
    type: Number,
    default: 9060,
  },
  nilaiKalorFAME: {
    type: Number,
    default: 7870,
  },
  po: {
    type: Number,
    default: 0,
  },
  mo: {
    type: Number,
    default: 0,
  },
  fo: {
    type: Number,
    default: 0,
  },
  sh: {
    type: Number,
    default: 0,
  },
  ph: {
    type: Number,
    default: 0,
  },
  rsh: {
    type: Number,
    default: function () {
      return this.ph - (this.po + this.mo + this.fo + this.sh);
    },
  },
  epdh: {
    type: Number,
    default: 0,
  },
  eudh: {
    type: Number,
    default: 0,
  },
  esdh: {
    type: Number,
    default: 0,
  },
  efdhrs: {
    type: Number,
    default: 0,
  },
  deratingTotal: {
    type: Number,
    default: function () {
      return this.epdh + this.eudh + this.esdh;
    },
  },
  tripin: {
    type: Number,
    default: 0,
  },
  tripex: {
    type: Number,
    default: 0,
  },
  dtph: {
    type: Number,
    default: function () {
      if (this.ph === 0) {
        return 0;
      } else {
        return this.dayaTerpasang * this.ph;
      }
    },
  },
  dmahder: {
    type: Number,
    default: function () {
      return this.dayaMampu * (this.sh + this.rsh - this.deratingTotal);
    },
  },
  dmph: {
    type: Number,
    default: function () {
      if (this.ph === 0) {
        return 0;
      } else {
        return this.dayaMampu * this.ph;
      }
    },
  },
  dmfoud: {
    type: Number,
    default: function () {
      return this.dayaMampu * (this.fo + this.eudh);
    },
  },
  dmfoshdrsh: {
    type: Number,
    default: function () {
      return this.dayaMampu * (this.fo + this.sh + this.efdhrs);
    },
  },
  dmhar: {
    type: Number,
    default: function () {
      return this.dayaMampu * (this.po + this.mo);
    },
  },
  sfcBruto: {
    type: Number,
    default: function () {
      if (this.produksi === 0) {
        return 0;
      } else {
        return this.pemakaianBBM / this.produksi;
      }
    },
  },
  sfcNetto: {
    type: Number,
    default: function () {
      if (this.produksi === 0) {
        return 0;
      } else {
        return this.pemakaianBBM / (this.produksi - this.psTotal);
      }
    },
  },
  taraKalorBrutoPLTD: {
    type: Number,
    default: function () {
      if (this.produksi === 0) {
        return 0;
      } else {
        return (0.7 * this.pemakaianBBM * this.nilaiKalorHSD + 0.3 * this.pemakaianBBM * this.nilaiKalorFAME) / this.produksi;
      }
    },
  },
  taraKalorNettoPLTD: {
    type: Number,
    default: function () {
      if (this.produksi === 0) {
        return 0;
      } else {
        return (0.7 * this.pemakaianBBM * this.nilaiKalorHSD + 0.3 * this.pemakaianBBM * this.nilaiKalorFAME) / (this.produksi - this.psTotal);
      }
    },
  },
  sof: {
    type: Number,
    default: function () {
      if (this.ph === 0) {
        return 0;
      } else {
        return ((this.po + this.mo) / this.ph) * 100;
      }
    },
  },
  cf: {
    type: Number,
    default: function () {
      if (this.dayaTerpasang === 0 || this.produksi === 0) {
        return 0;
      } else {
        return (this.produksi / (this.dayaTerpasang * this.ph)) * 100;
      }
    },
  },
  eaf: {
    type: Number,
    default: function () {
      if (this.ph === 0) {
        return 0;
      } else {
        return ((this.sh + this.rsh - this.deratingTotal) / this.ph) * 100;
      }
    },
  },
  efor: {
    type: Number,
    default: function () {
      if (this.fo + this.sh + this.efdhrs === 0) {
        return 0;
      } else {
        return ((this.fo + this.eudh) / (this.fo + this.sh + this.efdhrs)) * 100;
      }
    },
  },
  edof: {
    type: Number,
    default: this.tripin,
  },
  ps: {
    type: Number,
    default: function () {
      if (this.produksi === 0) {
        return 0;
      } else {
        return (this.psTotal / this.produksi) * 100;
      }
    },
  },
});

// const kinerja1 = new Kinerja({
//   periodeData: "10-2021",
//   namaUnit: "PLTU Amurang #2",
//   dayaTerpasang: 25000,
//   dayaMampu: 22500,
//   produksi: 11896100,
//   psSentral: 1485798.09300002,
// //   psTrafo: 0,
//   pemakaianBBM: 9944590,
//   nilaiKalorHSD: 10000,
//   po: 0,
//   mo: 216,
//   fo: 37.5999999999767,
// //   foOMC: 0,
//   sh: 490.400000000023,
//   ph: 744,
//   epdh: 0,
//   eudh: 0,
// //   esdh: 0,
// //   efdhrs: 0,
//   tripin: 0,
//   tripex: 0,
// });

// kinerja1.save().then((data) => console.log(data));

module.exports = Kinerja;
