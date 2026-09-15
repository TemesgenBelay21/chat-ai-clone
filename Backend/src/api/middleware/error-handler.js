export const errorHandler = (err, req, res, next) => {
    console.error("error in request:", err.message);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "something went wrong, try again later"
    });
};