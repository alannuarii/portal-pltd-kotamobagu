require("../../config/db");
const Pers = require("../../model/persMat");

const rumusSUM = function (as) {
  return as.reduce((accumulator, curr) => accumulator + curr);
};

async function totalPers() {
  const arrTot = [];
  const pers = await Pers.find({});
  for (let i = 0; i < pers.length; i++) {
    arrTot.push(pers[i].totHarga);
  }
  // const totPers = rumusSUM(arrTot);
  return pers;
}

// totalPers();
console.log(totalPers());
// module.exports = {  };
