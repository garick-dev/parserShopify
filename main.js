const xlsx = require("xlsx");

const wb = xlsx.readFile("product.xlsx");
const ws = wb.SheetNames;

const data = xlsx.utils.sheet_to_json(wb.Sheets[ws[0]]);


// console.log(data);

let result = [];

for (item of data) {
    let arr = {};
    let objImg = {};
    let arrImg = [];

    for (key in item) {
        if (!key.includes("ИЗОБРАЖЕНИЕ"))  {
           arr[key] = item[key];
           // console.log(arr);
        }
        else {
            arrImg.push(item[key]);
            // console.log(arrImg);
        }

        objImg["ИЗОБРАЖЕНИЕ"] = arrImg;
    }
    result.push(arr, objImg);
}
console.log(result);

const newWB = xlsx.utils.book_new();
const newWS = xlsx.utils.json_to_sheet(result);
xlsx.utils.book_append_sheet(newWB, newWS, "New Data");

// console.log(newWS);
xlsx.writeFile(newWB, "newfile.csv");