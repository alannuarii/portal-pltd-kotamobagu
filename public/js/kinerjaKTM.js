require("../../config/db");
const Kinerja = require("../../model/kinerjaSchema");
const { rumusEAF, rumusEFOR, rumusSOF, rumusPS, rumusSFC } = require("./formula");

async function getEAF() {
  const arrEAF = [];
  for (j = 1; j < 13; j++) {
    getBul1 = await Kinerja.find({ bulanData: j });
    dmahder = [];
    dmph = [];
    for (let i = 0; i < getBul1.length; i++) {
      dmahder.push(getBul1[i].dmahder);
      dmph.push(getBul1[i].dmph);
    }
    arrEAF.push(rumusEAF(dmahder, dmph));
  }
  return arrEAF;
  //   console.log(newArr);
}

async function getEFOR() {
  const arrEFOR = [];
  for (j = 1; j < 13; j++) {
    getBul1 = await Kinerja.find({ bulanData: j });
    dmfoud = [];
    dmfoshdrsh = [];
    for (let i = 0; i < getBul1.length; i++) {
      dmfoud.push(getBul1[i].dmfoud);
      dmfoshdrsh.push(getBul1[i].dmfoshdrsh);
    }
    arrEFOR.push(rumusEFOR(dmfoud, dmfoshdrsh));
  }
  return arrEFOR;
  // console.log(newArr);
}

async function getSOF() {
  const arrSOF = [];
  for (j = 1; j < 13; j++) {
    getBul1 = await Kinerja.find({ bulanData: j });
    dmhar = [];
    dmph = [];
    for (let i = 0; i < getBul1.length; i++) {
      dmhar.push(getBul1[i].dmhar);
      dmph.push(getBul1[i].dmph);
    }
    arrSOF.push(rumusSOF(dmhar, dmph));
  }
  return arrSOF;
  // console.log(newArr);
}

async function getPS() {
  const arrPS = [];
  for (j = 1; j < 13; j++) {
    getBul1 = await Kinerja.find({ bulanData: j });
    psTotal = [];
    produksi = [];
    for (let i = 0; i < getBul1.length; i++) {
      psTotal.push(getBul1[i].psTotal);
      produksi.push(getBul1[i].produksi);
    }
    arrPS.push(rumusPS(psTotal, produksi));
  }
  return arrPS;
  // console.log(newArr);
}

async function getSFC() {
  const arrSFC = [];
  for (j = 1; j < 13; j++) {
    getBul1 = await Kinerja.find({ bulanData: j });
    pemakaianBBM = [];
    produksi = [];
    for (let i = 0; i < getBul1.length; i++) {
      pemakaianBBM.push(getBul1[i].pemakaianBBM);
      produksi.push(getBul1[i].produksi);
    }
    arrSFC.push(rumusSFC(pemakaianBBM, produksi));
  }
  return arrSFC;
  // console.log(newArr);
}

module.exports = { getEAF, getEFOR, getSOF, getPS, getSFC };
