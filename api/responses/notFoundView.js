/**
 * 404 (Not Found) Handler
 *
 * Usage:
 * return res.notFound();
 * return res.notFound(err);
 * return res.notFound(err, view);
 * return res.notFound(err, redirectTo);
 *
 * e.g.:
 * ```
 * return res.notFound();
 * ```
 *
 * NOTE:
 * If a request doesn't match any explicit routes (i.e. `config/routes.js`)
 * or route blueprints (i.e. "shadow routes", Sails will call `res.notFound()`
 * automatically.
 */

 module.exports = function notFound (err, viewOrRedirect) {

  var req = this.req;
  var res = this.res;

  var viewFilePath = 404;
  var statusCode = 404;

  var result = {
      status: statusCode
  };

  if (req.wantsJSON) {
    return res.json(result, result.status);
}
res.status(result.status);
res.render(viewFilePath, function(err) {
    if (err) {
        return res.status(result.status).json(result);
    }

    res.render(viewFilePath);
});

};
