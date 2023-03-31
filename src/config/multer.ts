import multer from "multer";

const storage = multer.diskStorage({
  destination: function (_, __, callback) {
    callback(null, "./src/uploads/");
  },
  filename: function (_, file, callback) {
    const time = new Date().getTime();
    callback(null, `${time}_${file.originalname}`);
  },
});

const fileFilter = (_, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  }
  cb(null, false);
};

const upload = multer({ storage, fileFilter });

export default upload;
