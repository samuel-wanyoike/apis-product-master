//Import the necessary dependencies
const http = require('http')
// Define a pORt at which the server will run
const PORT = process.env.PORT || 5000
const productsService = require("./productsService");
const getRequestData = require('./utils');
const { result } = require('lodash');

const server = http.createServer(async (req, res) => {

  res.setHeader('Content-Type', 'application/json');

  const {method, url} = req;

  const [path, id] = url.split('/').filter(Boolean);

  switch(method) {
    case 'GET':
        // Get all products
      if (path === 'products'){
        const products = productsService.getProducts();
        res.end(products)
      }
      // Get a product with specified id
      else if (path === 'products' && id){
        productsService.getProductsById(Number(id), (err, result) => {
          if (err){
            res.statusCode = 404;
            res.end(JSON.stringify({"error" : err}))
          }
          else{
            res.end(result)
          }
        })
      }
      break;
  // Create a new product
    case 'POST':
      if (path === "products"){
        const requestData = await getRequestData(req);
        const newProduct = JSON.parse(requestData);
        productsService.saveProduct(newProduct, (err, result) => {
          if (err) {
            res.statusCode = 400;
            res.end(JSON.stringify({'Error' : err}))
          }
          else {
            res.end(result)
          }
        })
      }
      break;
// Update a specific product
    case 'PUT':
      if(path === 'products' && id){
        const requestData = await getRequestData(req);
        const updateData = JSON.parse(requestData);
        productsService.updateProduct(Number(id), updateData, (err, result) => {
          if(err){
            res.statusCode = 400;
            res.end(JSON.stringify({'Error' : err}))
          }
          else {
            res.end(result)
          }
        })

      }
  // Delete a specific Product
      case 'DELETE':
        if(path ==='products' && id){
          productsService.deleteProduct(Number(id), (err, result) => {
            if(err){
              res.statusCode = 404;
              res.end(JSON.stringify({"Error" : err}))
            }
            else {
              res.end(result)
            }
          })
        }
        break;
      
      default:
        res.statusCode = 405;
        res.end('Method not allowed')
  }

});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})