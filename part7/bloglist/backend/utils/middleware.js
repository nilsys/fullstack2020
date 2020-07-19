const handleErrors = (error, req, resp, next) => {
    console.log(error)
    if (error.name === "CastError") {
        return resp.status(400).send({ error: "Malformed id" })
    } else if (error.name === "ValidationError") {
        return resp.status(400).json({ error: error })
    } else if (error.name === "MongoError") {
        return resp.status(400).send({ error: error })
    }else if (error.name === "TypeError") {
        return resp.status(400).send({ error: "Server goofed" })
    } else if (error.name === "JsonWebTokenError"){
        return resp.status(401).send({ error: "Invalid or missing token" })
    }
    next(error)
}

const getAuthToken = (req, resp, next) => {
    const auth = req.get("authorization")
    if (auth && auth.toLowerCase().startsWith("bearer")){
        req.token = auth.substring(7)
    } else {
        req.token = null
    }
    next()
}

module.exports = {
    handleErrors,
    getAuthToken
}