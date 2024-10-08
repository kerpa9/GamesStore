import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage });

export const uploadSingle = (filename: string) => upload.single(filename);

export const uploadArray = (filename: string, maxData: number) =>
  upload.array(filename, maxData);
