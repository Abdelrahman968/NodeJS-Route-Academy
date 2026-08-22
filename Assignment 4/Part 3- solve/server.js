require("dotenv").config();

const app = require("./app");
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    message: "Route Academy Assignment 4",
    version: "1.0.0",
    author: "Abdelrahman Ayman",
    email: "se.abdelrahman968@gmail.com",
    github: "https://github.com/Abdelrahman968",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
