// These routes will only be necessary for officers to login to post new events

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import Admin from "../database/Models/Admin";

import { Router } from "express";

const route = Router();

// Normal login route
route.post("/login", async (req, res) => {

});

// Normal logout route
route.post("/logout", async (req, res) => {

});

// Update password/username for admin account, requires being logged in already, AND
// verification of user/password
route.patch("/admin", async (req, res) => {

});

// used in conjunction with registering an admin user/pass
// if an admin already exists, a new once can't be made
route.get("/admin", async (req, res) => {

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
route.post("/admin", async (req, res) => {
  // In the actual frontend, a request will be sent to /admin before this route is posted to

  const { username, password } = req.body;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  try {
    const admin = await Admin.create({
      username,
      password: hash,
    });

    await admin.save();


    const token = jwt.sign({ username, admin: true }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

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
  route as Auth,
};