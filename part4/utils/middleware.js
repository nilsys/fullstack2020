const handleErrors = (error, req, resp, next) => {
    console.log(error)

    if (error.name === "CastError") {
        return resp.status(400).send({ error: "Malformed id" })
    } else if (error.name === "ValidationError") {
        return resp.status(400).json({ error: error })
    } else if (error.name === "MongoError") {
        return resp.status(400).send({ error: error })
    }else if (error.name === "TypeError") {
        return resp.status(400).send({ error: error })
    }
    next(error)
}

module.exports = {
    handleErrors
}