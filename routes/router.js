const express = require("express");
const router = express.Router();
const Kinerja = require("../model/kinerjaSchema");
const Mesin = require("../model/dataMesin");
const xlsx = require("xlsx");
const upload = require("../config/upload");
const crypto = require("crypto");
const qr = require("qrcode");
const User = require("../model/user");
const Fuel = require("../model/bahanBakar");
const Pers = require("../model/persMat");
const MatInOut = require("../model/matInOut");
const { cookie, append } = require("express/lib/response");
const { getEAF, getEFOR, getSOF, getPS, getSFC } = require("../public/js/kinerjaKTM");
const { getEAFY, getEFORY, getSOFY, getPSY, getSFCY } = require("../public/js/kinerjaKTMYear");
const { getKumEAF, getKumEFOR, getKumSOF, getKumPS, getKumSFC, getKumProd } = require("../public/js/kinerjaKumKTM");
const { getKumEAFY, getKumEFORY, getKumSOFY, getKumPSY, getKumSFCY } = require("../public/js/kinerjaKumKTMY");

// Menampilkan Pages Registrasi
router.get("/login", (req, res) => {
  res.render("pages/login");
});

// Menampilkan Pages Registrasi
router.get("/register", (req, res) => {
  res.render("pages/register");
});

// Function Hash Password
const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

// Proses Registrasi
router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Check if the password and confirm password fields match
  if (password === confirmPassword) {
    // Check if user with the same email is also registered
    if (await User.findOne({ email: email })) {
      res.render("pages/register", {
        message: "User already registered.",
        messageClass: "alert-danger",
      });

      return;
    }

    const hashedPassword = getHashedPassword(password);

    // Store user into the database if you are using one
    await User.insertMany({
      name: name,
      email: email,
      password: hashedPassword,
    });

    res.render("pages/login", {
      message: "Registration Complete. Please login to continue.",
      messageClass: "alert-success",
    });
  } else {
    res.render("pages/register", {
      message: "Password does not match.",
      messageClass: "alert-danger",
    });
  }
});

// Function Generate Auth Token
const generateAuthToken = () => {
  return crypto.randomBytes(30).toString("hex");
};

// This will hold the users and authToken related to users
const authTokens = {};

// Proses Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = getHashedPassword(password);

  const user = await User.findOne({ $and: [{ email: email }, { password: hashedPassword }] });
  // console.log(user);

  if (user) {
    const authToken = generateAuthToken();

    // Store authentication token
    authTokens[authToken] = user;

    // Setting the auth token in cookies
    res.cookie("AuthToken", authToken);

    // Redirect user to the protected page
    res.redirect("/");
  } else {
    res.render("pages/login", {
      message: "Invalid username or password",
      messageClass: "alert-danger",
    });
  }
});

// Middleware Pengecekan Cookie
router.use((req, res, next) => {
  // Get auth token from the cookies
  const authToken = req.cookies["AuthToken"];

  // Inject the user to the request
  req.user = authTokens[authToken];

  next();
});

// Proses Otentikasi
const requireAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.render("pages/login", {
      message: "Please login to continue",
      messageClass: "alert-danger",
    });
  }
};

// Fitur Log Out
router.get("/logout", (req, res) => {
  res.clearCookie("AuthToken");
  res.redirect("/login");
});

// Menampilkan Data di Halaman Kinerja
router.get("/", requireAuth, async (req, res) => {
  const user = req.user;
  const prod = await getKumProd();
  const fuel = await Fuel.findOne({});
  // console.log(fuel);
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
    PSU.push(kinUnit[i].ps);
    SFCU.push(kinUnit[i].sfcBruto);
  }
  res.render("pages/index", {
    EAFU: JSON.stringify(EAFU),
    EFORU: JSON.stringify(EFORU),
    SOFU: JSON.stringify(SOFU),
    PSU: JSON.stringify(PSU),
    SFCU: JSON.stringify(SFCU),
    Prod: JSON.stringify(prod),
    produksi: prod,
    fuel,
    user,
  });
});

router.post("/", (req, res) => {
  Fuel.replaceOne(
    {
      idFuel: req.body.idFuel,
    },
    {
      pemakaian: req.body.pemakaian,
      penambahan: req.body.penambahan,
    }
  ).then((result) => {
    res.redirect("/");
  });
});

