const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs");
const { randomUUID } = require("node:crypto");

const PORT = 5000;
const FILE = path.resolve("users.json");

function initializeFile() {
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, "[]");
    return;
  }

  const fileData = fs.readFileSync(FILE, "utf-8");

  if (!fileData.trim()) {
    fs.writeFileSync(FILE, "[]");
  }
}

initializeFile();

const server = http.createServer((req, res) => {
  try {
    const { url, method } = req;

    if (url === "/" && method === "GET") {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      return res.end("Welcome to my server! Route Academy Assignment 2");
    } else if (url === "/users" && method === "GET") {
      const data = JSON.parse(fs.readFileSync(FILE, "utf-8"));

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      return res.end(JSON.stringify(data));
    } else if (url === "/add" && method === "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        try {
          const data = JSON.parse(body);

          const users = JSON.parse(fs.readFileSync(FILE, "utf-8"));

          const isUserEXIST = users.find((user) => user.email === data.email);

          if (isUserEXIST) {
            res.writeHead(409, {
              "Content-Type": "application/json",
            });

            return res.end(
              JSON.stringify({
                error: "User already exist",
              }),
            );
          }

          const { name, email, age } = data;

          if (!name || !email || age === undefined) {
            res.writeHead(400, {
              "Content-Type": "application/json",
            });

            return res.end(
              JSON.stringify({
                error: "name, email and age are required",
              }),
            );
          }

          const newUser = {
            id: randomUUID(),
            ...data,
            createdAt: new Date().toISOString(),
          };

          users.push(newUser);

          fs.writeFileSync(FILE, JSON.stringify(users, null, 2));

          res.writeHead(201, {
            "Content-Type": "application/json",
          });

          return res.end(
            JSON.stringify({
              message: "User Added Successfully",
              user: newUser,
            }),
          );
        } catch (err) {
          res.writeHead(400, {
            "Content-Type": "application/json",
          });

          return res.end(
            JSON.stringify({
              error: err.message,
            }),
          );
        }
      });

      return;
    } else if (url.startsWith("/user/") && method === "GET") {
      const id = url.split("/")[2];

      const users = JSON.parse(fs.readFileSync(FILE, "utf-8"));

      const user = users.find((user) => user.id === id);

      if (user) {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        return res.end(JSON.stringify({ Operation: "ok", user }));
      } else {
        res.writeHead(404, {
          "Content-Type": "application/json",
        });
        return res.end(
          JSON.stringify({
            error: "User not found",
          }),
        );
      }

      return;
    } else if (url.startsWith("/user/") && method === "PATCH") {
      const id = url.split("/")[2];

      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        try {
          const data = JSON.parse(body);

          const users = JSON.parse(fs.readFileSync(FILE, "utf-8"));

          const userIndex = users.findIndex((user) => user.id === id);

          if (userIndex === -1) {
            res.writeHead(404, {
              "Content-Type": "application/json",
            });

            return res.end(
              JSON.stringify({
                error: "User not found",
              }),
            );
          }

          const { name, email, age } = data;

          if (name !== undefined) {
            users[userIndex].name = name;
          }

          if (email !== undefined) {
            users[userIndex].email = email;
          }

          if (age !== undefined) {
            users[userIndex].age = age;
          }

          users[userIndex].updatedAt = new Date().toISOString();

          fs.writeFileSync(FILE, JSON.stringify(users, null, 2));

          res.writeHead(200, {
            "Content-Type": "application/json",
          });

          return res.end(
            JSON.stringify({
              op: "ok",
              message: "User updated successfully",
              user: users[userIndex],
            }),
          );
        } catch (err) {
          res.writeHead(400, {
            "Content-Type": "application/json",
          });

          return res.end(
            JSON.stringify({
              error: err.message,
            }),
          );
        }
      });

      return;
    }
    // ROUTE NOT FOUND
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        error: "Route not found",
      }),
    );
  } catch (err) {
    res.writeHead(500, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        error: err.message,
      }),
    );
  }
});

server.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
