//Import the necessary dependencies
const http = require('http')
// Define a pORt at which the server will run
const PORT = process.env.PORT || 5000
const productsService = require("./productsService");
const getRequestData = require('./utils');

const server = http.createServer(async (req, res) => {

  res.setHeader('Content-Type', 'application/json');

  const {method, url} = req;

  const [path, id] = url.split('/').filter(Boolean);

  switch(method) {
    case 'GET':
      if (path === 'products'){
        const products = await productsService.getProducts();
        res.end(JSON.stringify(products))
      }
      else if (path === 'products' && id){
        const product = await productsService.getProductsById(id);
        res.end(product ? JSON.stringify(product) : "Requested product doesn't exist..!")
      }
      break;
  // Get all products
 
  // Get a product with specified id

  // Create a new product

  // Update a specific product

  // Delete a specific Product
  }

});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})