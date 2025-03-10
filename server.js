const express = require("express");
const app = express();
const port = 3000;
// const products = require("./products");

const productRoutes = require("./routes/productRoutes");

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

app.use(express.json());
app.use(["/api", "/", "/products"], productRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
