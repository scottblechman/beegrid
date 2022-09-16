/**
 * Sorts a dictionary in ascending order of its keys.
 * @param {Object} dict - unsorted dictionary
 * @returns sorted dictionary
 */
function sortDictByKeys(dict) {
  return Object.keys(dict).sort().reduce(
    (obj, key) => { 
      obj[key] = dict[key]; 
      return obj;
    }, {}
  );
}