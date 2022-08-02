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

    let first_date = new Date(reservation_infor.date_resv);
    let second_date = new Date(first_date.toISOString());
    let third_date = new Date(first_date.setDate(first_date.getDate() + 1));
    console.log(
      second_date,
      new Date(first_date.setDate(first_date.getDate() + 1))
    );
    let tables = await table_aval.findOne({
      date: {
        $gte: new Date(second_date.toISOString().split("T")[0]),
        $lt: new Date(third_date.toISOString().split("T")[0]),
      },
    });

    console.log("tables is null", tables);
    if (tables == null) {
      tables = {
        table_size_1: 20,
        table_size_2: 20,
        table_size_3: 15,
        table_size_4: 10,
        table_size_5: 10,
        table_size_6: 8,
        table_size_8: 7,
        date: new Date(reservation_infor.date_resv.split("T")[0]),
      };
    }
    console.log("tables", tables);
    for (const num in reservation_infor.tables) {
      tables[`table_size_${reservation_infor.tables[num]}`] -= 1;
    }
    console.log("tables2", tables);

    tables = await table_aval.findOneAndUpdate(
      {
        date: {
          $gte: new Date(second_date.toISOString().split("T")[0]),
          $lt: new Date(third_date.toISOString().split("T")[0]),
        },
      },
      tables,
      {
        new: true,
        upsert: true,
      }
    );
    console.log("final", tables);

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

router.get("/tables_date/:date", async (req, res) => {
  const first_date = new Date(req.params.date);
  let second_date = new Date(req.params.date);
  second_date = new Date(second_date.setDate(second_date.getDate() + 1));
  try {
    const tables = await table_aval.findOne({
      date: {
        $gte: new Date(first_date.toISOString().split("T")[0]),
        $lt: new Date(second_date.toISOString().split("T")[0]),
      },
    });
    // console.log(tables);
    if (tables == null) {
      // if the table is not there yetm, return the default value

      return res.json({
        table_size_1: 20,
        table_size_2: 20,
        table_size_3: 15,
        table_size_4: 10,
        table_size_5: 10,
        table_size_6: 8,
        table_size_8: 7,
        date: first_date,
      });
    }
    return res.json(tables);
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: "table not found!" });
  }
});

module.exports = router;
