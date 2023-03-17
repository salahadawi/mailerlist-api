import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
app.use(express.json());

import cors from "cors";
app.use(cors());

app.get("/health", (req, res) => {
  res.send("ok");
});

import axios from "axios";

const client = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${process.env.MAILER_LITE_KEY}`,
  },
});

app.post("/subscribe", (req, res) => {
  const { email } = req.body;
  client
    .post("https://connect.mailerlite.com/api/subscribers", {
      email,
      groups: [process.env.MAILER_LITE_GROUP_ID],
    })
    .then((response) => {
      res.status(200).send("Success");
    })
    .catch((error) => {
      res.status(500).send("Error");
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
