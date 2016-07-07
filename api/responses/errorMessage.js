module.exports = function errorMessage (err){

  // Get access to `res`
  // (since the arguments are up to us)
  var res = this.res;
  return res.send(409, err);


};
