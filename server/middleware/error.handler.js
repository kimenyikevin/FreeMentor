const errorHandler = (err, req, res, next) => {
  res.status(500)
    .send({
      status: 500,
      error: err.message,
    });
};

export default errorHandler;
