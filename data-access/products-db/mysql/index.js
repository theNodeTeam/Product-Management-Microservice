let connection = require('../../../db/mysql/connection') // DB

let serialize = require('./serializer') // serializer custom to db
let categorySerializer = require('./categorySerializer') // serializer custom to db
let subCategorySerializer = require('./subCategorySerializer') // serializer custom to db
let itemsSerializer = require('./itemsSerializer') // serializer custom to db
let favouriteSerializer = require('./favouriteSerializer') // serializer custom to db
let transProdSerializer = require('./transProductSerializer') // serializer custom to db
let nutritionSerializer = require('./nutritionSerializer') // serializer custom to db

let makeProduct = require('../../../models/product/index') // model
let makeCategory = require('../../../models/category/index') // model
let makeSubCategory = require('../../../models/subCategory/index') // model
let makeItem = require('../../../models/item/index') // model
let makeFavItem = require('../../../models/favItem/index') // model yasir
let makeTransProduct = require('../../../models/transProduct/index') // model
let makeNutrition = require('../../../models/nutrition/index') // model


//function to get all products
let listproducts = () => {
  return new Promise(function (resolve, reject) {
    connection.query("SELECT * FROM product", function (err, result, fields) {
      if (!err) {
        resolve(Promise.resolve(serialize(JSON.parse(JSON.stringify(result)))))
      }
      else reject(err);
    });
  });
}


//function to get product by product ID
let findProduct = (prop, val) => {
  return new Promise(function (resolve, reject) {
    connection.query("SELECT * FROM product WHERE productID=" + val, function (err, result, fields) {
      if (!err) {
        let getVal = {}
        if (result.length > 0) {
          getVal = {
            "productID": result[0].productID,
            "productName": result[0].productName,
            "productDescription": result[0].productDescription,
            "productType": result[0].productType,
            "productBarcode": result[0].productBarcode
          }
        } else {
          getVal = {}
        }
        resolve(Promise.resolve(serialize(JSON.parse(JSON.stringify(getVal)))))
      }
      else reject(err);
    });
  });
}


//function to create product
let addProduct = (productInfo) => {
  let productGet = makeProduct(productInfo)
  pName = productGet.getProductName()
  pDescription = productGet.getProductDescription()
  pType = productGet.getProductType()
  pBarcode = productGet.getProductBarcode()

  let insertQuery = "INSERT INTO product SET productName='" + pName + "',productDescription='" + pDescription + "',productType='" + pType + "',productBarcode='" + pBarcode + "'"
  return new Promise(function (resolve, reject) {
    connection.query(insertQuery, (error, result) => {
      if (!error) {
        resolve(findProduct('productID', result.insertId))
      }
      else return error
    })
  })
}

//function to edit product
let editProduct = (id, productInfo) => {
  let productGet = makeProduct(productInfo)
  pName = productGet.getProductName()
  pDescription = productGet.getProductDescription()
  pType = productGet.getProductType()
  pBarcode = productGet.getProductBarcode()
  let insertQuery = "UPDATE product SET productName='" + pName + "',productDescription='" + pDescription + "',productType='" + pType + "',productBarcode='" + pBarcode + "' WHERE productID='" + id + "'"
  return new Promise(function (resolve, reject) {
    connection.query(insertQuery, (error, result) => {
      if (!error) {
        resolve(findProduct('productID', id))
      }
      else return error
    })
  })
}

//function to add category
let addCategory = (categoryInfo) => {
  let category = makeCategory(categoryInfo)
  let cName = category.getCategoryName()
  let cDescription = category.getCategoryDescription()
  let insertQuery = "INSERT INTO category SET categoryName='" + cName + "',categoryDescription='" + cDescription + "'"
  return new Promise(function (resolve, reject) {
    connection.query(insertQuery, (error, result) => {
      if (!error) {
        resolve(getCategory('categoryID', result.insertId))
      }
      else return error
    })
  })
}

//function to get all categories
let getCategories = () => {
  return new Promise(function (resolve, reject) {
    connection.query("SELECT * FROM category", function (err, result, fields) {
      if (!err) {
        resolve(Promise.resolve(categorySerializer(JSON.parse(JSON.stringify(result)))))
      }
      else reject(err);
    });
  });
}

