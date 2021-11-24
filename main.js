const { Shopify }= require("@shopify/shopify-api");
const { DataType } = require("@shopify/shopify-api");
// let title = "title";
// let description = "description";
// let tags= ["tag1", "tag2", "tag3"];
// let sku = "264123213214";
// let price = "26";
// let urlImg = "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg";
// let urlArr =[
//     {
//         "src": `${urlImg}`,
//     }, {
//         "src": `${urlImg}`,
//     }]
//     ;
//
// let optionMaterial = "Серебро"
// let quantity = "3";
//
const api = async (title, description, tags, urlArr, price, sku) => {
    const client = new Shopify.Clients.Rest("souvenirboutique.myshopify.com", "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");
    const data = await client.post({
        path: 'products',
        data: {"product":
                    {
                        "title":`${title}`,
                        "body_html": `${description}`,
                        "vendor": "Souvenirboutique",
                        "product_type":"Apparel & Accessories",
                        "tags":`${tags}`,
                        "images": urlArr,
                        "options": {
                            "name": "Материал",
                        },
                        "variants": [ {
                                // "option1": `${optionMaterial}`,
                                "price": `${price}`,
                                "sku" : `${sku}`,
                                // "inventory_quantity": `${quantity}`,
                        }]
                    }
                },
        type: DataType.JSON,
    });
    // console.log(data.body.product.images);
    console.log(data);
}
// api();


const xlsx = require("xlsx");

const wb = xlsx.readFile("product.xlsx");
const ws = wb.SheetNames;

const data = xlsx.utils.sheet_to_json(wb.Sheets[ws[0]]);

let result = [];
let arrObj = {};

for (let item of data) {
    let title = "";
    let description = "";
    let tags= [];
    let sku = "";
    let price = "";
    let urlArr =[];

    // let optionMaterial = "Серебро"
    let quantity = "3";

    for (let key in item) {
        if (key.includes("НАЗВАНИЕ")) {
            title = item[key];
        } else if (key.includes("ОПИСАНИЕ")) {
            description = item[key];
        }
        else if (key.includes("ТЕГИ")) {
            tags.push(item[key]);
        }
        else if (key.includes("SKU")) {
            sku = item[key];
        }
        else if (key.includes("ЦЕНА")) {
            price = item[key];
        }
        else if (key.includes("КОЛИЧЕСТВО")) {
            let num = 0;
            num = item[key];
            quantity = num.toString();
        }
        else if (key.includes("ИЗОБРАЖЕНИЕ")) {
            let obj = {};
            obj = Object.assign(obj,{"src" : item[key]});
            urlArr.push(obj);
        }

    }
  // setTimeout( () =>  api(title, description, tags, price, sku, urlArr), 3000 ) ;
    console.log("TITLE",title);
    console.log("DESC", description);
    console.log("TAGS", tags);
    console.log("price", price);
    console.log("SKU", sku);
    console.log("quantity", typeof quantity);
    console.log("IMG", urlArr);

}

// console.log(data);





// const newWB = xlsx.utils.book_new();
// const newWS = xlsx.utils.json_to_sheet(result);
// xlsx.utils.book_append_sheet(newWB, newWS, "New Data");
//
// // console.log(newWS);
// xlsx.writeFile(newWB, "file.xlsx");



//////OLD CODE//////////

// let result = [];
// let arrObj = {};
// for (item of data) {
//     let arr = {};
//     for (key in item) {
//         if (!key.includes("ИЗОБРАЖЕНИЕ")) {
//             arr[key] = item[key];
//         } else {
//
//             let obj = {};
//             arr = Object.assign(obj,arr, {"ИЗОБРАЖЕНИЕ" : item[key]});
//            result.push(arr);
//         }
//     }
// }
// console.log(data);
//////OLD CODE//////////