// Menampilkan Form Input Data
router.get("/input", requireAuth, (req, res) => {
  const user = req.user;
  res.render("pages/input", {
    user,
  });
});

// Menampilkan Tabel Detail Data
router.get("/detail", requireAuth, async (req, res) => {
  const user = req.user;
  if (req.query.bulanData && req.query.tahunData) {
    const detail = await Kinerja.find({ $and: [{ tahunData: req.query.tahunData }, { bulanData: req.query.bulanData }] });
    res.render("pages/detail", {
      user,
      detail,
    });
  } else {
    const detail = await Kinerja.find({ $and: [{ tahunData: 2021 }, { bulanData: 12 }] });
    res.render("pages/detail", {
      user,
      detail,
    });
  }
});

// Menampilkan Pages Data Mesin
router.get("/data-mesin", requireAuth, async (req, res) => {
  const user = req.user;
  getDataMesin = await Mesin.find({});
  res.render("pages/data-mesin", {
    dataMesin: getDataMesin,
    user,
  });
});

// Menampilkan Pages Company Profile
router.get("/company-profile", requireAuth, (req, res) => {
  const user = req.user;
  res.render("pages/company-profile", {
    user,
  });
});

// Menampilkan Pages Safety Induction
router.get("/safety-induction", requireAuth, (req, res) => {
  const user = req.user;
  res.render("pages/safety-induction", {
    user,
  });
});

// Page Proper
router.get("/proper", requireAuth, (req, res) => {
  const user = req.user;
  res.render("pages/proper", {
    user,
  });
});

// Menampilkan Pages Layout
router.get("/struktur-organisasi", requireAuth, (req, res) => {
  const user = req.user;
  res.render("pages/struktur-organisasi", {
    user,
  });
});

// Menampilkan Pages Layout
router.get("/layout", requireAuth, (req, res) => {
  const user = req.user;
  res.render("pages/layout", {
    user,
  });
});

router.get("/kinerja", requireAuth, async (req, res) => {
  const user = req.user;
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
      user,
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
      user,
    });
  }
});

// Menampilkan File Upload Excel Kinerja
router.get("/upload-kinerja", requireAuth, (req, res) => {
  const user = req.user;
  res.render("pages/upload-kinerja", {
    user,
  });
});

