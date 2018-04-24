const _ = require("lodash");
const Client = require('../../src/Client');

class Tester {
    static login() {
        return Client.authenticate("http://localhost:3000", "metabase@example.com", "JEpeWJPoEpgres");
    }
}

module.exports = Tester;