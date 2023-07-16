require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 9000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.MONGODB_ID}:${process.env.MONGODB_PASSWORD}@cluster0.wohac.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("book-catalog");
    const bookCollection = db.collection("books");

    // get all the books
    app.get("/books", async (req, res) => {
      const cursor = bookCollection.find({});
      const books = await cursor.toArray();

      res.send({ status: true, data: books });
    });

    // get a single book
    app.get("/books/:id", async (req, res) => {
      const id = req.params.id;
      const result = await bookCollection.findOne({ _id: ObjectId(id) });
      res.send(result);
    });

    // create a review
    app.post("/reviews/:id", async (req, res) => {
      const productId = req.params.id;
      const comment = req.body.comment;

      const result = await bookCollection.updateOne(
        { _id: ObjectId(productId) },
        { $push: { reviews: comment } }
      );

      console.log(result);

      if (result.modifiedCount !== 1) {
        console.error("Product not found or comment not added");
        res.json({ error: "Product not found or comment not added" });
        return;
      }

      res.json({ message: "Comment added successfully" });
    });

    // get a review
    app.get("/reviews/:id", async (req, res) => {
      const productId = req.params.id;

      const result = await bookCollection.findOne(
        { _id: ObjectId(productId) },
        { projection: { _id: 0, reviews: 1 } }
      );

      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    });
  } finally {
    // await client.close();
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome to Book Catalog Api");
});

app.listen(port, () => {
  console.log(`Book Catalog app listening on port: ${port}`);
});