// Upload File Excel Kinerja ke Database
router.post("/upload-kinerja", upload.single("kinerja"), (req, res) => {
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
router.post("/input", (req, res) => {
  Kinerja.insertMany(req.body).then((result) => {
    console.log(result);
    res.redirect("/kinerja");
  });
});

// Page Tata Kelola Gudang
router.get("/inventory", requireAuth, async (req, res) => {
  const length = (await Pers.find({ stock: { $gt: 0 } })).length;

  // Menghitung Total Persediaan
  arrTot = [];
  const pers = await Pers.find({});
  for (let i = 0; i < pers.length; i++) {
    arrTot.push(pers[i].totHarga);
  }
  const totPers = arrTot.reduce((a, b) => a + b);

  const user = req.user;
  res.render("pages/inventory", {
    user,
    length,
    totPers,
  });
});

// Menampilkan File Upload Excel Persediaan
// router.get("/upload-persediaan", requireAuth, (req, res) => {
//   const user = req.user;
//   res.render("pages/upload-persediaan", {
//     user,
//   });
// });

// Upload File Excel Persediaan ke Database
router.post("/inventory", upload.single("pers"), (req, res) => {
  const workbook = xlsx.readFile(req.file.path);
  const sheet_namelist = workbook.SheetNames;
  let x = 0;
  sheet_namelist.forEach((element) => {
    const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
    Pers.insertMany(xlData, (err, data) => {
      if (err) {
        res.json({ massage: err });
      } else {
        console.log(req.file);
      }
    });
    x++;
  });
  res.redirect("/");
});

// Menampilkan Detail Material Persediaan
router.get("/detail-persediaan", requireAuth, async (req, res) => {
  const user = req.user;

  // Menghitung Total Persediaan
  arrTot = [];
  const pers = await Pers.find({});
  for (let i = 0; i < pers.length; i++) {
    arrTot.push(pers[i].totHarga);
  }
  const totPers = arrTot.reduce((a, b) => a + b);

  const mat = await Pers.find({ stock: { $gt: 0 } });
  res.render("pages/detail-persediaan", {
    user,
    mat,
    totPers,
  });
});

router.post("/detail-persediaan", async (req, res) => {
  try {
    if (req.body.matIn > 0) {
      const Masuk = await Promise.all([
        Pers.replaceOne(
          {
            noMat: req.body.noMat,
          },
          {
            stock: parseInt(req.body.stock) + parseInt(req.body.matIn),
            noMat: req.body.noMat,
            satuan: req.body.satuan,
            descMat: req.body.descMat,
            hargaSat: req.body.hargaSat,
          }
        ),
        MatInOut.insertMany(req.body),
      ]);
    } else if (req.body.matOut > 0) {
      const Keluar = await Promise.all([
        Pers.replaceOne(
          {
            noMat: req.body.noMat,
          },
          {
            stock: parseInt(req.body.stock) - parseInt(req.body.matOut),
            noMat: req.body.noMat,
            satuan: req.body.satuan,
            descMat: req.body.descMat,
            hargaSat: req.body.hargaSat,
          }
        ),
        MatInOut.insertMany(req.body),
      ]);
    }
    res.redirect("/inventory");
  } catch (error) {
    console.log(error);
  }
});
// Proses Tambah dan Kurang Material
// router.post("/detail-persediaan", (req, res) => {
//   if (req.body.matIn > 0) {
//     Pers.replaceOne(
//       {
//         noMat: req.body.noMat,
//       },
//       {
//         stock: parseInt(req.body.stock) + parseInt(req.body.matIn),
//         noMat: req.body.noMat,
//         satuan: req.body.satuan,
//         descMat: req.body.descMat,
//         hargaSat: req.body.hargaSat,
//       }
//     ).then((result) => {
//       console.log(result);
//       res.redirect("/inventory");
//     });
//   } else if (req.body.matOut > 0) {
//     Pers.replaceOne(
//       {
//         noMat: req.body.noMat,
//       },
//       {
//         stock: parseInt(req.body.stock) - parseInt(req.body.matOut),
//         noMat: req.body.noMat,
//         satuan: req.body.satuan,
//         descMat: req.body.descMat,
//         hargaSat: req.body.hargaSat,
//       }
//     ).then((result) => {
//       console.log(result);
//       res.redirect("/inventory");
//     });
//   }
// });

// Page Material Masuk
router.get("/material-masuk", requireAuth, async (req, res) => {
  const user = req.user;
  const materialIn = await MatInOut.find({ matIn: { $exists: true } });
  // console.log(materialIn);
  res.render("pages/material-masuk", {
    user,
    materialIn,
  });
});

// Page Material Keluar
router.get("/material-keluar", requireAuth, async (req, res) => {
  const user = req.user;
  const materialOut = await MatInOut.find({ matOut: { $exists: true } });
  // console.log(materialOut);
  res.render("pages/material-keluar", {
    user,
    materialOut,
  });
});

// Menampilkan Hasil Generate QR Code
router.get("/qr-generator", requireAuth, async (req, res) => {
  const user = req.user;
  res.render("pages/qr-generator", {
    user,
  });
});

// Proses Pembuatan QR Code
router.post("/qr-code", requireAuth, (req, res) => {
  const user = req.user;
  const url = req.body.url;

  // If the input is null return "Empty Data" error
  if (url.length === 0) res.send("Empty Data!");

  // Let us convert the input stored in the url and return it as a representation of the QR Code image contained in the Data URI(Uniform Resource Identifier)
  // It shall be returned as a png image format
  // In case of an error, it will save the error inside the "err" variable and display it

  qr.toDataURL(url, (err, src) => {
    if (err) res.send("Error occured");

    // Let us return the QR code image as our response and set it to be the source used in the webpage
    res.render("pages/qr-code", {
      user,
      src,
    });
  });
});

// Menangkap semua route yang dimasukkan
// Dipasang paling akhir agar tidak memblock raute yang telah ditentukan
router.use("/", (req, res) => {
  res.status(404);
  res.render("pages/error404");
});

module.exports = router;
