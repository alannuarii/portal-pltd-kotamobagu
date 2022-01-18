const express = require("express");
const router = express.Router();
const Kinerja = require("../model/kinerjaSchema");
const Mesin = require("../model/dataMesin");
const xlsx = require("xlsx");
const upload = require("../config/upload");
const crypto = require("crypto");
const User = require("../model/user");
const { cookie } = require("express/lib/response");
const { getEAF, getEFOR, getSOF, getPS, getSFC } = require("../public/js/kinerjaKTM");
const { getEAFY, getEFORY, getSOFY, getPSY, getSFCY } = require("../public/js/kinerjaKTMYear");
const { getKumEAF, getKumEFOR, getKumSOF, getKumPS, getKumSFC } = require("../public/js/kinerjaKumKTM");
const { getKumEAFY, getKumEFORY, getKumSOFY, getKumPSY, getKumSFCY } = require("../public/js/kinerjaKumKTMY");

// Menampilkan Pages Registrasi
router.get("/login", (req, res) => {
  res.render("pages/login");
});

// Menampilkan Pages Registrasi
router.get("/register", (req, res) => {
  res.render("pages/register");
});

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

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

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString("hex");
};

// This will hold the users and authToken related to users
const authTokens = {};

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

router.use((req, res, next) => {
  // Get auth token from the cookies
  const authToken = req.cookies["AuthToken"];

  // Inject the user to the request
  req.user = authTokens[authToken];

  next();
});

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
    user,
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
router.get("/input", requireAuth, (req, res) => {
  const user = req.user;
  res.render("pages/input", {
    user,
  });
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
router.get("/dataMesin", requireAuth, async (req, res) => {
  const user = req.user;
  getDataMesin = await Mesin.find({});
  res.render("pages/dataMesin", {
    dataMesin: getDataMesin,
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

// Menampilkan File Upload Excel
router.get("/uploadxlsx", requireAuth, (req, res) => {
  const user = req.user;
  res.render("pages/uploadxlsx", {
    user,
  });
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
// router.post("/", async (req, res) => {
//   const sendKinerja = await Kinerja.insertMany(req.body);
//   res.redirect("/kinerja");
// });

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
