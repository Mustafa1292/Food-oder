const express = require("express");
const reserveTable = require("../models/reserveTable");
const table_aval = require("../models/tables");
const router = express.Router();

// get all
router.get("/getall", async (req, res) => {
  try {
    const reserved = await reserveTable.find();
    return res.json(reserved);
  } catch (e) {
    return res.status(401).json({ message: "reservations not found!" });
  }
});

// get one
router.get("/getone/:res_id", async (req, res) => {
  try {
    const res_id = req.params.res_id;
    const reserved = await reserveTable.find({ id: res_id });
    return res.json(reserved);
  } catch (e) {
    return res.status(401).json({ message: "reservations not found!" });
  }
});

// create one
router.post("/create", async (req, res) => {
  const reservation_infor = req.body;
  try {
    const resv = await reserveTable.create({
      client: reservation_infor.client,
      tables: reservation_infor.tables,
      res_cost: reservation_infor.res_cost,
      date_resv: new Date(reservation_infor.date_resv),
    });
    // get the tables and modify it
    let tables = await table_aval.find();
    tables = tables[0];
    // console.log(tables);
    for (const num in reservation_infor.tables) {
      tables[`table_size_${reservation_infor.tables[num]}`] -= 1;
    }
    tables = await table_aval.findOneAndUpdate({}, tables, {
      new: true,
    });
    console.log("final", tables);
    // after you calling this api, it will return back an array with 2 elements
    // first element is the reservation information of customer
    // second element is the remainning tables after the client made the reservation
    return res.json([resv, tables]);
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: "reservations not found!" });
  }
});

//get all avalable tables:
router.get("/tables", async (req, res) => {
  try {
    const tables = await table_aval.find();
    console.log(tables);
    return res.json(tables[0]);
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: "table not found!" });
  }
});

module.exports = router;
