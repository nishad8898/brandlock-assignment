const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const initialComponentsConfig = [
  {
    id: 1,
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
    id: 2,
    type: "table",
    data: [
      ["Product", "Price", "Quantity"],
      ["Widget A", 100, 100],
      ["Widget B", 200, 200],
      ["Widget C", 300, 300],
    ],
    layout: {
      width: "80%",
      height: "300px",
    },
  },
  {
    id: 3,
    type: "table",
    data: [
      ["Product", "Price", "Quantity", "discount"],
      ["Widget A", 100, 200, "20"],
      ["Widget B", 200, 200, "30"],
    ],
    layout: {
      width: "80%",
      height: "300px",
    },
  },
  {
    id: 4,
    type: "chart",
    data: {
      labels: ["Jan", "Feb", "Mar"],
      values: [10, 25, 15],
    },
    layout: {
      width: "50%",
      height: "300px",
    },
  },
];

let componentsConfig = JSON.parse(JSON.stringify(initialComponentsConfig));

app.get("/api/dashboard", (req, res) => {
  res.json(componentsConfig);
});

app.post("/api/dashboard/reset", (req, res) => {
  componentsConfig = JSON.parse(JSON.stringify(initialComponentsConfig));

  res.send(201);
});

app.put("/api/dashboard/table/:id", (req, res) => {
  const table = componentsConfig.filter(
    (el) => el.id === Number(req.params.id)
  )[0];

  const index = req.body.index;
  const value = req.body.value;

  table.data[index] = value;

  res.send(200);
});

app.delete("/api/dashboard/table/:id", (req, res) => {
  const table = componentsConfig.filter(
    (el) => el.id === Number(req.params.id)
  )[0];

  const index = req.body.index;

  table.data.splice(index, 1);

  res.send(204);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
