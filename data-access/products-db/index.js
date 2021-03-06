/*
    name: CONTROLLER
    path: data-access/product-db/index.js
    Objective: In this file we import functions from different databases and export to sub-controller
    next File: index > mysql > index
*/

// here we import all the functions from MYSQL.
let {
  listproducts,
  findProduct,
  addProduct,
  editProduct,
  addCategory,
  getCategories,
  getCategory,
  editCategory,
  addProductImage,
  getProductImages,
  getProductImage,
  getProductImagesByProductID,
  editProductImage,
  addSubCategory,
  getSubCategories,
  getSubCategory,
  editSubCategory,
  getItems,
  addItem,
  editItem,
  getItem,
  getItemCategories,
  deleteItem,
  getStoreItem,
  getStoreAllItem,
  getStoreAllNonFeatureItem,
  getFeaturedItem,
  getNonFeaturedItem,
  userRef_prod_fav,
  userStoreRef_prod_fav,
  getRef_prod_fav,
  addRef_prod_fav,
  editRef_prod_fav,
  deleteRef_prod_fav,
  get_nutrition,
  add_nutrition,
  edit_nutrition,
  delete_nutrition
} 
 // switch out db as required
// = require('./memory/index')
= require('./mysql/index')
// = require('./mongod/index')
// = require('./pg/index')

// here we exporting all the functions to sub-controller.
let productsDb = {
  listproducts,
  findProduct,
  addProduct,
  editProduct,
  addCategory,
  getCategories,
  getCategory,
  editCategory,
  addProductImage,
  getProductImages,
  getProductImage,
  getProductImagesByProductID,
  getStoreAllNonFeatureItem,
  editProductImage,
  addSubCategory,
  getSubCategories,
  getSubCategory,
  editSubCategory,
  getItems,
  addItem,
  editItem,
  getItem,
  getItemCategories,
  deleteItem,
  getStoreItem,
  getStoreAllItem,
  getFeaturedItem,
  getNonFeaturedItem,
  userRef_prod_fav,
  userStoreRef_prod_fav,
  getRef_prod_fav,
  addRef_prod_fav,
  editRef_prod_fav,
  deleteRef_prod_fav,
  get_nutrition,
  add_nutrition,
  edit_nutrition,
  delete_nutrition,

} 


module.exports = productsDb