//function to get category by categoryID
let getCategory = (prop, val) => {
  return new Promise(function (resolve, reject) {
    connection.query("SELECT * FROM category WHERE categoryID=" + val, function (err, result, fields) {
      if (!err) {
        let getVal = {}
        if (result.length > 0) {
          getVal = {
            "categoryID": result[0].categoryID,
            "categoryName": result[0].categoryName,
            "categoryDescription": result[0].categoryDescription,
          }
        } else {
          getVal = {}
        }

        resolve(Promise.resolve(categorySerializer(JSON.parse(JSON.stringify(getVal)))))
      }
      else reject(err);
    });
  });
}

//function to edit category
let editCategory = (id, categoryInfo) => {
  let category = makeCategory(categoryInfo)
  let cName = category.getCategoryName()
  let cDescription = category.getCategoryDescription()
  let insertQuery = "UPDATE category SET categoryName='" + cName + "',categoryDescription='" + cDescription + "' WHERE categoryID='" + id + "'"
  return new Promise(function (resolve, reject) {
    connection.query(insertQuery, (error, result) => {
      if (!error) {
        resolve(getCategory('categoryID', id))
      }
      else return error
    })
  })
}

//function to add subcategory
let addSubCategory = (subCategoryInfo) => {
  let subCategory = makeSubCategory(subCategoryInfo)
  scName = subCategory.getSubCategoryName()
  scDescription = subCategory.getSubCategoryDescription()
  categoryID = subCategory.getCategoryID()
  let insertQuery = "INSERT INTO subcategory SET subCategoryName='" + scName + "',subCategoryDescription='" + scDescription + "',categoryID='" + categoryID + "'"
  return new Promise(function (resolve, reject) {
    connection.query(insertQuery, (error, result) => {
      if (!error) {
        resolve(getSubCategory('subCategoryID', result.insertId))
      }
      else return error
    })
  })
}

//function to get all subcategories
let getSubCategories = () => {
  return new Promise(function (resolve, reject) {
    connection.query("SELECT * FROM subcategory", function (err, result, fields) {
      if (!err) {
        resolve(Promise.resolve(subCategorySerializer(JSON.parse(JSON.stringify(result)))))
      }
      else reject(err);
    });
  });
}

//function to get subcategory by categoryID
let getSubCategory = (prop, val) => {
  return new Promise(function (resolve, reject) {
    connection.query("SELECT * FROM subcategory WHERE subCategoryID=" + val, function (err, result, fields) {
      if (!err) {
        let getVal = {}
        if (result.length > 0) {
          getVal = {
            "subCategoryID": result[0].subCategoryID,
            "subCategoryName": result[0].subCategoryName,
            "subCategoryDescription": result[0].subCategoryDescription,
            "categoryID": result[0].categoryID,
            "productID": result[0].productID,
          }
        } else {
          getVal = {}
        }

        resolve(Promise.resolve(subCategorySerializer(JSON.parse(JSON.stringify(getVal)))))
      }
      else reject(err);
    });
  });
}

//function to edit subcategory
let editSubCategory = (id, subCategoryInfo) => {
  let subCategory = makeSubCategory(subCategoryInfo)
  scName = subCategory.getSubCategoryName()
  scDescription = subCategory.getSubCategoryDescription()
  sccategoryID= subCategory.getCategoryID()
  let insertQuery = "UPDATE subcategory SET subCategoryName='" + scName + "',subCategoryDescription='" + scDescription + "',categoryID='" + sccategoryID + "' WHERE subCategoryID='" + id + "'"
  return new Promise(function (resolve, reject) {
    connection.query(insertQuery, (error, result) => {
      if (!error) {
        resolve(getSubCategory('categoryID', id))
      }
      else return error
    })
  })
}

