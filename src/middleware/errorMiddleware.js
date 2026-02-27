export const errorHandler = (err, req, res, next) => {
    res.status(res.statuscode || 500).json({
        message: err.message,
    });
};