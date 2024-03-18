
//Not found/validation error Function function
export const handleValidationError = (res, message, statusCode = 404) => {
  return res.status(statusCode).json({
    success: false,
    message: message || 'Not Found',
  });
};



// catch block error handler function
export const handleCatchError = (res, message, error, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message: message || 'Internal Server Error',
    error: error ? error.message : null
  });
};



//handle cast error
export const handleCastError = (res, message) => {
  return res.status(404).json({
    success: false,
    message: message || 'Invalid Id'
  });
};