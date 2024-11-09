const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        status: 'ERR',
        message: err.message || 'Lỗi server',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
};

module.exports = errorHandler;
