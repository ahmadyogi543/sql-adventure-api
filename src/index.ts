import express from "express";

const app = express();

// middlewares
app.use(express.json());

// routes
app.all("/", (req, res) => {
  res.json({
    message: "Welcome to SQL Adventure API!",
  });
});

// start the server
app.listen(5000, "localhost", () => {
  console.log("server: listening at http://localhost:5000");
});
