const express = require("express");
const path = require("path");
const {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal,
} = require("./lib/animals");

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static("public"));

const { animals } = require("./data/animals.json");

app.get("/api/animals", (req, res) => {
  let results = animals;

  if (req.query) {
    results = filterByQuery(req.query, results);
  }

  res.status(200).json(results);
});

app.get("/api/animals/:id", (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).sendStatus(404);
  }
});

app.post("/api/animals", (req, res) => {
  // set id based on what the next index of the array will be
  // get the id of the last animal in the array and add one to it
  req.body.id = (Number(animals[animals.length - 1].id) + 1).toString();

  // if any data in req.body is incorrect, send 400 error back
  if (!validateAnimal(req.body)) {
    res.status(400).send("The animal is not properly formatted.");
  } else {
    // add animal to json file and animals array in this function
    const animal = createNewAnimal(req.body, animals);

    res.json(req.body);
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/animals", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/animals.html"));
});

app.get("/zookeepers", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/zookeepers.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, (req, res) => {
  console.log("API server now on port 3001!");
});
