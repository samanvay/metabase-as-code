const gateway = require("./gateway");
const urls = require("./urls");

class Client {
    constructor() {
        this._setAuthToken.bind(this);
    }

    _setAuthToken(token) {
        this.authToken = token;
    }

    authenticate(serverBaseURL, login, password) {
        this.serverBaseURL = serverBaseURL;
        return gateway.post(urls.createUrl(serverBaseURL, urls.AUTH),
            {
                username: login,
                password: password
            }
        ).then((result) => {
            this._setAuthToken(result.id);
            return result;
        });
    }

    getResources(resourceName) {
        return gateway.get(urls.createUrl(this.serverBaseURL, `/${resourceName}`), this.authToken);
    }

    getResource(resourceName, id) {
        return gateway.get(urls.createUrl(this.serverBaseURL, `/${resourceName}/${id}`), this.authToken);
    }

    post(resourceName, resources) {
        return gateway.post(urls.createUrl(this.serverBaseURL, `/${resourceName}`), resources, this.authToken);
    }

    put(resourceName, resources) {
        return gateway.put(urls.createUrl(this.serverBaseURL, `/${resourceName}`), resources, this.authToken);
    }
}

module.exports = new Client();