//function to all items
let getItems = () => {
  return new Promise(function (resolve, reject) {
    let run_query = "SELECT i.*, p.* , (SELECT servingSize FROM nutrition WHERE nutritionID=i.nutritionFacts) AS servingSize , (SELECT servingPerContainer FROM nutrition WHERE nutritionID=i.nutritionFacts) AS servingPerContainer , (SELECT calories FROM nutrition WHERE nutritionID=i.nutritionFacts) AS calories , (SELECT fatInGm FROM nutrition WHERE nutritionID=i.nutritionFacts) AS fatInGm , (SELECT saturatedFatInGm FROM nutrition WHERE nutritionID=i.nutritionFacts) AS saturatedFatInGm , (SELECT polyunsaturatedFatInGm FROM nutrition WHERE nutritionID=i.nutritionFacts) AS polyunsaturatedFatInGm , (SELECT monounsaturatedFatInGm FROM nutrition WHERE nutritionID=i.nutritionFacts) AS monounsaturatedFatInGm , (SELECT transFatInGm FROM nutrition WHERE nutritionID=i.nutritionFacts) AS transFatInGm , (SELECT protienInGm FROM nutrition WHERE nutritionID=i.nutritionFacts) AS protienInGm , (SELECT cholesterol FROM nutrition WHERE nutritionID=i.nutritionFacts) AS cholesterol , (SELECT sodium FROM nutrition WHERE nutritionID=i.nutritionFacts) AS sodium , (SELECT potassium FROM nutrition WHERE nutritionID=i.nutritionFacts) AS potassium , (SELECT totalCarbs FROM nutrition WHERE nutritionID=i.nutritionFacts) AS totalCarbs , (SELECT dietaryFiber FROM nutrition WHERE nutritionID=i.nutritionFacts) AS dietaryFiber , (SELECT sugar FROM nutrition WHERE nutritionID=i.nutritionFacts) AS sugar FROM items AS i LEFT JOIN product AS p on p.productID=i.productID"
    connection.query(run_query, function (err, result, fields) {
      
      if (!err) {
        resolve(Promise.resolve(itemsSerializer(JSON.parse(JSON.stringify(result)))))
      }
      else reject(err);
    });
  });
}


//function to add item
let addItem = (itemInfo) => {
  let item = makeItem(itemInfo)
  let productID = item.getproductID()
    let storeID = item.getstoreID()
    let productPrice = item.getproductPrice()
    let productDiscount = item.getproductDiscount()
    let isFeatured = item.getisFeatured()
    let isOutOfStock = item.getisOutOfStock()
    let outOfStockDate = item.getoutOfStockDate()
    let expDate = item.getexpDate()
    let featuredDetails = item.getfeaturedDetails()
    let quantity = item.getquantity()
    let speciaIInstructions = item.getspeciaIInstructions()
    let itemBarcode = item.getitemBarcode()
    let noOfImage = item.getnoOfImage()
    let disclaimer = item.getdisclaimer()
    let nutritionFacts = item.getnutritionFacts()
    let itemActive = item.getitemActive()
  let insertQuery = "INSERT INTO items SET "+
  "productID=" + "'" + productID + "'" + 
  "," + "storeID=" + "'" + storeID + "'" +
   "," + "productPrice=" + "'" + productPrice + "'" + 
   "," + "productDiscount=" + "'" + productDiscount + "'" + 
   "," + "isFeatured=" + "'" + isFeatured + "'" +
    "," + "isOutOfStock=" + "'" + isOutOfStock + "'" + 
    "," + "outOfStockDate=" + "'" + outOfStockDate + "'" + 
    "," + "expDate=" + "'" + expDate + "'" + 
    "," + "featuredDetails=" + "'" + featuredDetails + "'" + 
    "," + "quantity=" + "'" + quantity + "'" + 
    "," + "speciaIInstructions=" + "'" + speciaIInstructions + "'" + 
    "," + "noOfImage=" + "'" + noOfImage + "'" + 
    "," + "disclaimer=" + "'" + disclaimer + "'" + 
    "," + "itemActive=" + "'" + itemActive + "'" + 
    "," + "nutritionFacts=" + "'" + nutritionFacts + "'" + 
    "," + "itemBarcode=" + "'" + itemBarcode + "'"
  console.log(insertQuery)
  return new Promise(function (resolve, reject) {
    connection.query(insertQuery, (error, result) => {
      if (!error) {
        resolve(getItem('itemID', result.insertId))
      }
      else return error
    })
  })
}

