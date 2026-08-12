// https://documenter.getpostman.com/view/34579966/2sBY4WpHAg#intro

const express = require("express");
const path = require("node:path");
const fs = require("node:fs/promises");
const { randomUUID } = require("node:crypto");
const app = express();

const PORT = 3000;
const FILE = path.resolve("./users.json");

async function initUserFile() {
  try {
    const fileData = await fs.readFile(FILE, "utf8");

    if (!fileData.trim()) {
      await fs.writeFile(FILE, JSON.stringify([]));
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(FILE, JSON.stringify([]));
      return;
    }

    throw error;
  }
}

async function readData(file) {
  const fileData = await fs.readFile(file, "utf8");
  return JSON.parse(fileData);
}

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    "X-Powered-By": "Route Academy",
    message: "Assessment 3",
  });
});

app.get("/users", (req, res) => {
  res.status(200).sendFile(FILE, (err) => {
    if (err) {
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
  });
});

app.get("/user/filter", async (req, res) => {
  const { name, email, age } = req.query;

  if (!name && !email && !age) {
    return res.status(400).json({
      message: "Please provide a name, email, or age",
    });
  }

  const users = await readData(FILE);

  const filteredUsers = users.filter((user) => {
    if (name && user.name.toLowerCase() !== name.toLowerCase()) {
      return false;
    }

    if (email && user.email.toLowerCase() !== email.toLowerCase()) {
      return false;
    }

    if (age && user.age !== Number(age)) {
      return false;
    }

    return true;
  });

  res.status(200).json(filteredUsers);
});

app.get("/user/name", async (req, res) => {
  const { name } = req.query;

  const users = await readData(FILE);

  const user = users.find(
    (user) => user.name.toLowerCase() === name.toLowerCase(),
  );

  if (!user) {
    return res.status(404).json({
      message: "User Not Found",
      id: req.query,
    });
  }

  res.status(200).json({
    message: "User Found",
    user,
  });
});

app.post("/user", async (req, res) => {
  const { name, age, email } = req.body;

  if (!name || !age || !email) {
    return res.status(400).json({
      message: "Missing Data",
      body: req.body,
    });
  }

  const users = await readData(FILE);

  const isEmailExist = users.find((user) => user.email === email);

  if (isEmailExist) {
    return res.status(400).json({
      message: "Email Already Exist",
      email,
    });
  }

  const newUser = {
    id: randomUUID(),
    name,
    age: Number(age),
    email,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  users.push(newUser);

  await fs.writeFile(FILE, JSON.stringify(users, null, 2), "utf-8");

  res.json({
    message: "User Created",
    newUser,
  });
});

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;

  const users = await readData(FILE);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User Not Found",
      id: req.params.id,
    });
  }

  res.status(200).json({
    message: "User Found",
    user,
  });
});

app.patch("/user/:id", async (req, res) => {
  const id = req.params.id;
  const { name, age, email } = req.body;

  const users = await readData(FILE);

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      message: "User Not Found",
      id,
    });
  }

  users[userIndex] = {
    ...users[userIndex],

    ...(name !== undefined && { name }),
    ...(age !== undefined && { age: Number(age) }),
    ...(email !== undefined && { email }),

    updatedAt: new Date().toISOString(),
  };

  await fs.writeFile(FILE, JSON.stringify(users, null, 2), "utf8");

  return res.status(200).json({
    message: "User Updated Successfully",
    user: users[userIndex],
  });
});

app.delete("/user/:id", async (req, res) => {
  const id = req.params.id;

  const users = await readData(FILE);

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      message: "User Not Found",
      id,
    });
  }

  const user = users[userIndex];

  users.splice(userIndex, 1);

  await fs.writeFile(FILE, JSON.stringify(users, null, 2), "utf8");

  return res.status(200).json({
    message: "User Deleted",
    user,
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
    route: req.originalUrl,
  });
});

async function startServer() {
  await initUserFile();

  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
}

startServer();
