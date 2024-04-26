require("dotenv").config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.DATABASE_URI);

module.exports = client;
