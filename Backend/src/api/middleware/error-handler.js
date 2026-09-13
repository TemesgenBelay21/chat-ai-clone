
export const errorHandler = (err,req,res, next) => {
        res.status(500).json({
            status:false,
            message: "some thing went wrong try again later"
        })
}