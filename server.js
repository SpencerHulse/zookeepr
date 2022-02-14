const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

const { animals } = require("./data/animals.json");

const filterByQuery = (query, animalsArray) => {
  let personalityTraitsArray = [];
  // Save animalsArray as filteredResults
  let filteredResults = animalsArray;
  if (query.personalityTraits) {
    // Save personalityTraits as a dedicated array
    // If it is a string, place it into a new array and save
    if (typeof query.personalityTraits === "string") {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    // Loop through each trait in the array
    personalityTraitsArray.forEach((trait) => {
      // Check the trait against each animal in the filteredResults array.
      // Remember, it is originally a copy of the animalsArray,
      // but here we're updating it for each trait in the .forEach() loop.
      // For each trait being targeted by the filter, the filteredResults
      // array will then contain only the entries that contain the trait,
      // so at the end, we'll have an array of animals that have every one
      // of the traits when the .forEach() loop is finished.
      filteredResults = filteredResults.filter(
        // indexOf returns the index of the first matching item.
        // It returns -1 if the item is not present.
        // Thus, in this case, if the trait does not exist in the trait array,
        // the animal is filtered out.
        (animal) => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }
  // Filters by diet
  if (query.diet) {
    filteredResults = filteredResults.filter(
      (animal) => animal.diet === query.diet
    );
  }
  // Filters by species
  if (query.species) {
    filteredResults = filteredResults.filter(
      (animal) => animal.species === query.species
    );
  }
  // Filters by name
  if (query.name) {
    filteredResults = filteredResults.filter(
      (animal) => animal.name === query.name
    );
  }

  return filteredResults;
};

const findById = (id, animalsArray) => {
  const result = animalsArray.filter((animal) => animal.id === id)[0];
  return result;
};

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
    res.status(404).send(404);
  }
});

app.listen(PORT, (req, res) => {
  console.log("API server now on port 3001!");
});
