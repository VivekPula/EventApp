const infoLogger = (req, res, next) => {
  console.log("Method: ", req.method);
  console.log("Path: ", req.path);
  console.log("Time: ", new Date());

  next();
};

export default infoLogger;
