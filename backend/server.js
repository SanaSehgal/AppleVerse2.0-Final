import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import bcrypt from "bcrypt";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { handleSignupRequest } from "./signupHandler.js";
import {
  Admin,
  listPendingRequests,
  listActiveAdmins,
  listRejectedRequests,
  approveRequest,
  rejectRequest,
  revokeAccess,
  reinstateRequest,
} from "./adminHandler.js";

dotenv.config();

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Express setup
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/appleverse", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB (appleverse)"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Multer setup for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "images")),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// ----------------------
// Routes
// ----------------------

// Root
app.get("/", (req, res) => res.send("🍎 Appleverse API is running!"));

// Signup
app.post("/signup-request", handleSignupRequest);

// Admin login
app.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ token: "fake-jwt-token", message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

// Admin actions (example routes)
app.get("/admins/pending", listPendingRequests);
app.get("/admins/active", listActiveAdmins);
app.get("/admins/rejected", listRejectedRequests);

app.post("/admins/approve", approveRequest);
app.post("/admins/reject", rejectRequest);
app.post("/admins/revoke", revokeAccess);
app.post("/admins/reinstate", reinstateRequest);

// Serve images
app.use("/images", express.static(path.join(__dirname, "images")));

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
