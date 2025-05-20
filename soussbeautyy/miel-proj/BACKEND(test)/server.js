// backend/server.js
import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 5000;
const SECRET_KEY = "super_secret_key";
const usersFile = path.join("backend", "users.json");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

function readUsers() {
  if (!fs.existsSync(usersFile)) return [];  // Vérifie si le fichier existe
  const data = fs.readFileSync(usersFile, "utf8");
  
  if (data.trim() === "") return [];  // Vérifie si le fichier est vide
  
  return JSON.parse(data);  // Parse le contenu du fichier JSON
}


function writeUsers(users) {
  if (!fs.existsSync(usersFile)) {
    // Crée le fichier si il n'existe pas
    fs.writeFileSync(usersFile, JSON.stringify([], null, 2));
  }
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}


function generateToken(email) {
  return jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
}

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const users = readUsers();

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "Email déjà utilisé." });
  }

  const newUser = { username, email, password };
  users.push(newUser);
  writeUsers(users);

  const token = generateToken(email);
  res.cookie("userToken", token, { httpOnly: true });
  res.status(201).json({ message: "Inscription réussie", token });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Identifiants invalides." });
  }

  const token = generateToken(email);
  res.cookie("userToken", token, { httpOnly: true });
  res.status(200).json({ message: "Connexion réussie", token });
});

app.get("/check-auth", (req, res) => {
  const token = req.cookies.userToken;
  if (!token) return res.status(401).json({ loggedIn: false });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ loggedIn: true, email: decoded.email });
  } catch (err) {
    res.status(401).json({ loggedIn: false });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur http://localhost:${PORT}`);
});
