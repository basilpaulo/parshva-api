const xlsx = require("node-xlsx");
const fetch = require("node-fetch");
//var XLSX = require("xlsx");

var express = require("express");
var router = express.Router();

router.get("/", async function (req, res, next) {
  const response = await fetch(
    "https://raw.githubusercontent.com/basilpaulo/parshva-api/main/public/assets/export29913.xlsx"
  );

  const buffer = await response.arrayBuffer();

  const data = new Uint8Array(buffer);
  const workSheetsFromFile = xlsx.parse(data);

  // Parse the Excel data
  // const workSheetsFromFile = xlsx.read(buffer, { type: "buffer" });
  //   const workSheetsFromFile = XLSX.readFile("/assets/export29913.xlsx");
  let sup;
  let currSupplier;
  const result = workSheetsFromFile[0].data.reduce((sup, item) => {
    if (item[11]) {
      if (sup[item[11]]) {
        sup[item[11]].push(item);
      } else {
        sup = { ...sup, [item[11]]: [item] };
      }
      currSupplier = item[11];
    } else {
      if (sup[currSupplier].length) {
        sup[currSupplier].push(item);
      }
    }
    return sup;
  }, {});
  res.json(result);
});

module.exports = router;
