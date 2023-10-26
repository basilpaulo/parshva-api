const xlsx = require("node-xlsx");

//var XLSX = require("xlsx");

var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const workSheetsFromFile = xlsx.parse(
    `../api/public/assets/export29913.xlsx`
  );
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