//function to edit item
let editItem = (id, itemInfo) => {
  let item = makeItem(itemInfo)
  let productID = item.getproductID()
    let storeID = item.getstoreID()
    let productPrice = item.getproductPrice()
    let productDiscount = item.getproductDiscount()
    let isFeatured = item.getisFeatured()
    let isOutOfStock = item.getisOutOfStock()
    let outOfStockDate = item.getoutOfStockDate()
    let expDate = item.getexpDate()
    let featuredDetails = item.getfeaturedDetails()
    let quantity = item.getquantity()
    let speciaIInstructions = item.getspeciaIInstructions()
    let itemBarcode = item.getitemBarcode()
    let noOfImage = item.getnoOfImage()
    let disclaimer = item.getdisclaimer()
    let nutritionFacts = item.getnutritionFacts()
    let itemActive = item.getitemActive()
  let insertQuery = "UPDATE items SET "+
  "productID=" + "'" + productID + "'" + 
  "," + "storeID=" + "'" + storeID + "'" +
   "," + "productPrice=" + "'" + productPrice + "'" + 
   "," + "productDiscount=" + "'" + productDiscount + "'" + 
   "," + "isFeatured=" + "'" + isFeatured + "'" +
    "," + "isOutOfStock=" + "'" + isOutOfStock + "'" + 
    "," + "outOfStockDate=" + "'" + outOfStockDate + "'" + 
    "," + "expDate=" + "'" + expDate + "'" + 
    "," + "featuredDetails=" + "'" + featuredDetails + "'" + 
    "," + "quantity=" + "'" + quantity + "'" + 
    "," + "speciaIInstructions=" + "'" + speciaIInstructions + "'" + 
    "," + "noOfImage=" + "'" + noOfImage + "'" + 
    "," + "disclaimer=" + "'" + disclaimer + "'" + 
    "," + "itemActive=" + "'" + itemActive + "'" + 
    "," + "nutritionFacts=" + "'" + nutritionFacts + "'" + 
    "," + "itemBarcode=" + "'" + itemBarcode + "'" +
    " WHERE itemID='"+id+"'"
  return new Promise(function (resolve, reject) {
    connection.query(insertQuery, (error, result) => {
      if (!error) {
        resolve(getItem('itemID', id))
      }
      else return error
    })
  })

}

