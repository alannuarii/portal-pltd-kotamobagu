const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "kinerja") {
      cb(null, "./public/uploads/kinerja");
    } else if (file.fieldname === "pers") {
      cb(null, "./public/uploads/persediaan");
    } else if (file.fieldname === "image") {
      cb(null, "./public/uploads/image-material");
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "kinerja") {
      cb(null, file.originalname);
    } else if (file.fieldname === "pers") {
      cb(null, file.originalname);
    } else if (file.fieldname === "image") {
      const awalNama = Math.round(Math.random() * 1e9);
      cb(null, awalNama + "-" + file.originalname);
    }
  },
});

const upload = multer({ storage: storage }).fields([
  {
    name: "kinerja",
    maxCount: 1,
  },
  {
    name: "pers",
    maxCount: 1,
  },
  {
    name: "image",
    maxCount: 1,
  },
]);

// // Konfigurasi Multer
// const fotoMat = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/img/pers-mat");
//   },
//   filename: function (req, file, cb) {
//     const awalNama = Math.round(Math.random() * 1e9);
//     cb(null, awalNama + "-" + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const matImg = multer({ storage: fotoMat }).single("image");
// const upload = multer({ storage: storage });

module.exports = upload;

// var fotoMat = multer({ storage: fotoMat, fileFilter: fileFilter }).single("image");
