import multer from "multer";

export const eventStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../localStorage/events");
  },
  filename: (req, file, cb) => {
    // Not sure yet
  }
});

export const officerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../localStorage/officers");
  },
  filename: (req, file, cb) => {
    // Not sure yet
  }
});