//function to get item by itemID
let getItem = (prop, val) => {
  return new Promise(function (resolve, reject) {
    connection.query("SELECT i.*, p.* , (SELECT servingSize FROM nutrition WHERE nutritionID=i.nutritionFacts) AS servingSize , (SELECT servingPerContainer FROM nutrition WHERE nutritionID=i.nutritionFacts) AS servingPerContainer , (SELECT calories FROM nutrition WHERE nutritionID=i.nutritionFacts) AS calories , (SELECT fatInGm FROM nutrition WHERE nutritionID=i.nutritionFacts) AS fatInGm , (SELECT saturatedFatInGm FROM nutrition WHERE nutritionID=i.nutritionFacts) AS saturatedFatInGm , (SELECT polyunsaturatedFatInGm FROM nutrition WHERE nutritionID=i.nutritionFacts) AS polyunsaturatedFatInGm , (SELECT monounsaturatedFatInGm FROM nutrition WHERE nutritionID=i.nutritionFacts) AS monounsaturatedFatInGm , (SELECT transFatInGm FROM nutrition WHERE nutritionID=i.nutritionFacts) AS transFatInGm , (SELECT protienInGm FROM nutrition WHERE nutritionID=i.nutritionFacts) AS protienInGm , (SELECT cholesterol FROM nutrition WHERE nutritionID=i.nutritionFacts) AS cholesterol , (SELECT sodium FROM nutrition WHERE nutritionID=i.nutritionFacts) AS sodium , (SELECT potassium FROM nutrition WHERE nutritionID=i.nutritionFacts) AS potassium , (SELECT totalCarbs FROM nutrition WHERE nutritionID=i.nutritionFacts) AS totalCarbs , (SELECT dietaryFiber FROM nutrition WHERE nutritionID=i.nutritionFacts) AS dietaryFiber , (SELECT sugar FROM nutrition WHERE nutritionID=i.nutritionFacts) AS sugar FROM items AS i LEFT JOIN product AS p on p.productID=i.productID WHERE i.itemID=" + val, function (err, result, fields) {
      if (!err) {
        let getVal = {}
        if (result.length > 0) {
          getVal = {
            "itemID": result[0].itemID,
            "productID": result[0].productID,
            "productName": result[0].productName,
            "productDescription": result[0].productDescription,
            "productType": result[0].productType,
            "productBarcode": result[0].productBarcode,
            "storeID": result[0].storeID,
            "productPrice": result[0].productPrice,
            "productDiscount": result[0].productDiscount,
            "isFeatured=": result[0].isFeatured,
            "isOutOfStock": result[0].isOutOfStock,
            "outOfStockDate": result[0].outOfStockDate,
            "expDate": result[0].expDate,
            "featuredDetails": result[0].featuredDetails,
            "quantity": result[0].quantity,
            "speciaIInstructions": result[0].speciaIInstruction,
            "discount": result[0].discount,
            "itemBarcode": result[0].itemBarcode,
            "noOfImage": result[0].noOfImage,
            "disclaimer": result[0].disclaimer,
            "nutritionFacts": result[0].nutritionFacts,
            "itemActive": result[0].itemActiv,
            "servingSize": result[0].servingSize,
            "servingPerContainer": result[0].servingPerContainer,
            "calories": result[0].calories,
            "fatInGm": result[0].fatInGm,
            "saturatedFatInGm": result[0].saturatedFatInGm,
            "polyunsaturatedFatInGm": result[0].polyunsaturatedFatInGm,
            "monounsaturatedFatInGm": result[0].monounsaturatedFatInGm,
            "transFatInGm": result[0].transFatInGm,
            "protienInGm": result[0].protienInGm,
            "cholesterol": result[0].cholesterol,
            "sodium": result[0].sodium,
            "potassium": result[0].potassium,
            "totalCarbs": result[0].totalCarbs,
            "dietaryFiber": result[0].dietaryFiber,
            "sugar": result[0].sugar
          }
        } else {
          getVal = {}
        }

        resolve(Promise.resolve(itemsSerializer(JSON.parse(JSON.stringify(getVal)))))
      }
      else reject(err);
    });
  });
}

//function to delete Item
let deleteItem = (prop, val) => {
  return new Promise(function (resolve, reject) {
    let run_query = "DELETE FROM items WHERE itemID='" + val + "'"
    connection.query(run_query, function (err, result, fields) {
      
      if (!err) {
        resolve(getItem('itemID', val))
      }
      else reject(err);
    });
  });
}

//function to all items of a store
let getStoreItem = (prop, val) => {
  return new Promise(function (resolve, reject) {
    let run_query = "SELECT * FROM items LEFT JOIN product on product.productID=items.productID WHERE items.storeID='" + val + "'"
    connection.query(run_query, function (err, result, fields) {
      
      if (!err) {
        resolve(Promise.resolve(itemsSerializer(JSON.parse(JSON.stringify(result)))))
      }
      else reject(err);
    });
  });
}

//function to items of store 
let getStoreAllItem = (prop, val) => {
  return new Promise(function (resolve, reject) {
    let run_query = "SELECT * FROM items LEFT JOIN product on product.productID=items.productID LEFT JOIN subCategory on subCategory.subCategoryID=product.productType WHERE items.storeID=" + val;
    connection.query(run_query, function (err, result, fields) {
      
      if (!err) {
        resolve(Promise.resolve(itemsSerializer(JSON.parse(JSON.stringify(result)))))
      }
      else reject(err);
    });
  });
}

//function to get all featured items
let getFeaturedItem = (prop, val) => {
  return new Promise(function (resolve, reject) {
    let run_query = "SELECT * FROM `items` LEFT JOIN product on product.productID=items.productID LEFT JOIN subCategory on subCategory.subCategoryID=product.productType WHERE items.storeID=" + valreq.params.id +
    " AND items.itemActive=1 AND isFeatured=" +
    1;
    connection.query(run_query, function (err, result, fields) {
      
      if (!err) {
        resolve(Promise.resolve(itemsSerializer(JSON.parse(JSON.stringify(result)))))
      }
      else reject(err);
    });
  });
}

