require("../../config/db");
const Kinerja = require("../../model/kinerjaSchema");
const { rumusEAF, rumusEFOR, rumusSOF, rumusPS, rumusSFC } = require("./formula");

const rumusSUM = function (as) {
  return as.reduce((accumulator, curr) => accumulator + curr);
};

const year = new Date().getFullYear() - 1;

async function getKumEAF() {
  const arrdmahder = [];
  const arrdmph = [];

  for (j = 1; j < 13; j++) {
    getBul1 = await Kinerja.find({ $and: [{ tahunData: year }, { bulanData: j }] });
    dmahder = [];
    dmph = [];
    for (let i = 0; i < getBul1.length; i++) {
      dmahder.push(getBul1[i].dmahder);
      dmph.push(getBul1[i].dmph);
    }
    arrdmahder.push(rumusSUM(dmahder));
    arrdmph.push(rumusSUM(dmph));
  }
  arrKumdmahder = [];
  arrKumdmph = [];
  arrKumEAF = [];
  sum1 = 0;
  sum2 = 0;
  for (k = 0; k < arrdmahder.length; k++) {
    arrKumdmahder.push((sum1 += arrdmahder[k]));
    arrKumdmph.push((sum2 += arrdmph[k]));
    arrKumEAF.push(rumusEAF(arrKumdmahder, arrKumdmph));
  }
  return arrKumEAF;
  // // console.log(arrKumdmahder);
  // console.log(arrKumEAF);
}

async function getKumEFOR() {
  const arrdmfoud = [];
  const arrdmfoshdrsh = [];

  for (j = 1; j < 13; j++) {
    getBul1 = await Kinerja.find({ $and: [{ tahunData: year }, { bulanData: j }] });
    dmfoud = [];
    dmfoshdrsh = [];
    for (let i = 0; i < getBul1.length; i++) {
      dmfoud.push(getBul1[i].dmfoud);
      dmfoshdrsh.push(getBul1[i].dmfoshdrsh);
    }
    arrdmfoud.push(rumusSUM(dmfoud));
    arrdmfoshdrsh.push(rumusSUM(dmfoshdrsh));
  }
  arrKumdmfoud = [];
  arrKumdmfoshdrsh = [];
  arrKumEFOR = [];
  sum1 = 0;
  sum2 = 0;
  for (k = 0; k < arrdmfoud.length; k++) {
    arrKumdmfoud.push((sum1 += arrdmfoud[k]));
    arrKumdmfoshdrsh.push((sum2 += arrdmfoshdrsh[k]));
    arrKumEFOR.push(rumusEFOR(arrKumdmfoud, arrKumdmfoshdrsh));
  }
  return arrKumEFOR;
  // // console.log(arrKumdmfoud);
  // console.log(arrKumEAF);
}

async function getKumSOF() {
  const arrdmhar = [];
  const arrdmph = [];

  for (j = 1; j < 13; j++) {
    getBul1 = await Kinerja.find({ $and: [{ tahunData: year }, { bulanData: j }] });
    dmhar = [];
    dmph = [];
    for (let i = 0; i < getBul1.length; i++) {
      dmhar.push(getBul1[i].dmhar);
      dmph.push(getBul1[i].dmph);
    }
    arrdmhar.push(rumusSUM(dmhar));
    arrdmph.push(rumusSUM(dmph));
  }
  arrKumdmhar = [];
  arrKumdmph = [];
  arrKumSOF = [];
  sum1 = 0;
  sum2 = 0;
  for (k = 0; k < arrdmhar.length; k++) {
    arrKumdmhar.push((sum1 += arrdmhar[k]));
    arrKumdmph.push((sum2 += arrdmph[k]));
    arrKumSOF.push(rumusSOF(arrKumdmhar, arrKumdmph));
  }
  return arrKumSOF;
  // // console.log(arrKumdmahder);
  // console.log(arrKumEAF);
}

async function getKumPS() {
  const arrpsTotal = [];
  const arrproduksi = [];

  for (j = 1; j < 13; j++) {
    getBul1 = await Kinerja.find({ $and: [{ tahunData: year }, { bulanData: j }] });
    psTotal = [];
    produksi = [];
    for (let i = 0; i < getBul1.length; i++) {
      psTotal.push(getBul1[i].psTotal);
      produksi.push(getBul1[i].produksi);
    }
    arrpsTotal.push(rumusSUM(psTotal));
    arrproduksi.push(rumusSUM(produksi));
  }
  arrKumpsTotal = [];
  arrKumproduksi = [];
  arrKumPS = [];
  sum1 = 0;
  sum2 = 0;
  for (k = 0; k < arrpsTotal.length; k++) {
    arrKumpsTotal.push((sum1 += arrpsTotal[k]));
    arrKumproduksi.push((sum2 += arrproduksi[k]));
    arrKumPS.push(rumusPS(arrKumpsTotal, arrKumproduksi));
  }
  return arrKumPS;
  // // console.log(arrKumdmahder);
  // console.log(arrKumEAF);
}

async function getKumSFC() {
  const arrpemakaianBBM = [];
  const arrproduksi = [];

  for (let j = 1; j < 13; j++) {
    getBul1 = await Kinerja.find({ $and: [{ tahunData: year }, { bulanData: j }] });
    pemakaianBBM = [];
    produksi = [];
    for (let i = 0; i < getBul1.length; i++) {
      pemakaianBBM.push(getBul1[i].pemakaianBBM);
      produksi.push(getBul1[i].produksi);
    }
    arrpemakaianBBM.push(rumusSUM(pemakaianBBM));
    arrproduksi.push(rumusSUM(produksi));
  }
  arrKumpemakaianBBM = [];
  arrKumproduksi = [];
  arrKumSFC = [];
  sum1 = 0;
  sum2 = 0;
  for (k = 0; k < arrpemakaianBBM.length; k++) {
    arrKumpemakaianBBM.push((sum1 += arrpemakaianBBM[k]));
    arrKumproduksi.push((sum2 += arrproduksi[k]));
    arrKumSFC.push(rumusSFC(arrKumpemakaianBBM, arrKumproduksi));
  }
  return arrKumSFC;
  // // console.log(arrKumdmahder);
  // console.log(arrKumEAF);
}

async function getKumProd() {
  const arrunit = [];
  unit = ["PLTD Kotamobagu #1", "PLTD Kotamobagu #2", "PLTD Kotamobagu #3", "PLTD Kotamobagu #4", "PLTD Kotamobagu #5", "PLTD Kotamobagu #6"];
  for (let j = 0; j < unit.length; j++) {
    getBul1 = await Kinerja.find({ $and: [{ tahunData: year }, { namaUnit: unit[j] }] });
    produksi = [];
    for (let i = 0; i < getBul1.length; i++) {
      produksi.push(getBul1[i].produksi);
    }
    arrunit.push(rumusSUM(produksi));
  }

  return arrunit;
  // console.log(produksi);
}

module.exports = { getKumEAF, getKumEFOR, getKumSOF, getKumPS, getKumSFC, getKumProd };
