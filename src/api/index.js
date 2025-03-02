/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

const SECRET_KEY = "my_secret_key";

const readJsonFile = (filePath) => {
  try {
    const rawData = fs.readFileSync(filePath, "utf8");
    const parsedData = JSON.parse(rawData);
    return parsedData;
  } catch (error) {
    console.error("Error reading file:", error);
  }
};

const writeJsonFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing to file:", error);
  }
};

const productsFilePath = path.join(__dirname, "json", "dummy_products.json");
const productsData = readJsonFile(productsFilePath);
const userFilePath = path.join(__dirname, "json", "users.json");
const usersData = readJsonFile(userFilePath);

app.get("/products", (req, res) => {
  res.json({
    success: true,
    data: productsData,
  });
});

app.get("/users", (req, res) => {
  res.json({
    success: true,
    data: usersData,
  });
});

app.get("/markdown/pp", (req, res) => {
  const filePath = path.join(__dirname, "mds", "privacypolicy.md");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Error reading the Markdown file." });
      return;
    }

    res.type("text/markdown");
    res.send({ data: data });
  });
});

app.get("/markdown/sp", (req, res) => {
  const filePath = path.join(__dirname, "mds", "shoppingpolicy.md");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Error reading the Markdown file." });
      return;
    }

    res.type("text/markdown");
    res.send({ data: data });
  });
});

app.get("/markdown/about", (req, res) => {
  const filePath = path.join(__dirname, "mds", "about.md");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Error reading the Markdown file." });
      return;
    }

    res.type("text/markdown");
    res.send({ data: data });
  });
});

app.post("/auth", (req, res) => {
  const { name, email, mobile, password } = req.body;
  const usersData = readJsonFile(userFilePath);

  const existingUser = usersData.find((user) => user.email === email);

  if (existingUser) {
    if (existingUser.password === password) {
      const token = jwt.sign(
        { id: existingUser._id, email: existingUser.email },
        SECRET_KEY,
        { expiresIn: "30d" }
      );
      console.log(token);
      return res
        .status(200)
        .json({ message: "Login successful", user: existingUser, token: token });
    } else return res.status(401).json({ message: "Invalid password." });
  }

  const newUser = {
    _id: Date.now().toString(),
    ipAddress: req.ip,
    name,
    email,
    phone: mobile,
    password,
  };

  usersData.push(newUser);
  writeJsonFile(userFilePath, usersData);

  const token = jwt.sign(
    { id: newUser._id, email: newUser.email },
    SECRET_KEY,
    { expiresIn: "30d" }
  );
  console.log(token);
  return res.status(201).json({
    message: "User registered successfully",
    user: newUser,
    token,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