//function to get favorite product
let getRef_prod_fav = (prop, val) => {
  return new Promise(function (resolve, reject) {
    let run_query = "SELECT * FROM ref_prod_fav WHERE favID=" + val;
    connection.query(run_query, function (err, result, fields) {
      
      if (!err) {
        let getVal = {}
        if (result.length > 0) {
          getVal = {
            "userID": result[0].userID,
            "itemID": result[0].itemID,
          }
        } else {
          getVal = {}
        }

        resolve(Promise.resolve(favouriteSerializer(JSON.parse(JSON.stringify(getVal)))))
      }
      else reject(err);
    });
  });
}

//function to add favorite product
let addRef_prod_fav = (favInfo) => {
  let favItem = makeFavItem(favInfo)
  let userID = favItem.getUserID()
  let itemID = favItem.getItemID()
  let insertQuery = "INSERT INTO ref_prod_fav SET userID=" + "'" + userID + "'" + "," + "itemID=" + "'" + itemID + "'"
  return new Promise(function (resolve, reject) {
    connection.query(insertQuery, (error, result) => {
      if (!error) {
        resolve(getRef_prod_fav('favID', result.insertId))
      }
      else return error
    })
  })
}

//function to edit favorite product
let editRef_prod_fav = (id, favInfo) => {
  let favItem = makeFavItem(favInfo)
  let userID = favItem.getUserID()
  let itemID = favItem.getItemID()
  let insertQuery = "UPDATE ref_prod_fav SET userID=" + "'" + userID + "'" + "," + "itemID=" + "'" + itemID + "' WHERE favID='" + id + "'"
  return new Promise(function (resolve, reject) {
    connection.query(insertQuery, (error, result) => {
      if (!error) {
        resolve(getRef_prod_fav('favID', id))
      }
      else return error
    })
  })
}

//function to delete favorite product
let deleteRef_prod_fav = (prop, val) => {
  let insertQuery = "DELETE FROM ref_prod_fav  WHERE favID='" + val + "'"
  return new Promise(function (resolve, reject) {
    connection.query(insertQuery, (error, result) => {
      if (!error) {
        resolve(getRef_prod_fav('favID', val))
      }
      else return error
    })
  })
}

//function to get all favorite products of user
let userRef_prod_fav = (prop, val) => {
  let insertQuery = "SELECT * FROM ref_prod_fav LEFT JOIN items on ref_prod_fav.itemID = items.itemID LEFT JOIN product on product.productID = items.productID LEFT JOIN store on items.storeID = store.storeID  where ref_prod_fav.userID=" + val
  return new Promise(function (resolve, reject) {
    connection.query(insertQuery, (error, result) => {
      if (!error) {
        resolve(getRef_prod_fav('favID', val))
      }
      else return error
    })
  })
}

//function to get all favorite items of user of single store
let userStoreRef_prod_fav = (prop, val, val2) => {
  let insertQuery = "SELECT * FROM ref_prod_fav LEFT JOIN items on ref_prod_fav.itemID = items.itemID LEFT JOIN product on product.productID = items.productID where ref_prod_fav.userID=" + val + " AND items.storeID=" + val2;
  return new Promise(function (resolve, reject) {
    connection.query(insertQuery, (error, result) => {
      if (!error) {
        resolve(Promise.resolve(favouriteSerializer(JSON.parse(JSON.stringify(result)))))
      }
      else return error
    })
  })
}

//function to items of an order
let getRef_trans_prod = (prop, val) => {
  let insertQuery = "SELECT * FROM ref_trans_items WHERE orderID=" + val;
  return new Promise(function (resolve, reject) {
    connection.query(insertQuery, (err, result) => {
      if (!err) {
        resolve(Promise.resolve(transProdSerializer(JSON.parse(JSON.stringify(result)))))
      }
      else reject(err);
    })
  })

}

