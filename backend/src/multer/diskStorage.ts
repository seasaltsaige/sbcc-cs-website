import multer from "multer";

export const eventStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/events");
  },
  filename: (req, file, cb) => {
    // Not sure yet
    // NOT finalized as i dont think event will have "name", but maybe rather, "title"
    cb(null, `event-${req.body.name.toLowerCase().split(" ").join("")}-${Date.now()}-${Math.round(Math.random() * 1E9)}.${file.mimetype.split("/")[1]}`);
  }
});

export const officerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/officers");
  },
  filename: (req, file, cb) => {
    // Officer ----- Officer Name ----                           --- Curr Time ----- Random ending  ---------------------   file type
    cb(null, `officer-${req.body.name.toLowerCase().split(" ").join("")}-${Date.now()}-${Math.round(Math.random() * 1E9)}.${file.mimetype.split("/")[1]}`);
  }
});

export const candiateStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/candidates");
  },
  filename: (req, file, cb) => {
    cb(null, `candidate-${req.body.name.toLowerCase().split(" ").join("")}-${Date.now()}-${Math.round(Math.random() * 1E9)}.${file.mimetype.split("/")[1]}`);
  }
})