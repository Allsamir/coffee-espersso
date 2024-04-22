const express = require("express");
const router = express.Router();
const client = require("../mongoDB/mongodb");
const database = client.db("coffeeDB");
const coffees = database.collection("coffees");

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );

    router.post("/add-coffee", async (req, res) => {
      const coffeeData = req.body;
      const result = await coffees.insertOne(coffeeData);
      res.json(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

module.exports = router;
