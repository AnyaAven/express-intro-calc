import { BadRequestError } from "./expressError.js";


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  const notNums = strNums.filter(n => isNaN(+n));
  if (notNums.length !== 0) {
    throw new BadRequestError(`${notNums} <-- these are not nums`);
  }
  
  return strNums.map(num => parseInt(num));
}


export { convertStrNums };