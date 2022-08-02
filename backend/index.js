const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 5000;
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

//-----------------------
const Users = require("./models/user");
//const Reserved = require("./models/reserveTable");
const mongoose = require("mongoose");
const ReservationRouter = require("./index/reservations.js");
var connectString =
  process.env.DB_URI ||
  "DB_URI = mongodb+srv://user4351:CameronL123$@project4351.9rzic.mongodb.net/db4351?retryWrites=true&w=majority";
mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// get default connection
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongo db connection error"));
//db.once("open", async () => console.log("connected to database"));

app.use(express.json());

app.use("/resv", ReservationRouter);

// check that our backend is working
app.get("/", async (req, res) => {
  const infor = db.collection("table_aval");
  const tables = await infor.find();
  console.log(tables);
  return res.json(tables);
});

// get all users
app.get("/users", async (req, res) => {
  try {
    const users = await Users.find();
    return res.json(users);
  } catch (e) {
    return res.status(401).json({ message: "user not found!" });
  }
});

// get one user
app.get("/users/one/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const users = await Users.findOne({ _id: id });
    return res.json(users);
  } catch (e) {
    return res.status(401).json({ message: "user not found!" });
  }
});

//create a user (from the register page)
app.post("/users/create", async (req, res) => {
  const user_info = req.body;
  console.log(req.body);
  try {
    const users = await Users.create({
      first: user_info.first,
      last: user_info.last,
      email: user_info.email,
      password: user_info.password,
    });
    return res.json(users);
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: "user not created!" });
  }
});

// update a user (profile page)
app.put("/users/update/:id", async (req, res) => {
  let id = req.params.id;
  const user_info = req.body;
  console.log(req.body);
  try {
    const users = await Users.updateOne(
      { _id: id },
      {
        $set: {
          first: user_info.first,
          last: user_info.last,
          email: user_info.email,
          password: user_info.password,
          phone_number: user_info.phone_number,
          mailing_address: user_info.mailing_address,
          billing_address: user_info.billing_address,
          preferred_diner: user_info.preferred_diner,
          payment: user_info.payment,
        },
      }
    );
    return res.json(users);
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: "user not created!" });
  }
});


// // get all reservations, for testing
// app.get("/reservations", async (req, res) => {
//   try {
//     const reserved = await Reserved.find();
//     return res.json(reserved);
//   } catch (e) {
//     return res.status(401).json({ message: "reservations not found!" });
//   }
// });

// //create a reservation
// app.post("/reservations/create", async (req, res) => {
//   const reservation_info = req.body;
//   console.log(req.body);
//   try {
//     const reservation = await Reserved.create({
//       table_number: reservation_info.table_number,
//       table_size: reservation_info.table_size,
//       name: reservation_info.name,
//       phone_number: reservation_info.phone_number,
//       email: reservation_info.email,
//       date: reservation_info.date,
//     });
//     return res.json(reservation);
//   } catch (e) {
//     console.log(e);
//     return res.status(401).json({ message: "reservation not created!" });
//   }
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// RESERVATION
// get all the reservation
// get one reservation information by res_id or id
// create reservation information

// TABLE
// get all the available tables at the current time; to reserva the table

module.exports = app