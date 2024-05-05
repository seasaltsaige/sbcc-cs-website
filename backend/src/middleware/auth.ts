import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../database/Models/Admin";
// Explicitly used as a middleware for the update admin route
export async function strictAuth(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;
  const auth = req.headers.authorization?.split(" ")!;

  const bearer = auth[0];
  const token = auth[1];

  if (bearer !== "Bearer") {
    res.status(401);
    return res.json({ message: "Not Bearer" });
  }

  const userToken = jwt.verify(token, process.env.JWT_SECRET!);
  if (!userToken) {
    res.status(401);
    return res.json({ message: "Not Authenticated" });
  }

  // Should exist at this point since a jwt cant be made without this existing.
  // Just in case though
  const adminUser = await Admin.findOne({ username });
  if (!adminUser) {
    res.status(500);
    return res.json({ message: "Admin user does not exist" });
  }

  const compareResult = bcrypt.compareSync(password, adminUser.password!);
  if (!compareResult) {
    res.status(401);
    return res.json({ message: "Incorrect credentials" });
  }

  next(null);
}

// jwt auth without providing login credentials
export async function minAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization?.split(" ")!;

  const bearer = auth[0];
  const token = auth[1];

  if (bearer !== "Bearer") {
    res.status(401);
    return res.json({ message: "Not Bearer" });
  }

  const userToken = jwt.verify(token, process.env.JWT_SECRET!);
  if (!userToken) {
    res.status(401);
    return res.json({ message: "Not Authenticated" });
  }

  next(null);
}