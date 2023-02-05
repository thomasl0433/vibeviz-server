const express = require("express");
const morgan = require("morgan");

const { getBases, getRecords, addRecord } = require("./database")
const app = express();
const port = 3000;

app.use(morgan("tiny"));

app.get("/", async (req, res) => {
  const baseId = "appy5ZR6opxj85sa1";
  const tableId = "tblQhoMRtgUhYUmjN";
  const output = await getRecords(baseId, tableId);
  console.log("OUTPUT: ", output)
  res.send(output);
});

app.get("/feed", (req, res) => {
  res.send();
});

app.listen(port, () => {
  console.log("-------- Vibeviz Server --------");
  console.log(`Listening on port ${port}`);
});
