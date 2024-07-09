const requestIp = require("request-ip");

module.exports = (req, res, next) => {
    const ip = requestIp.getClientIp(req);
    req.clientIp = ip
    next();
};
