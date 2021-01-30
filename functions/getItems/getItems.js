var _ = require('lodash');
const items = require('../shared/items.json')


const randomProperty = function (obj) {
  const keys = Object.keys(obj);
  const random = _.random(0, keys.length -1)
  return obj[keys[random]];
};

const getRandomFolder = function (onlyFoldersWithMoreThanOne, excludedItemIds) {
  // Get a random folder with items.
  const randomFolderKey = _.random(0, onlyFoldersWithMoreThanOne.length)
  const randomItemArrayOfItemsInOneFolder = onlyFoldersWithMoreThanOne[randomFolderKey]
  
  // Remove files that are already been used
  const onlyUnusedItems = _.remove(randomItemArrayOfItemsInOneFolder, function(n) {
    return !excludedItemIds.includes(n.uploadCareId)
  });
  if(onlyUnusedItems.length < 2) return getRandomFolder(onlyFoldersWithMoreThanOne, excludedItemIds)
  return onlyUnusedItems
}

exports.handler = async function(event, context) {
  // These come from the call
  let numberOfItemsToGet = event.queryStringParameters.total || 6;
  const excludedItemIds = event.queryStringParameters.excludes || [];
  
  // Array we will be sending back once filled
  let itemsToReturn = []
  
  // Reduce based on paths
  const itemsByFolder = _.groupBy(items, function(i) {
    return i.folder;
  });
  
  // Turn object in array of arrays. Each array has the items  (objects)
  const itemsArray = _.values(itemsByFolder);
  
  // Remove all folders that have only on item
  const onlyFoldersWithMoreThanOne = itemsArray.filter(i => i.length > 1)

  const onlyUnusedItems = getRandomFolder(onlyFoldersWithMoreThanOne, excludedItemIds)



  // if there are less items in the folder then we are trying to get
   if (onlyUnusedItems.length < numberOfItemsToGet) numberOfItemsToGet = onlyUnusedItems.length;

  for (let i = 0; i < numberOfItemsToGet; i++) {
    // Get a random id from the items that are still in the onlyUnusedItems array
   const randomId = _.random(0, onlyUnusedItems.length - 1);
   const randomItem = onlyUnusedItems[randomId]
   // Add the random item to the array we are going to return
   itemsToReturn.push(randomItem);
   // Remove this item from the onlyUnusedItems array
   onlyUnusedItems.splice(randomId,1)
   
   // TODO: what if this ends up being only one, of less
  }

  return {
    statusCode: 200,
    body: JSON.stringify({items: itemsToReturn})
  };
}