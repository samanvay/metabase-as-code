const request = require("request-promise");
const urls = require("./urls");
const _ = require("lodash");

const basicCallOption = (url) => {
    return {url: url, headers: {"Content-Type": "application/json"}, json: true}
};

const wrapPost = (options, body) => {
    return _.merge({method: "POST", body: body}, options);
};

const wrapGet = (options) => {
    return _.merge({method: "GET"}, options);
};

const wrapAuth = (options, authToken) => {
    return authToken ? _.merge(options, {headers: {"X-Metabase-Session": authToken}}) : options;
};

const wrapPut = (options, body) => {
    return _.merge({method: "PUT", body: body}, options);
};

module.exports.put = (url, body, authToken) => {
    return request(
        wrapAuth(
            wrapPut(
                basicCallOption(url), body), authToken));
};

module.exports.post = (url, body, authToken) => {
    return request(
        wrapAuth(
            wrapPost(
                basicCallOption(url), body), authToken));
};

module.exports.get = (url, authToken) => {
    return request(
        wrapAuth(
            wrapGet(
                basicCallOption(url)), authToken));
};

