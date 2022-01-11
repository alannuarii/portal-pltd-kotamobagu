const EAFTotal = [];

angka = [223200, 223200, 483123, 0, 1264800, 1255563];
nomor = [223200, 223200, 483600, 0, 1264800, 1264800];

const rumusEAF = (ap, aq) => {
  const sumap = ap.reduce((accumulator, curr) => accumulator + curr);
  const sumaq = aq.reduce((accumulator, curr) => accumulator + curr);
  return (sumap / sumaq) * 100;
};

const rumusEFOR = function (as, at) {
  const sumas = as.reduce((accumulator, curr) => accumulator + curr);
  const sumat = at.reduce((accumulator, curr) => accumulator + curr);
  return (sumas / sumat) * 100;
};

const rumusSOF = function (au, aq) {
  const sumau = au.reduce((accumulator, curr) => accumulator + curr);
  const sumaq = aq.reduce((accumulator, curr) => accumulator + curr);
  return (sumau / sumaq) * 100;
};

const rumusPS = function (m, j) {
  const summ = m.reduce((accumulator, curr) => accumulator + curr);
  const sumj = j.reduce((accumulator, curr) => accumulator + curr);
  return (summ / sumj) * 100;
};

const rumusSFC = function (n, j) {
  const sumn = n.reduce((accumulator, curr) => accumulator + curr);
  const sumj = j.reduce((accumulator, curr) => accumulator + curr);
  return sumn / sumj;
};

module.exports = { rumusEAF, rumusEFOR, rumusSOF, rumusPS, rumusSFC };