//function to add item in an order
let addRef_trans_products = (transProdInfo) => {
  let transProdItem = makeTransProduct(transProdInfo)

  let orderID = transProdItem.getOrderID()
  let itemID = transProdItem.getItemID()
  let itemQuantity= 5
  let insertQuery = "INSERT INTO ref_trans_items SET orderID=" + "'" + orderID + "'" + "," + "itemID=" + "'" + itemID + "', itemQuantity='"+itemQuantity+"'"
  return new Promise(function (resolve, reject) {
    connection.query(insertQuery, (error, result) => {
      if (!error) {
        resolve(getRef_trans_prod('orderID', orderID))
      }
      else return error
    })
  })

}

//function to edit item information in an order
let editRef_trans_prod = (orderId, itemId, transProdInfo) => {
  let transProdItem = makeTransProduct(transProdInfo)
  let itemQuantity= transProdItem.getItemQuantity()
  let insertQuery = "UPDATE ref_trans_items SET itemQuantity=" + "'" + itemQuantity + "' WHERE orderID='" + orderId + "' AND itemID='"+itemId+"'"
  return new Promise(function (resolve, reject) {
    connection.query(insertQuery, (error, result) => {
      if (!error) {
        resolve(getRef_trans_prod('orderID', orderId))
      }
      else return error
    })
  })
}

//function to delete item from an order
let deleteRef_trans_prod = (orderId, itemId) => {
  let insertQuery = "DELETE FROM ref_trans_items WHERE orderID='" + orderId+"' AND itemID='"+itemId+"'"
  console.log(insertQuery)
  return new Promise(function (resolve, reject) {
    connection.query(insertQuery, (error, result) => {
      if (!error) {
        resolve(getRef_trans_prod('orderID', orderId))
      }
      else return error
    })
  })
}

//function to get nutritions
let get_nutrition = (prop, val) => {
  return new Promise(function (resolve, reject) {
    connection.query("SELECT * FROM nutrition WHERE nutritionID=" + val, function (err, result, fields) {
      if (!err) {
        let getVal = {}
        if (result.length > 0) {
          getVal = {
            "nutritionID":result[0].nutritionID,
            "servingSize": result[0].servingSize,
            "servingPerContainer": result[0].servingPerContainer,
            "calories": result[0].calories,
            "fatInGm": result[0].fatInGm,
            "saturatedFatInGm": result[0].saturatedFatInGm,
            "polyunsaturatedFatInGm": result[0].polyunsaturatedFatInGm,
            "monounsaturatedFatInGm": result[0].monounsaturatedFatInGm,
            "transFatInGm": result[0].transFatInGm,
            "protienInGm": result[0].protienInGm,
            "cholesterol": result[0].cholesterol,
            "sodium": result[0].sodium,
            "potassium": result[0].potassium,
            "totalCarbs": result[0].totalCarbs,
            "dietaryFiber": result[0].dietaryFiber,
            "sugar": result[0].sugar
          }
        } else {
          getVal = {}
        }

        resolve(Promise.resolve(nutritionSerializer(JSON.parse(JSON.stringify(getVal)))))
      }
      else reject(err);
    });
  });

}

//function to add nutritions
let add_nutrition = (nutritionInfo) => {
  let nutritions = makeNutrition(nutritionInfo)
  let servingSize = nutritions.servingSize()
  let servingPerContainer = nutritions.servingPerContainer()
  let calories = nutritions.calories()
  let fatInGm = nutritions.fatInGm()
  let saturatedFatInGm = nutritions.saturatedFatInGm()
  let polyunsaturatedFatInGm = nutritions.polyunsaturatedFatInGm()
  let monounsaturatedFatInGm = nutritions.monounsaturatedFatInGm()
  let transFatInGm = nutritions.transFatInGm()
  let protienInGm = nutritions.protienInGm()
  let cholesterol = nutritions.cholesterol()
  let sodium = nutritions.sodium()
  let potassium = nutritions.potassium()
  let totalCarbs = nutritions.totalCarbs()
  let dietaryFiber = nutritions.dietaryFiber()
  let sugar = nutritions.sugar()
  
  let insertQuery = "INSERT INTO nutrition SET servingSize='" + servingSize + 
    "',servingPerContainer='" + servingPerContainer + 
    "',calories='" + calories + 
    "',fatInGm='" + fatInGm + 
    "',saturatedFatInGm='" + saturatedFatInGm + 
    "',polyunsaturatedFatInGm='" + polyunsaturatedFatInGm + 
    "',monounsaturatedFatInGm='" + monounsaturatedFatInGm + 
    "',transFatInGm='" + transFatInGm + 
    "',protienInGm='" + protienInGm + 
    "',cholesterol='" + cholesterol + 
    "',sodium='" + sodium + 
    "',potassium='" + potassium + 
    "',totalCarbs='" + totalCarbs + 
    "',dietaryFiber='" + dietaryFiber + 
    "',sugar='" + sugar + 
    "'"
  return new Promise(function (resolve, reject) {
    connection.query(insertQuery, (error, result) => {
      if (!error) {
        resolve(get_nutrition('nutritionID', result.insertId))
      }
      else return error
    })
  })

}

