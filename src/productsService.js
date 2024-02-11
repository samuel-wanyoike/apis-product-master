// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;


const getProducts = () => {
  // get all products
  return  JSON.stringify(productsList);
}

  // get a product by ID
const getProductsById = (productId, done) => {
    let product = productsList.find(product => product.id === productId);
    if (product) {
       return done(null, JSON.stringify(product))
    }

    else {
      return done("Requested product doesn't exist..!", null);
    }
  }

   // save a product
const saveProduct = (newProduct, done) => {
  const existingId = productsList.find(product => product.id === newProduct.id);
  if (existingId){
    return done("Product already exists..!", null)
  }
  else{
    productsList.push(newProduct);
    return done(null, JSON.stringify(productsList))
  }
  
}

// update the product list
const updateProduct = (productId, updateData, done) => {
  let updatedProductList = null;
  const productIndex = productsList.findIndex(product => product.id === productId);
  if(productIndex !== -1){
    productsList[productIndex] = { ...productsList[productIndex], ...updateData };
    updatedProductList = productsList;
    return  done(null, JSON.stringify(updatedProductList));
  }
  else{
    return done("Requested product doesn't exist..!", null)
  }
  
}
 // delete a product  
const deleteProduct = (productId, done) => {
  const productIndex = productsList.findIndex(product => product.id === productId);
  if(productIndex !== -1){
    productsList.splice(productIndex, 1);
    return done(null, JSON.stringify(productsList));
  }
   
  else{
    return done("Requested product doesn't exist..!", null)
  }
 
}


module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}