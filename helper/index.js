const getToken = (req) => {
    return req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
}

module.exports = {
    getToken
}