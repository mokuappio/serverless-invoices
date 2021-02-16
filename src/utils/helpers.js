/* eslint-disable */
export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function range(end, start = 0, step = 1) {
  const arr = [];
  for (let i = start; i < end; i += step) {
    arr.push(i);
  }
  return arr;
}

/**
 * Returns a subset of the object based on a map of keys
 *
 * @param obj
 * @param map
 */
export function pick(obj, map) {
  const pickedKeys = Object.keys(obj)
    .filter(field => map.hasOwnProperty(field));
  const objSubset = {};
  pickedKeys.forEach((key) => {
    objSubset[map[key]] = obj[key];
  });
  return objSubset;
}
