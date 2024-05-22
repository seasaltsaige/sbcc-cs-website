import multer from "multer";

export const pastEventStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/events/past");
  },
  filename: (req, file, cb) => {
    cb(null, `past-event-${req.body.name.toLowerCase().split(" ").join("")}-${Date.now()}-${Math.round(Math.random() * 1E9)}.${file.mimetype.split("/")[1]}`);
  }
});


export const upcomingEventStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/events/upcoming");
  },
  filename: (req, file, cb) => {
    console.log(req.body);
    cb(null, `upcoming-event-${Date.now()}-${Math.round(Math.random() * 1E9)}.${file.mimetype.split("/")[1]}`);
  }
})


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