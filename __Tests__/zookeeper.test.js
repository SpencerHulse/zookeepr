const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers");
const { zookeepers } = require("../data/zookeepers.json");

jest.mock("fs");

test("creates a zookeeper object", () => {
  const zookeeper = createNewZookeeper(
    { name: "Spencer", id: "2130" },
    zookeepers
  );

  expect(zookeeper.name).toBe("Spencer");
  expect(zookeeper.id).toBe("2130");
});

test("filters by query", () => {
  const startingZookeepers = [
    {
      id: "1",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "otter",
    },
    {
      id: "2",
      name: "Isabella",
      age: 67,
      favoriteAnimal: "bear",
    },
    {
      id: "3",
      name: "Linda",
      age: 48,
      favoriteAnimal: "otter",
    },
  ];

  const updatedZookeepers = filterByQuery(
    { favoriteAnimal: "otter" },
    startingZookeepers
  );

  expect(updatedZookeepers.length).toEqual(2);
});

test("finds by id", () => {
  const startingZookeepers = [
    {
      id: "1",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    },
    {
      id: "2",
      name: "Isabella",
      age: 67,
      favoriteAnimal: "bear",
    },
    {
      id: "3",
      name: "Linda",
      age: 48,
      favoriteAnimal: "otter",
    },
  ];

  const result = findById("2", startingZookeepers);

  expect(result.name).toBe("Isabella");
  expect(result.id).toBe("2");
});

test("validates favorite animal", () => {
  const zookeeper = {
    id: "2",
    name: "Isabella",
    age: 67,
    favoriteAnimal: "bear",
  };

  const invalidZookeeper = {
    id: "2",
    name: "Isabella",
    age: 67,
    favoriteAnimal: "",
  };

  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
