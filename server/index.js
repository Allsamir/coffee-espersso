const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const coffee = require("./api/coffee");

app.use(cors());
app.use(express.json());
app.use("/", coffee);

app.listen(port, () => {
  console.log(`Coffe app listening on port ${port}`);
});
