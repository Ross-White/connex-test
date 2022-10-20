const auth = (req, res, next ) => {
    const authHeader = req.headers.authorization === "mysecrettoken";
    if (!authHeader) {
        const err = new Error("Not Authorised!")
        err.status = 403;
        next(err);
        return;
    }
    next();
};

module.exports = auth;
