const http = require("node:http");
const fs = require("node:fs");

const PORT = 3000;
const FILE = "users.json";

const server = http.createServer((req, res) => {
  try {
    const { url, method } = req;

    // GET ALL USERS
    if (url === "/user" && method === "GET") {
      const users = JSON.parse(fs.readFileSync(FILE, "utf-8"));

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(users));
    }

    // GET USER BY ID
    else if (url.startsWith("/user/") && method === "GET") {
      const id = Number(url.split("/")[2]);

      const users = JSON.parse(fs.readFileSync(FILE, "utf-8"));

      const user = users.find((user) => user.id === id);

      if (!user) {
        res.statusCode = 404;
        return res.end("User Not Found");
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(user));
    }

    // ADD USER
    else if (url === "/user" && method === "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        const data = JSON.parse(body);

        const users = JSON.parse(fs.readFileSync(FILE, "utf-8"));

        const isUserExists = users.find((user) => user.email === data.email);

        if (isUserExists) {
          res.statusCode = 400;
          return res.end("Email Already Exists");
        }

        const newUser = {
          id: users.length + 1,
          name: data.name,
          email: data.email,
          age: data.age,
        };

        users.push(newUser);

        fs.writeFileSync(FILE, JSON.stringify(users));

        res.statusCode = 201;
        res.end("User Added Successfully");
      });
    }

    // UPDATE USER
    else if (url.startsWith("/user/") && method === "PATCH") {
      const id = Number(url.split("/")[2]);

      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        const data = JSON.parse(body);

        const users = JSON.parse(fs.readFileSync(FILE, "utf-8"));

        const index = users.findIndex((user) => user.id === id);

        if (index === -1) {
          res.statusCode = 404;
          return res.end("User Not Found");
        }

        if (data.name) users[index].name = data.name;

        if (data.age) users[index].age = data.age;

        if (data.email) {
          const isExists = users.find(
            (user) => user.email === data.email && user.id !== id,
          );

          if (isExists) {
            res.statusCode = 400;
            return res.end("Email Already Exists");
          }

          users[index].email = data.email;
        }

        fs.writeFileSync(FILE, JSON.stringify(users));

        res.statusCode = 200;
        res.end("User Updated Successfully");
      });
    }

    // DELETE USER
    else if (url.startsWith("/user/") && method === "DELETE") {
      const id = Number(url.split("/")[2]);

      const users = JSON.parse(fs.readFileSync(FILE, "utf-8"));

      const user = users.find((user) => user.id === id);

      if (!user) {
        res.statusCode = 404;
        return res.end("User Not Found");
      }

      const filteredUsers = users.filter((user) => user.id !== id);

      fs.writeFileSync(FILE, JSON.stringify(filteredUsers));

      res.statusCode = 200;
      res.end("User Deleted Successfully");
    }

    // PAGE NOT FOUND
    else {
      res.statusCode = 404;
      res.end("Page Not Found");
    }
  } catch (error) {
    console.log(error);

    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});

server.listen(PORT, () => {
  console.log(`Server Running On http://localhost:${PORT}`);
});
