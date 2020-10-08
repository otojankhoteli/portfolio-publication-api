import logger from './Logger';

export default (err, req, res, _) => {
  // specific error handlers can be added here
  const status = err.status || 500;
  logger.error(err.message);
  res.status(status).json({
    error: status,
    message: err.message,
    timestamp: new Date().getTime(),
    path: req.originalUrl,
  });
};
