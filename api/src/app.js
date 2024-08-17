const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

const componentsConfig = [
  {
    type: "chart",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "june"],
      values: [10, 25, 15, 54, 34, 89],
    },
    layout: {
      width: "80%",
      height: "300px",
    },
  },
  {
    type: "table",
    data: [
      ["Product", "Price", "Quantity"],
      ["Widget A", 100, 200],
      ["Widget B", 200, 200],
      ["Widget B", 200, 200],
    ],
    layout: {
      width: "80%",
      height: "300px",
    },
  },
];

app.get("/api/dashboard", (req, res) => {
  res.json(componentsConfig);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
