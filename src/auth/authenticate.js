const gateway = require("../gateway");
const urls = require("../urls");

const authenticate = (url, login, password) => {
    return gateway.post(urls.createUrl(url, urls.AUTH),
        {
            username: login,
            password: password
        }
    ).then((result) => {
        return result.id;
    });
};

module.exports = authenticate;