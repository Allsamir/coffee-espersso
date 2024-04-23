const express = require("express");
const router = express.Router();
const client = require("../mongoDB/mongodb");
const database = client.db("coffeeDB");
const coffees = database.collection("coffees");
const { ObjectId } = require("mongodb");

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
    router.get("/", async (req, res) => {
      const coffeeData = coffees.find({});
      const coffeeArray = await coffeeData.toArray();
      res.send(coffeeArray);
    });
    router.get("/:coffeeID", async (req, res) => {
      const coffeeId = req.params.coffeeID;
      const coffee = await coffees.findOne({ _id: new ObjectId(coffeeId) });
      res.json(coffee);
    });
    router.get("/update-coffee/:coffeeID", async (req, res) => {
      const coffeeId = req.params.coffeeID;
      const coffee = await coffees.findOne({ _id: new ObjectId(coffeeId) });
      res.json(coffee);
    });
    router.post("/add-coffee", async (req, res) => {
      const newCoffee = req.body;
      const result = await coffees.insertOne(newCoffee);
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
      const result = await coffees.updateOne(
        { _id: new ObjectId(coffeeId) },
        updateCoffee,
        options,
      );
      res.json(result);
    });
    router.delete("/:coffeeID", async (req, res) => {
      const coffeeId = req.params.coffeeID;
      const deleteCoffee = await coffees.deleteOne({
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
