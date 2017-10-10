const urls = {
    AUTH: "/session",
    DATABASE: "/database",
    TABLE_METADATA: "/database/:databaseId/table/:tableId/query_metadata"
};

const removeTrailingSlash = (url) => {
    return url.charAt(url.length - 1) === "/" ?
        removeTrailingSlash(url.slice(0, url.length - 1)) :
        url;
};

const createUrl = (baseUrl, path) => {
    return removeTrailingSlash(baseUrl) + "/api" + path;
};


module.exports = Object.assign({createUrl: createUrl}, urls);