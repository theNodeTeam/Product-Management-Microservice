/*
    name: ITEM SERIALIZER
    path: data-access/product-db/mysql/subCategorySerializer.js
    Objective: In this file we have the mapping of database fields to our own created field names. This serialzer return the data to frontend.
    next File: serializer > index 
*/

// this function maps the field of database to our fields
const _serializeSingle = (subCategory) => {
  return {
    subCategoryID: subCategory.subCategoryID,
    subCategoryName: subCategory.subCategoryName,
    subCategoryDescription: subCategory.subCategoryDescription,
    categoryID: subCategory.categoryID,
    subCategoryActive: subCategory.subCategoryActive,
  };
};

// this function check the data if it is array it iterate the else it send the data to _serializeSingle for mapping.
const serializer = (data) => {
  if (!data || isEmpty(data)) {
    return {err: 'No record found!'};
  }
  if (Array.isArray(data)) {
    return data.map(_serializeSingle);
  }
  return _serializeSingle(data);
};

//to check whether the object is empty or not
function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}

module.exports = serializer;
