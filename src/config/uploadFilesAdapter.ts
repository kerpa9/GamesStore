import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage });

//Configure type date send multer
// const upload = multer({
//   storage,
//   fileFilter: (request, file, cb) => {
//     if (file.mimetype == "image/jpg") {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error("Only .png format allowed!"));
//     }
//   },
// });

export const uploadSingle = (filename: string) => upload.single(filename);

export const uploadArray = (filename: string, maxData: number) =>
  upload.array(filename, maxData);
