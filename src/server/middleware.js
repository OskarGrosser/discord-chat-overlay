export const parseJson = function(req, res, next) {
  if (!req.is("application/json")) {
    next();
  }

  const buffers = [];
  req.on("data", chunk => buffers.push(chunk));
  req.on("end", () => {
    try {
      req._body = Buffer.concat(buffers).toString();
      req.body = JSON.parse(req._body);
      next();
    } catch (err) {
      next(err);
    }
  });
};