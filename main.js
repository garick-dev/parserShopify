const xlsx = require("xlsx");

const wb = xlsx.readFile("product.xlsx");
const ws = wb.SheetNames;

const data = xlsx.utils.sheet_to_json(wb.Sheets[ws[0]]);




let result = [];
let test = [];
for (item of data) {
    let arr = {};
    let objImg = {};
    let arrImg = [];
    let obj = {};
    for (key in item) {
        if (!key.includes("ИЗОБРАЖЕНИЕ"))  {
           arr[key] = item[key];
           // console.log(arr);
        }
        else {
            arrImg.push(item[key]);
        }        
    }
    result = Object.assign(arr, {"ИЗОБРАЖЕНИЕ" : arrImg});
    test.push(result);
}
// console.log(test);
// console.log(obj);

const newWB = xlsx.utils.book_new();
const newWS = xlsx.utils.json_to_sheet(test);
xlsx.utils.book_append_sheet(newWB, newWS, "New Data");

// console.log(newWS);
xlsx.writeFile(newWB, "newfile.xlsx");