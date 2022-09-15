function sortDictByKeys(dict) {
  return Object.keys(dict).sort().reduce(
    (obj, key) => { 
      obj[key] = dict[key]; 
      return obj;
    }, {}
  );
}