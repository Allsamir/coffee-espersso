const express = require("express");
const router = express.Router();
const client = require("../mongoDB/mongodb");
const database = client.db("coffeeDB");
const userCollection = database.collection("users");
const { ObjectId } = require("mongodb");

async function run() {
  try {
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

    router.patch("/users", async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const updateDoc = {
        $set: {
          lastSignIn: user.lastSignIn,
        },
      };
      const options = { upsert: true };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.json(result);
    });

    router.delete("/users/:id", async (req, res) => {
      try {
        const userID = req.params.id;
        const result = await userCollection.deleteOne({
          _id: new ObjectId(userID),
        });
        res.json(result);
      } catch (err) {
        console.error(err);
      }
    });
  } finally {
    //await client.close();
  }
}

run().catch(console.dir);

module.exports = router;
