const express = require("express");
const router = express.Router();
const client = require("../mongoDB/mongodb");
const database = client.db("coffeeDB");
const coffeeCollection = database.collection("coffees");
const userCollection = database.collection("users");
const { ObjectId } = require("mongodb");

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );

    // User API routes
    router.get("/users", async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.json(result);
    });

    router.post("/user", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.json(result);
    });

    // Coffee API routes
    router.get("/", async (req, res) => {
      const coffeeData = coffeeCollection.find({});
      const coffeeArray = await coffeeData.toArray();
      res.send(coffeeArray);
    });

    router.get("/:coffeeID", async (req, res) => {
      const coffeeId = req.params.coffeeID;
      const coffee = await coffeeCollection.findOne({
        _id: new ObjectId(coffeeId),
      });
      res.json(coffee);
    });

    router.get("/update-coffee/:coffeeID", async (req, res) => {
      const coffeeId = req.params.coffeeID;
      const coffee = await coffeeCollection.findOne({
        _id: new ObjectId(coffeeId),
      });
      res.json(coffee);
    });

    router.post("/add-coffee", async (req, res) => {
      const newCoffee = req.body;
      const result = await coffeeCollection.insertOne(newCoffee);
      res.json(result);
    });

    router.put("/update-coffee/:coffeeID", async (req, res) => {
      const coffeeId = req.params.coffeeID;
      const newCoffee = req.body;
      const options = { upsert: true };
      const updateCoffee = {
        $set: {
          coffeeName: newCoffee.coffeeName,
          availableQuantity: newCoffee.availableQuantity,
          supplierName: newCoffee.supplierName,
          test: newCoffee.test,
          category: newCoffee.category,
          details: newCoffee.details,
          photoURL: newCoffee.photoURL,
        },
      };
      const result = await coffeeCollection.updateOne(
        { _id: new ObjectId(coffeeId) },
        updateCoffee,
        options,
      );
      res.json(result);
    });

    router.delete("/:coffeeID", async (req, res) => {
      const coffeeId = req.params.coffeeID;
      const deleteCoffee = await coffeeCollection.deleteOne({
        _id: new ObjectId(coffeeId),
      });
      res.json(deleteCoffee);
    });
  } finally {
    //await client.close();
  }
}

run().catch(console.dir);

module.exports = router;
