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
      const review = req.body.review;

      const result = await bookCollection.updateOne(
        { _id: ObjectId(productId) },
        { $push: { reviews: review } }
      );

      if (result.modifiedCount !== 1) {
        console.error("Product not found or review not added");
        res.json({ error: "Product not found or review not added" });
        return;
      }

      res.json({ message: "review added successfully" });
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

    // add a book
    app.post("/books", async (req, res) => {
      const book = req.body;
      const result = await bookCollection.insertOne(book);
      res.send(result);
    });

    // delete a book
    app.delete("/books/:id", async (req, res) => {
      const id = req.params.id;

      const result = await bookCollection.deleteOne({ _id: ObjectId(id) });
      res.send(result);
    });

    // create a user
    app.post("/user", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // get a user
    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const result = await userCollection.findOne({ email });

      if (result?.email) {
        return res.send({ status: true, data: result });
      }

      res.send({ status: false });
    });

    //
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
