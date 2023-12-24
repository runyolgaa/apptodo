const express = require("express");
const db = new Map();

const app = express();

const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hello Dunia");
});

app.post("/todos", (req, res) => {
  db.set("123", req.body);

  return res.json({ "Succes Create Todo : ": req.body });
});

app.get("/todos", (req, res) => {
  const data = Array.from(db.values());
  return res.json({
    data,
  });
});

app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  const data = db.get(id);
  return res.json(data);
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const data = db.delete(id);
  return res.json({ message: "Succes delete todo" });
});

app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  db.set("123", res.body);
  return res.json({ message: "Succes update todo" });
});

app.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  const exsitingTitle = db.get(id);
  const updatedTitle = { title: req.body.title, description: exsitingTitle.description };
  db.set(id, updatedTitle);

  return res.json({ message: "Succes update Todo Title" });
});

app.listen(port, () => {
  console.log("Listen on localhost:" + port);
});
