import jwt from "jsonwebtoken";
// import fs from "fs";
// import path from "path";
import { Router } from "express";
import { minAuth } from "../middleware/auth";
import Officer from "../database/Models/Officer";
import multer from "multer";
import { officerStorage } from "../multer/diskStorage";

const officerUpload = multer({ storage: officerStorage });

const router = Router();

router.get("/all", async (req, res) => {
  let auth = false;
  if (req.headers["authorization"] && req.headers["authorization"].includes("Bearer")) {
    const token = jwt.verify(req.headers["authorization"].split(" ")[1], process.env.JWT_SECRET!)
    if (!token) auth = false;
    else auth = true;
  }


  const officerModels = await Officer.find();
  const officers = officerModels.map((v) => {
    return (
      {
        name: v.name,
        position: v.position,
        startDate: v.startDate,
        endDate: v.endDate,
        statement: v.statement,
        image: v.image === null,// ?
        // null
        // :

        // image: v.image === null ?
        //   null :
        //   (
        //     fs.existsSync(path.join(__dirname, "../../", v.image!))
        //       ? fs.readFileSync(path.join(__dirname, "../../", v.image!)).toString("base64")
        //       : null
        //   ), // will need to send image data, maybe base64? will need to look into it
        _id: auth ? v._id : null,
      }
    )
  });

  res.status(200);
  return res.json({
    officers,
  });

});


router.get("/current", async (req, res) => {

});

// Might not be needed
// router.get("/:name", (req, res) => {
//   const name = req.params.name;

//   res.status(200);
//   res.json({
//     message: name,
//   });



// Will also want file handling middleware to handle image upload
router.post("/create", minAuth, officerUpload.single("image"), async (req, res) => {
  const { name, startDate, endDate, statement, position } = req.body;
  if (!name || !startDate || !endDate || !statement || !position) {
    res.status(400);
    return res.json({
      message: "Malformed request body, did you provide 'name', 'startDate', 'endDate', 'statement', and 'position'?",
    });
  }

  const image = req.file;
  console.log(image);

  const officer = new Officer({
    name,
    startDate,
    statement,
    endDate: endDate,
    position: position,
    image: image !== undefined ? image.filename : null,
  });

  try {
    await officer.save();
    res.status(200);
    return res.json({ message: `Successfully created officer: ${name}` });
  } catch (err) {
    console.log(err);
    res.status(500);
    return res.json({ message: "Internal server error" });
  }

});

// Delete a specific officer
router.delete("/:_id", minAuth, async (req, res) => {
  const _id = req.params["_id"];
  if (!_id) {
    res.status(400);
    return res.json({ message: "Malformed parameter, no _id provided" });
  }
  try {
    await Officer.findOneAndDelete({ _id });

    res.status(200);
    return res.json({ message: "Successfully deleted officer" });
  } catch (err) {
    res.status(500);
    return res.json({ message: "Internal server error" });
  }

});

export {
  router as Officers,
};