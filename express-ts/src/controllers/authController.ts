import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { wizardQueries, customerQueries } from "../db/queries";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username, name, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, password, and role are required" });
    }

    if (role !== "wizard" && role !== "customer") {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check if user already exists
    let existingUser = null;
    try {
      if (role === "wizard") {
        existingUser = await wizardQueries.findByEmail(email);
      } else {
        existingUser = await customerQueries.findByEmail(email);
      }
    } catch (err) {
      // User not found - this is good, we can proceed
      existingUser = null;
    }

    if (existingUser) {
      return res.status(400).json({ message: `${role} with this email already exists` });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = role === "wizard"
      ? await wizardQueries.create({
          email,
          password: hashedPassword,
          username: username,
          name: name || "Unnamed Wizard",
          role,
        })
      : await customerQueries.create({
          email,
          password: hashedPassword,
          username: username,
          name: name || "Unnamed Customer",
          role,
        });

    // Remove password from response
    const { password: _, ...safeUser } = newUser;

    return res.status(201).json({ message: "Registration successful", user: safeUser });

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

    let user: any = null;
    let role = "wizard";

    // Try to find wizard first
    try {
      user = await wizardQueries.findByEmail(email);
      role = "wizard";
    } catch (err) {
      // Not a wizard, try customer
      try {
        user = await customerQueries.findByEmail(email);
        role = "customer";
      } catch (err) {
        // User not found
        user = null;
      }
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Return safe user data (without password)
    const safeUser = {
      id: role === "wizard" ? user.WizardID : user.CustomerID,
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