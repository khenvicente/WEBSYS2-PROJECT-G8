import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Wizard, Customer } from "../models";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username, name, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, password, and role are required" });
    }

    const existingUser =
      role === "wizard"
        ? await Wizard.findOne({ where: { email } })
        : role === "customer"
        ? await Customer.findOne({ where: { email } })
        : null;

    if (!existingUser && role !== "wizard" && role !== "customer") {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (existingUser) {
      return res.status(400).json({ message: `${role} with this email already exists` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser =
      role === "wizard"
        ? await Wizard.create({
            email,
            password: hashedPassword,
            username: username,
            name: name || "Unnamed Wizard",
            role,
          })
        : await Customer.create({
            email,
            password: hashedPassword,
            username: username,
            name: name || "Unnamed Customer",
            role,
          });

    return res.status(201).json({ message: "Registration successful", user: newUser });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    let user: any = await Wizard.findOne({ where: { email } });
    let role = "wizard";

    if (!user) {
      user = await Customer.findOne({ where: { email } });
      role = "customer";
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      role,
    };

    return res.status(200).json({ message: "Login successful", user: safeUser });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
