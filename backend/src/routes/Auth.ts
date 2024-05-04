// These routes will only be necessary for officers to login to post new events

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import Admin from "../database/Models/Admin";

import { Router } from "express";
import auth from "../middleware/auth";

const router = Router();

// Normal login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const adminUser = await Admin.findOne({
    username,
  });
  if (!adminUser)
    return res.json({ message: `No admin by user: ${username} found` }).status(500);


  const compareResult = bcrypt.compareSync(password, adminUser.password!);

  if (!compareResult)
    return res.json({ message: "Password is incorrect." }).status(403);

  const token = jwt.sign({ username, admin: true }, process.env.JWT_SECRET!
    // expiresIn: process.env.JWT_EXPIRES_IN,
  );

  res.json({
    accessToken: token,
    username,
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN!) * 1000 * 60 * 60 * 24,
  })
  return res.status(200);


});

// // Normal logout route
// realized jwt doesnt work like that lol forgor
// route.post("/logout", async (req, res) => {

// });

// Update password/username for admin account, requires being logged in already, AND
// verification of user/password
router.patch("/admin", auth, async (req, res) => {
  // Auth middleware handles auth status (being logged in AND providing credentials)

  const { username, newUsername, newPassword }: { username: string, newUsername: string | null; newPassword: string } = req.body;
  // const admin = await Admin.findOne({ username });
  try {
    const saltRounds = 10;
    // const salt = bcrypt.genSaltSync(saltRounds);
    const newHash = bcrypt.hashSync(newPassword, saltRounds);

    if (newUsername !== null)
      await Admin.findOneAndUpdate({ username }, { username: newUsername, password: newHash });
    else
      await Admin.findOneAndUpdate({ username }, { password: newHash });


    res.status(200);
    return res.json({ message: "OK" });
  } catch (err) {
    res.status(500);
    res.json({ message: err });
  }

});

// used in conjunction with registering an admin user/pass
// if an admin already exists, a new once can't be made
router.get("/admin", async (req, res) => {

  const admins = await Admin.find();
  if (admins.length == 0) {
    res.json({ message: "OK" });
    return res.status(200);
  } else {
    res.json({ message: "Admin already exists" });
    return res.status(403);
  }

});

// Mostly for setup, registers an admin account for use
router.post("/admin", async (req, res) => {
  // In the actual frontend, a request will be sent to /admin before this route is posted to

  const { username, password } = req.body;
  const saltRounds = 10;
  // const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, saltRounds);
  try {
    const admin = await Admin.create({
      username,
      password: hash,
    });

    await admin.save();


    const token = jwt.sign({ username, admin: true }, process.env.JWT_SECRET!
      // expiresIn: parseInt(process.env.JWT_EXPIRES_IN!) * 60 * 60 * 24,
    );

    res.json({
      accessToken: token,
      username,
      expiresIn: parseInt(process.env.JWT_EXPIRES_IN!) * 1000 * 60 * 60 * 24
    })
    return res.status(200);


  } catch (err) {
    res.json({ message: err, err: true });
    return res.status(500);
  }
});

export {
  router as Auth,
};