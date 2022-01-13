const express = require("express");
const router = express.Router();
const Kinerja = require("../model/kinerjaSchema");
const Mesin = require("../model/dataMesin");
const xlsx = require("xlsx");
const upload = require("../config/upload");
// const rumusEAF = require("../formula");
const { getEAF, getEFOR, getSOF, getPS, getSFC } = require("../public/js/kinerjaKTM");
const { getEAFY, getEFORY, getSOFY, getPSY, getSFCY } = require("../public/js/kinerjaKTMYear");
const { getKumEAF, getKumEFOR, getKumSOF, getKumPS, getKumSFC } = require("../public/js/kinerjaKumKTM");
const { getKumEAFY, getKumEFORY, getKumSOFY, getKumPSY, getKumSFCY } = require("../public/js/kinerjaKumKTMY");

// Menampilkan Data di Halaman Kinerja
router.get("/", async (req, res) => {
  const kinUnit = await Kinerja.find({ $and: [{ tahunData: 2021 }, { bulanData: 12 }] });
  const EAFU = [];
  const EFORU = [];
  const SOFU = [];
  const PSU = [];
  const SFCU = [];
  for (i = 0; i < 6; i++) {
    EAFU.push(kinUnit[i].eaf);
    EFORU.push(kinUnit[i].efor);
    SOFU.push(kinUnit[i].sof);
    // PSU.push(kinUnit[i].ps);
    // SFCU.push(kinUnit[i].sfc);
  }
  res.render("pages/index", {
    EAFU: JSON.stringify(EAFU),
    EFORU: JSON.stringify(EFORU),
    SOFU: JSON.stringify(SOFU),
    // PSU: JSON.stringify(PSU),
    // SFCU: JSON.stringify(SFCU),
  });
});
// router.get("/", async (req, res) => {
//   try {
//     const getKinerja = await Kinerja.find();
//     // console.log(getKinerja);
//     res.render("pages/index", {
//     });
//   } catch (err) {
//     res.json({ massage: err });
//   }
// });

// Menampilkan Form Input Data
router.get("/input", (req, res) => {
  res.render("pages/input");
});
// router.get("/input", async (req, res) => {
//   try {
//     const getMesin = await Mesin.find();
//     res.render("pages/input", {
//       getMesin: getMesin,
//     });
//   } catch (err) {
//     res.json({ massage: err });
//   }
// });

// Menampilkan Pages Data Mesin
router.get("/dataMesin", async (req, res) => {
  getDataMesin = await Mesin.find({});
  res.render("pages/dataMesin", {
    dataMesin: getDataMesin,
  });
});

// Menampilkan Pages Layout
router.get("/layout", (req, res) => {
  res.render("pages/layout");
});

// Menampilkan Pages Kinerja
// router.get("/kinerja", (req, res) => {
//   res.render("pages/kinerja");
// });

// Menampilkan Chart Kinerja
// router.get("/kinerja", (req, res) => {
//   // const periodeData = req.query.periodeData;
//   if (req.query.periodeData) {
//     Kinerja.find({}, (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(data);
//         res.render("pages/kinerja");
//       }
//     });
//   } else {
//     Kinerja.find({}, (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         // console.log(data);
//         res.render("pages/kinerja");
//       }
//     });
//   }
// });

router.get("/kinerja", async (req, res) => {
  if (req.query.tahunData) {
    const EAFY = await getEAFY(req);
    const EFORY = await getEFORY(req);
    const SOFY = await getSOFY(req);
    const PSY = await getPSY(req);
    const SFCY = await getSFCY(req);
    const EAFKumY = await getKumEAFY(req);
    const EFORKumY = await getKumEFORY(req);
    const SOFKumY = await getKumSOFY(req);
    const PSKumY = await getKumPSY(req);
    const SFCKumY = await getKumSFCY(req);
    // console.log(EAF);
    res.render("pages/kinerja", {
      EAF: JSON.stringify(EAFY),
      EFOR: JSON.stringify(EFORY),
      SOF: JSON.stringify(SOFY),
      PS: JSON.stringify(PSY),
      SFC: JSON.stringify(SFCY),
      EAFKum: JSON.stringify(EAFKumY),
      EFORKum: JSON.stringify(EFORKumY),
      SOFKum: JSON.stringify(SOFKumY),
      PSKum: JSON.stringify(PSKumY),
      SFCKum: JSON.stringify(SFCKumY),
    });
  } else {
    const EAF = await getEAF();
    const EFOR = await getEFOR();
    const SOF = await getSOF();
    const PS = await getPS();
    const SFC = await getSFC();
    const EAFKum = await getKumEAF();
    const EFORKum = await getKumEFOR();
    const SOFKum = await getKumSOF();
    const PSKum = await getKumPS();
    const SFCKum = await getKumSFC();
    // console.log(PS);
    res.render("pages/kinerja", {
      EAF: JSON.stringify(EAF),
      EFOR: JSON.stringify(EFOR),
      SOF: JSON.stringify(SOF),
      PS: JSON.stringify(PS),
      SFC: JSON.stringify(SFC),
      EAFKum: JSON.stringify(EAFKum),
      EFORKum: JSON.stringify(EFORKum),
      SOFKum: JSON.stringify(SOFKum),
      PSKum: JSON.stringify(PSKum),
      SFCKum: JSON.stringify(SFCKum),
    });
  }
});

// Menampilkan File Upload Excel
router.get("/uploadxlsx", (req, res) => {
  res.render("pages/uploadxlsx");
});

// Upload File Excel ke Database
router.post("/", upload.single("excel"), (req, res) => {
  const workbook = xlsx.readFile(req.file.path);
  const sheet_namelist = workbook.SheetNames;
  let x = 0;
  sheet_namelist.forEach((element) => {
    const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
    Kinerja.insertMany(xlData, (err, data) => {
      if (err) {
        res.json({ massage: err });
      } else {
        console.log(req.file);
      }
    });
    x++;
  });
  res.redirect("/kinerja");
});

// Mengirim Hasil Inpuit ke Database
router.post("/", async (req, res) => {
  const sendKinerja = await Kinerja.insertMany(req.body);
  res.redirect("/kinerja");
});

// // Menampilkan Form Edit Data
// router.get("/kinerja/edit/:_id", async (req, res) => {
//   const editKinerja = await Kinerja.findOne({ _id: req.params._id });
//   res.render("kinerja/edit", {
//     editKinerja: editKinerja,
//   });
// });

// // Edit Data di Database
// router.put("/kinerja", async (req, res) => {
//   updateKinerja = await Kinerja.replaceOne(
//     { _id: req.body._id },
//     {
//       unit: req.body.unit,
//       produksi: req.body.produksi,
//       ps: req.body.ps,
//       pemakaianBB: req.body.pemakaianBB,
//       nilaiKalor: req.body.nilaiKalor,
//     }
//   );
//   res.redirect("/kinerja");
// });

// // Menghapus Data di Database
// router.delete("/kinerja", async (req, res) => {
//   const deleteKinerja = await Kinerja.deleteOne({ _id: req.body._id });
//   res.redirect("/kinerja");
// });

module.exports = router;
