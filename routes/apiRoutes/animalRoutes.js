const router = require("express").Router();

const {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal,
} = require("../../lib/animals");

const { animals } = require("../../data/animals.json");

router.get("/animals", (req, res) => {
  let results = animals;

  if (req.query) {
    results = filterByQuery(req.query, results);
  }

  res.status(200).json(results);
});

router.get("/animals/:id", (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).sendStatus(404);
  }
});

router.post("/animals", (req, res) => {
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

module.exports = router;
