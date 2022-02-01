# Parser for shopify

This project is designed to process tables in XLSX, XLS, CSV, etc. formats.

Work description:

When receiving data from tables, the parser iterates over the data so that the output data fits the Shopify API format. For example, if there are 10 columns of images, it creates one array with images and then adds them to the desired product.

The unloading speed of 1000 products is about 10-15 minutes.