//function to edit nutrition
let edit_nutrition = (id, transProdInfo) => {
  let nutritions = makeNutrition(transProdInfo)

  let nutritionID = nutritions.nutritionID()
  let servingSize = nutritions.servingSize()
  let servingPerContainer = nutritions.servingPerContainer()
  let calories = nutritions.calories()
  let fatInGm = nutritions.fatInGm()
  let saturatedFatInGm = nutritions.saturatedFatInGm()
  let polyunsaturatedFatInGm = nutritions.polyunsaturatedFatInGm()
  let monounsaturatedFatInGm = nutritions.monounsaturatedFatInGm()
  let transFatInGm = nutritions.transFatInGm()
  let protienInGm = nutritions.protienInGm()
  let cholesterol = nutritions.cholesterol()
  let sodium = nutritions.sodium()
  let potassium = nutritions.potassium()
  let totalCarbs = nutritions.totalCarbs()
  let dietaryFiber = nutritions.dietaryFiber()
  let sugar = nutritions.sugar()

  let insertQuery = "UPDATE nutrition SET servingSize='" + servingSize + 
    "',servingPerContainer='" + servingPerContainer + 
    "',calories='" + calories + 
    "',fatInGm='" + fatInGm + 
    "',saturatedFatInGm='" + saturatedFatInGm + 
    "',polyunsaturatedFatInGm='" + polyunsaturatedFatInGm + 
    "',monounsaturatedFatInGm='" + monounsaturatedFatInGm + 
    "',transFatInGm='" + transFatInGm + 
    "',protienInGm='" + protienInGm + 
    "',cholesterol='" + cholesterol + 
    "',sodium='" + sodium + 
    "',potassium='" + potassium + 
    "',totalCarbs='" + totalCarbs + 
    "',dietaryFiber='" + dietaryFiber + 
    "',sugar='" + sugar + 
    "' WHERE nutritionID='"+id+"'"
  return new Promise(function (resolve, reject) {
    connection.query(insertQuery, (error, result) => {
      if (!error) {
        resolve(get_nutrition('nutritionID', id))
      }
      else return error
    })
  })
}

//function to delete nutrition
let delete_nutrition = (prop, val) => {
  let insertQuery = "DELETE FROM nutrition WHERE nutritionID=" + val
  return new Promise(function (resolve, reject) {
    connection.query(insertQuery, (error, result) => {
      if (!error) {
        resolve(get_nutrition('nutritionID', val))
      }
      else return error
    })
  })
}

module.exports = {
  listproducts,
  findProduct,
  addProduct,
  editProduct,
  addCategory,
  getCategories,
  getCategory,
  editCategory,
  addSubCategory,
  getSubCategories,
  getSubCategory,
  editSubCategory,
  getItems,
  addItem,
  editItem,
  getItem,
  deleteItem,
  getStoreItem,
  getStoreAllItem,
  getFeaturedItem,
  getRef_prod_fav,
  addRef_prod_fav,
  editRef_prod_fav,
  deleteRef_prod_fav,
  userRef_prod_fav,
  userStoreRef_prod_fav,
  getRef_trans_prod,
  addRef_trans_products,
  editRef_trans_prod,
  deleteRef_trans_prod,
  get_nutrition,
  add_nutrition,
  edit_nutrition,
  delete_nutrition
}
