const { Shopify }= require("@shopify/shopify-api");
const { DataType } = require("@shopify/shopify-api");

const api = async (title, description, tags, price, sku, quantity, urlArr) => {
    const client = new Shopify.Clients.Rest("souvenirboutique.myshopify.com", "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");
    const data = await client.post({
        path: 'products',
        data: {"product":
                    {
                        "title": title,
                        "body_html": description,
                        "vendor": "Souvenirboutique",
                        "product_type":"Apparel & Accessories",
                        "tags": tags,
                        "images": urlArr,
                        "options": {
                            "name": "Материал",
                        },
                        "variants": [ {
                                "option1": "test",
                                "title" : title,
                                "price": price,
                                "sku" : sku,
                                "inventory_policy": "continue",
                                "inventory_quantity": quantity,
                                'fulfillment_service': "manual",
                                "inventory_management": "shopify",
                        }]
                    }
                },
        type: DataType.JSON,
    });
    // console.log(data.body.product.images);
    console.log(data.body.product.variants);
}

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
            let num = 0;
            num = item[key];
            sku = num.toString();
        }
        else if (key.includes("ЦЕНА")) {
            let num = 0;
            num = item[key];
            price = num.toString();
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
  setTimeout( () =>  api(title, description, tags, price, sku,quantity, urlArr), 3000 ) ;


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