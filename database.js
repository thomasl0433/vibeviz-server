const axios = require("axios");

require("dotenv").config();
const token = process.env.AIRTABLE_TOKEN;

const getBases = async () => {
  const url = `https://api.airtable.com/v0/meta/bases`;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  await axios.get(url, { headers })
    .then((res) => {
      console.log("RES: ", res)
      return {
        ok: res.ok,
        statusMsg: res.status + "—" + res.statusText,
      }
    })
    .catch((error) => {
      console.log(error)
    })
};

const getRecords = async (baseId, tableIdOrName) => {
  const url = `https://api.airtable.com/v0/${baseId}/${tableIdOrName}`;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.get(url, { headers })
    .then((res) => {
      console.log("RES", res.data)
      return res.data
    })
};

const addRecord = async (baseId, tableIdOrName, data) => {
  const url = `https://api.airtable.com/v0/${baseId}/${tableIdOrName}`;

  // const airtableApiKey = process.env.AIRTABLE_API_KEY;

  // var recordData = {};

  // Object.entries(data).map(([key, value]) => {
  //     recordData[key] = value.join('\n');
  // })

  var recordData = { fields: data };

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(recordData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const statusMsg = response.ok
    ? "Record uploaded successfully."
    : "Error uploading record: " +
      response.status +
      " – " +
      response.statusText;
  return { ok: response.ok, msg: statusMsg };
};

module.exports = { getBases, getRecords, addRecord };
