
export const errorHandler = (err,req,res, next) => {

    console.error("error in request:", err.message)

        res.status(err.status || 500).json({
            status:false,
            message: err.message || "some thing went wrong try again later"
        })
}