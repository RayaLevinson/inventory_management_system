/**
 * @description This is a utility function that wraps 
 * an async function in a try-catch block 
 * and passes any errors 
 * to the next middleware function.
 */
const tryCatchAsync = (fn) => (req, res, next) =>
  fn(req, res, next).catch(next);
module.exports = tryCatchAsync;
