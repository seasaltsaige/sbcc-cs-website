// These routes will only be necessary for officers to login to post new events

import jwt from "jsonwebtoken";
import passport from "passport";

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
route.patch("/editadmin", async (req, res) => {

});

// used in conjunction with registering an admin user/pass
// if an admin already exists, a new once can't be made
route.get("/admin", async (req, res) => {

});

// Mostly for setup, registers an admin account for use
route.post("/registeradmin", async (req, res) => {

});

export {
  route as Auth,
};